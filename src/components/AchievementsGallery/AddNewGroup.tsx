import React, {useState} from "react";
import {Modal, Button, Form} from 'react-bootstrap';
import {Group} from "./GroupSelection";

interface AddNewGroupProps {
    newGroupAdded: (
        group: Group
    ) => void
}

const AddNewGroup: React.FC<AddNewGroupProps> = ({newGroupAdded}) => {
    const [show, setShow] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log(`Submitting new group: ${groupName} - ${description}`);
        setGroupName('');
        setDescription('');
        let newGroup: Group = {
            name: groupName,
            description: description,
            isNew: true
        }
        newGroupAdded(newGroup)
        handleClose();
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Добави нова група
            </Button>

            <Modal show={show} onHide={handleClose} backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Добави нова група</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Group Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={groupName}
                                onChange={e => setGroupName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddNewGroup;