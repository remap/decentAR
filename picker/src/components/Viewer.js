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
    const [selectedItemKey, setSelectedItemKey] = useState(null)

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
        {selectedItemKey && <Form style={{ width: '300rem'}}>
            <Form.Group>
                <Form.Label>URL</Form.Label>
                <Form.Control type="text" placeholder={sceneJSON[selectedItemKey].url}/>
            </Form.Group>

            <Row>
                <Form.Group as={Col}>
                    <Form.Label>x</Form.Label>
                    <Form.Control type="text" placeholder={sceneJSON[selectedItemKey].position.x}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>y</Form.Label>
                    <Form.Control type="text" placeholder={sceneJSON[selectedItemKey].position.y}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>z</Form.Label>
                    <Form.Control type="text" placeholder={sceneJSON[selectedItemKey].position.z}/>
                </Form.Group>
            </Row>
            
            <Row>
                <Form.Group as={Col}>
                    <Form.Label>Pitch</Form.Label>
                    <Form.Control type="text" placeholder={sceneJSON[selectedItemKey].rotation.pitch}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Yaw</Form.Label>
                    <Form.Control type="text" placeholder={sceneJSON[selectedItemKey].rotation.yaw}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Roll</Form.Label>
                    <Form.Control type="text" placeholder={sceneJSON[selectedItemKey].rotation.roll}/>
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