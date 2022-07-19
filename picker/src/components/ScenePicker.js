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
                    <Form.Label>Scene Name</Form.Label>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Form.Control type="text" onChange={(e) => onChangeField(e, "url", "text")} value={tentativeSceneValue}/>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form.Group>
                
            </Form>
        </div>
    );
}

export default ScenePicker;