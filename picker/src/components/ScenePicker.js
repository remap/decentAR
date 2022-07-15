import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ScenePicker = (props) => {
    const [tentativeSceneValue, setTentativeSceneValue] = useState("");

    useEffect(() => {
        setTentativeSceneValue("");
    }, []);

    const onChangeField = (e) => {
        setTentativeSceneValue(e.target.value);
    }

    return (
        <div className='scene-picker'>
            <Form onSubmit={(e) => props.pickScene(e, tentativeSceneValue)}>
                <Form.Group>
                    <Form.Label>URL</Form.Label>
                    <Form.Control type="text" onChange={(e) => onChangeField(e, "url", "text")} value={tentativeSceneValue}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default ScenePicker;