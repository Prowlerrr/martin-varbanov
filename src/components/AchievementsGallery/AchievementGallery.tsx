import React, { useEffect, useState } from "react";
import './AchievementGallery.css';   // assuming you have an associated css file

// @ts-ignore
declare let require: any;

interface Metadata {
    filename: string;
    description: string;
    dateCreated: string;
}

interface GroupMetadata {
    groupName: string;
    description: string;
}

interface ImageData {
    groupName: string;
    images: string[];
    metadata?: Record<string, Metadata>;
    groupMetadata?: GroupMetadata;
}

const AchievementsGallery: React.FC = () => {
    const [imagesData, setImagesData] = useState<ImageData[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [selectedDescription, setSelectedDescription] = useState<string | undefined>(undefined);
    const groupContext = require.context("../../../public/images/achievements", true, /^(.*\.(jpg|png|gif|js))$/i);

    function openModal(imageUrl: string, description: string | undefined) {
        setSelectedImage(imageUrl);
        setSelectedDescription(description);
    }

    function closeModal() {
        setSelectedImage(undefined);
        setSelectedDescription(undefined);
    }

    useEffect(() => {
        let tempImagesData: ImageData[] = [];

        groupContext.keys().forEach((path: string) => {
            const pathParts = path.split("/");
            const group = pathParts[1];
            const file = pathParts[2];

            let groupData = tempImagesData.find((data) => data.groupName === group);

            if (!groupData) {
                groupData = { groupName: group, images: [] };
                tempImagesData.push(groupData);
            }

            if (file.endsWith(".js")) {
                const metadataModule = groupContext(path);
                const {groupMetadata, imagesMetadata} = metadataModule.default;
                const metadataObject: Record<string, Metadata> = {};

                imagesMetadata.forEach((metadata: Metadata) => {
                    metadataObject[metadata.filename] = metadata;
                });

                groupData.metadata = metadataObject;
                groupData.groupMetadata = groupMetadata;
            } else {
                groupData.images.push(groupContext(path));
            }
        });

        setImagesData(tempImagesData);
    }, []);

    return (
        <div className="gallery">
            <h2 className="gallery-title">Achievements Gallery</h2>
            {imagesData.map((group: ImageData) =>
                <div className="group">
                    <h3 className="group-name">{group.groupMetadata?.groupName}</h3>
                    <p className="group-description">{group.groupMetadata?.description}</p>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Thumbnail</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {group.images.map((imageUrl: string) => {
                            let imageFileName = imageUrl.split("/").pop() || "";
                            imageFileName = imageFileName.replace(/(\.[a-z0-9]*)\./, '.');
                            const metadata = group.metadata && group.metadata[imageFileName];

                            return (
                                <tr key={imageFileName}>
                                    <td className="thumbnail-cell">
                                        <img
                                            src={imageUrl}
                                            alt={metadata?.description}
                                            onClick={() => openModal(imageUrl, metadata?.description)}
                                            className="thumbnail"
                                        />
                                    </td>
                                    <td>{metadata?.description}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
            {selectedImage && (
                <div
                    className="modal"
                    onClick={closeModal}
                >
                    <div className="modal-content">
                        <h2>{selectedDescription}</h2>
                        <img src={selectedImage} alt={selectedDescription} className="modal-image" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AchievementsGallery;