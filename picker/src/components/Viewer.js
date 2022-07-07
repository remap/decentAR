import React ,{useEffect, useState} from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../css/Viewer.css';

const Viewer = () => {
    const [sceneJSON, setSceneJSON] = useState({});
    const [tentativeItemValue, setTentativeItemValue] = useState(null);
    const [selectedItemKey, setSelectedItemKey] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const request= await axios.get("https://decentar-bucket.s3.us-west-1.amazonaws.com/decentar_scenes_scene.json");
            setSceneJSON(request.data);
            return request.data;
        }
        fetchData();
    }, []);

    const selectItem = (e) => {
        setSelectedItemKey(e.target.innerText);
    };

    useEffect(() => {
        setTentativeItemValue(sceneJSON[selectedItemKey]);
    }, [selectedItemKey, sceneJSON]);

    const handleSubmit = (event) => {
        let newSceneJSON = {...sceneJSON};
        newSceneJSON[selectedItemKey] = tentativeItemValue;
        setSceneJSON(newSceneJSON);
        event.preventDefault();
    }

    const onChangeURL = (e) => {
        setTentativeItemValue({...tentativeItemValue, url: e.target.value});
    };
    const onChangeX = (e) => {
        setTentativeItemValue({...tentativeItemValue, position: {...tentativeItemValue.position, x: parseFloat(e.target.value)}});
    };
    const onChangeY = (e) => {
        setTentativeItemValue({...tentativeItemValue, position: {...tentativeItemValue.position, y: parseFloat(e.target.value)}});
    };
    const onChangeZ = (e) => {
        setTentativeItemValue({...tentativeItemValue, position: {...tentativeItemValue.position, z: parseFloat(e.target.value)}});
    };
    const onChangePitch = (e) => {
        setTentativeItemValue({...tentativeItemValue, rotation: {...tentativeItemValue.rotation, pitch: parseFloat(e.target.value)}});
    };
    const onChangeYaw = (e) => {
        setTentativeItemValue({...tentativeItemValue, rotation: {...tentativeItemValue.rotation, yaw: parseFloat(e.target.value)}});
    };
    const onChangeRoll = (e) => {
        setTentativeItemValue({...tentativeItemValue, rotation: {...tentativeItemValue.rotation, roll: parseFloat(e.target.value)}});
    };

    return (
      <div className='viewer-container'>
        <Card style={{ width: '50rem'}}>
            <Card.Header>Items</Card.Header>
            <ListGroup variant="flush">
                {Object.entries(sceneJSON).map(([index, item]) => {
                    return item.url && 
                    <ListGroup.Item action onClick={selectItem} key={index}>
                        {index}
                    </ListGroup.Item>;
                })}
            </ListGroup>
        </Card>
        <div>{JSON.stringify(sceneJSON)}</div>
        
        {tentativeItemValue && <Form onSubmit={handleSubmit} style={{ width: '300rem'}}>
            <Form.Group>
                <Form.Label>URL</Form.Label>
                <Form.Control type="text" onChange={onChangeURL} placeholder={sceneJSON[selectedItemKey].url} value={tentativeItemValue.url}/>
            </Form.Group>

            <Row>
                <Form.Group as={Col}>
                    <Form.Label>x</Form.Label>
                    <Form.Control type="number" onChange={onChangeX} placeholder={sceneJSON[selectedItemKey].position.x} value={tentativeItemValue.position.x}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>y</Form.Label>
                    <Form.Control type="number" onChange={onChangeY} placeholder={sceneJSON[selectedItemKey].position.y} value={tentativeItemValue.position.y}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>z</Form.Label>
                    <Form.Control type="number" onChange={onChangeZ} placeholder={sceneJSON[selectedItemKey].position.z} value={tentativeItemValue.position.z}/>
                </Form.Group>
            </Row>
            
            <Row>
                <Form.Group as={Col}>
                    <Form.Label>Pitch</Form.Label>
                    <Form.Control type="number" onChange={onChangePitch} placeholder={sceneJSON[selectedItemKey].rotation.pitch} value={tentativeItemValue.rotation.pitch}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Yaw</Form.Label>
                    <Form.Control type="number" onChange={onChangeYaw} placeholder={sceneJSON[selectedItemKey].rotation.yaw} value={tentativeItemValue.rotation.yaw}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Roll</Form.Label>
                    <Form.Control type="number" onChange={onChangeRoll} placeholder={sceneJSON[selectedItemKey].rotation.roll} value={tentativeItemValue.rotation.roll}/>
                </Form.Group>
            </Row>   
                
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>}
      </div>
    );
}

export default Viewer;