import React, {useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import GroupSelection, {Group} from "./GroupSelection";
import {uploadFile} from "./ImageUpload";
import {firestore} from '../../firebase';
import {addDoc, collection} from "firebase/firestore";
import {doc, setDoc} from 'firebase/firestore';

const NewAchievement: React.FC = () => {
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

    const [imageDescription, setImageDescription] = useState('');

    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const uploadImage = () => {
        if (imageUpload == null) return
        if (selectedGroup == null) return;
        uploadFile("achievements" + "/" + selectedGroup.name, imageUpload)
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

        if (selectedGroup.isNew) {
            const docRef = doc(firestore, 'images', 'achievements', selectedGroup.name, 'metadata');
            await setDoc(docRef, {
                name: selectedGroup.name,
                description: selectedGroup.description
            });
        }
        const docRef = await addDoc(
            collection(firestore, 'images', 'achievements', selectedGroup.name),
            {
                url: imageUrl,
                description: imageDescription
            }
        );
    }

    // @ts-ignore
    return (
        <div>
            <Row>
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
            </Row>
            <Row> <Col className="border-top my-3"></Col> </Row>
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
                        imageUrl
                        &&
                        <img src={imageUrl} alt="" className="img-fluid"/>
                    }
                </Col>
                <Col sm="6">
                    <Form.Group>
                        <Form.Label>Описание</Form.Label>
                        <Form.Control
                            type="text"
                            value={imageDescription}
                            onChange={(e) => setImageDescription(e.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row> <Col className="border-top my-3"></Col> </Row>
            <Button variant="primary" className="mt-2" onClick={uploadImage}>Добави</Button>
        </div>
    )
}

export default NewAchievement