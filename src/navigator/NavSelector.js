import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const NavSelector = (props) => {
    const [tentativeSceneURL, setTentativeSceneURL] = useState("");

    useEffect(() => {
        setTentativeSceneURL("");
    }, []);

    const onChangeField = (e) => {
        setTentativeSceneURL(e.target.value);
    }

    const addScene = (e, tentativeSceneURL) => {
        e.preventDefault();
        if (tentativeSceneURL) {
            props.addScene(e, tentativeSceneURL);
            setTentativeSceneURL("");
        }
    }

    return (
        <div className='nav-selector'>
            <Form onSubmit={(e) => addScene(e, tentativeSceneURL)}>
                <Form.Group>
                    <Form.Label>Scene Name</Form.Label>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Form.Control type="text" onChange={(e) => onChangeField(e, "url", "text")} value={tentativeSceneURL}/>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form.Group>     
            </Form>
        </div>
    );
}

export default NavSelector;