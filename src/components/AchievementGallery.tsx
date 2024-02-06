import React, { useEffect, useState } from "react";

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
    const groupContext = require.context("../../public/images/achievements", true, /^(.*\.(jpg|png|gif|js))$/i);

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
        <div>
            <h2>Achievements Gallery</h2>
            {imagesData.map((group: ImageData) =>
                <div>
                    <h3>{group.groupMetadata?.groupName}</h3>
                    <p>{group.groupMetadata?.description}</p>
                    <table>
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
                                    <td>
                                        <img src={imageUrl} alt={metadata?.description} style={{ width: "100px" }} />
                                    </td>
                                    <td>{metadata?.description}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AchievementsGallery;