import React, {useEffect, useRef, useState} from 'react';
import Col from 'react-bootstrap/Col';
import {listSubDirectories} from "./ImageUpload";
import {Button, Dropdown, Row} from "react-bootstrap";
import AddNewGroup from "./AddNewGroup";

export type Group = {
    name: string,
    description: string | null,
    isNew: boolean
}

interface GroupSelectionProps {
    onChange: (
        group: Group,
    ) => void;
}

const GroupSelection: React.FC<GroupSelectionProps> = ({onChange}) => {
    const [existingGroups, setExistingGroups] = useState<string[]>([]);
    const [selectedGroupName, setSelectedGroupName] = useState<string | null>(null);
    const [newGroup, setNewGroup] = useState<Group>();
    const newGroupRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        const fetchData = async () => {
            const result = await listSubDirectories('/achievements');
            setExistingGroups(result);
        };

        fetchData();
    }, []);

    useEffect(() => {
        newGroupRef.current && newGroupRef.current.focus();
    }, []);

    const handleExistingSelected = (groupName: string | null) => {
        if (groupName == null) return;
        setSelectedGroupName(groupName);
    }

    const handleNewSelected = (group: Group) => {
        setSelectedGroupName(group.name);
        setNewGroup(group)
    }

    const handleGroupSelected = () => {
        if (newGroup) {
            onChange(newGroup)
        } else {
            let existingGroup: Group = {
                name: selectedGroupName!!,
                description: null,
                isNew: false
            }
            onChange(existingGroup)
        }
    }

    return (
        <div>
            <Row>
                <Col sm="6">
                    <Dropdown onSelect={handleExistingSelected}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {selectedGroupName || 'Select existing group'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {existingGroups.map((group, index) => (
                                <Dropdown.Item eventKey={group} key={index}>
                                    {group}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col sm="6">
                    <AddNewGroup newGroupAdded={handleNewSelected}/>
                </Col>
            </Row>
            <Row>
                <Button variant="primary" className="mt-2" onClick={handleGroupSelected}
                        disabled={!selectedGroupName}>Избери</Button>
            </Row>
        </div>
    );
};

export default GroupSelection;