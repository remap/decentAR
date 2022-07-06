import React ,{useEffect, useState} from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import '../css/Viewer.css';

const Viewer = () => {
    const [sceneJSON, setSceneJSON] = useState({});
    useEffect(() => {
        async function fetchData() {
            const request= await axios.get("https://decentar-bucket.s3.us-west-1.amazonaws.com/decentar_scenes_scene.json");
            setSceneJSON(request.data);
            return request.data;
        }
        fetchData();
    }, [])

    return (
      <div className='viewer-container'>
        <div className='viewer'>
            <babylon id="main-viewer">
                <model url="https://decentar-bucket.s3.us-west-1.amazonaws.com/decentar_objects_plant.glb"></model>
            </babylon>
        </div>
        <Card style={{ width: '41rem'}}>
            <Card.Header>Items</Card.Header>
            <ListGroup variant="flush">
                {Object.values(sceneJSON).map(item => item.url && <ListGroup.Item key={uuidv4()}>{item.url}</ListGroup.Item>)}
            </ListGroup>
        </Card>
      </div>
    );
}

export default Viewer;