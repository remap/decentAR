import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { placeholderItemValue } from '../constants/constants';
import ConfirmationModal from './ConfirmationModal';

const ObjectEditor = (props) => {
    const [tentativeItemValue, setTentativeItemValue] = useState(JSON.parse(JSON.stringify(placeholderItemValue)));

    useEffect(() => {
        setTentativeItemValue(props.itemValue);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onChangeField = (e, field, type) => {
        let newValue = {...tentativeItemValue};
        if (type === "number") {
            newValue[field] = parseFloat(e.target.value);
        } else {
            newValue[field] = e.target.value;
        }
        setTentativeItemValue(newValue);
    }

    const onChangeObject = (e, field_1, field_2, type) => {
        let newValue = {...tentativeItemValue};
        if (type === "number") {
            newValue[field_1][field_2] = parseFloat(e.target.value);
        } else {
            newValue[field_1][field_2] = e.target.value;
        }
        setTentativeItemValue(newValue);
    }

    return (
        <div className='object-editor'>
            <Form onSubmit={(e) => props.onSubmitObjectEditor(e, tentativeItemValue, props.index)}>
                <Form.Group>
                    <Form.Label>Object URL</Form.Label>
                    <Form.Control type="text" onChange={(e) => onChangeField(e, "url", "text")} value={tentativeItemValue.url}/>
                </Form.Group>

                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>x</Form.Label>
                        <Form.Control type="number" onChange={(e) => onChangeObject(e, "position", "x", "number")} value={tentativeItemValue.position.x}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>y</Form.Label>
                        <Form.Control type="number" onChange={(e) => onChangeObject(e, "position", "y", "number")} value={tentativeItemValue.position.y}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>z</Form.Label>
                        <Form.Control type="number" onChange={(e) => onChangeObject(e, "position", "z", "number")} value={tentativeItemValue.position.z}/>
                    </Form.Group>
                </Row>
                
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Pitch</Form.Label>
                        <Form.Control type="number" onChange={(e) => onChangeObject(e, "rotation", "pitch", "number")} value={tentativeItemValue.rotation.pitch}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Yaw</Form.Label>
                        <Form.Control type="number" onChange={(e) => onChangeObject(e, "rotation", "yaw", "number")} value={tentativeItemValue.rotation.yaw}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Roll</Form.Label>
                        <Form.Control type="number" onChange={(e) => onChangeObject(e, "rotation", "roll", "number")} value={tentativeItemValue.rotation.roll}/>
                    </Form.Group>
                </Row>

                <div style={{display: 'flex', flexDirection: 'row', paddingTop: '0.75rem', justifyContent: 'space-between'}}>
                    <ConfirmationModal confirmArgs={{index: props.index}} onModalConfirm={props.onDeleteObject}/>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
  );
}

export default ObjectEditor;