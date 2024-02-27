import React, {useEffect, useRef, useState} from "react";
import {Button, Col, Dropdown, Form, Row} from "react-bootstrap";
import GroupSelection, {Group} from "./GroupSelection";
import ImageUpload, {listSubDirectories, uploadFile} from "./ImageUpload";
import {firestore, auth} from '../../firebase';
import {addDoc, collection} from "firebase/firestore";

const NewAchievement: React.FC = () => {
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

    const [imageDescription, setImageDescription] = useState('');

    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const uploadImage = () => {
        if (imageUpload == null) return
        if (selectedGroup == null) return;
        uploadFile("achievements" + "/" + selectedGroup, imageUpload)
            .then(url => {
                    console.log('Download URL:', url)
                    return uploadMetadata(url)
                }
            )
            .then((resultFromUploadMetadata) => {
                console.log(resultFromUploadMetadata);
            })
            .catch(error => console.error('Error uploading file:', error));
    }

    const uploadMetadata = async (imageUrl: string | null) => {
        if (selectedGroup == null) return
        if (imageDescription == null) return
        const docRef = await addDoc(
            collection(firestore, 'images', 'achievements', selectedGroup.name),
            {
                url: imageUrl,
                description: imageDescription
            }
        );
    }

    return (
        <div>
            {
                selectedGroup
                    ?
                    <Button variant="primary"
                            onClick={() => {
                                setSelectedGroup(null);
                            }}>
                        {selectedGroup.name}
                    </Button>
                    :
                    <GroupSelection
                        onChange={setSelectedGroup}
                    />
            }
            <Row>
                <Col sm="6">
                    <Form.Label>Избери картинка</Form.Label>
                </Col>
                <Col sm="6">
                    <input
                        type="file"
                        onChange={(event) => {
                            // @ts-ignore
                            const f = event.target.files[0];
                            if (f == null) return
                            // @ts-ignore
                            setImageUpload(f);
                            // @ts-ignore
                            setImageUrl(URL.createObjectURL(f));
                        }}
                        accept="image/png, image/jpg, image/jpeg"
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="6">
                    {
                        imageUrl &&
                        <img src={imageUrl} alt=""/>
                    }
                </Col>
                <Col sm="6">
                    <div>
                        <Form.Label>Описание</Form.Label>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={imageDescription}
                            onChange={(e) => setImageDescription(e.target.value)}
                        />
                    </div>
                </Col>
            </Row>
            <Button variant="primary" className="mt-2" onClick={uploadImage}>Добави</Button>
        </div>
    )
}

export default NewAchievement