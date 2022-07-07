import React ,{useEffect, useState} from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
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
        
        <Card style={{ width: '200rem'}}>
            <Card.Header>Editor</Card.Header>
            {selectedItemKey && <ListGroup variant="flush">
                <ListGroup.Item>
                    URL: {sceneJSON[selectedItemKey].url}
                </ListGroup.Item>
                <ListGroup.Item>
                    POSITION: {sceneJSON[selectedItemKey].position.x},
                    {sceneJSON[selectedItemKey].position.y},
                    {sceneJSON[selectedItemKey].position.z}
                </ListGroup.Item>
                <ListGroup.Item>
                    ROTATION: {sceneJSON[selectedItemKey].rotation.pitch},
                    {sceneJSON[selectedItemKey].rotation.yaw},
                    {sceneJSON[selectedItemKey].rotation.roll}
                </ListGroup.Item>
            </ListGroup>}
            <Button>Save</Button>
        </Card>
      </div>
    );
}

export default Viewer;