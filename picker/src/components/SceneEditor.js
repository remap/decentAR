import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SceneHierarchy from './SceneHierarchy';
import SceneViewer from './SceneViewer';
import '../css/SceneEditor.css';

const SceneEditor = () => {
    const [sceneJSON, setSceneJSON] = useState({});

    useEffect(() => {
        async function fetchData() {
            const request= await axios.get("https://decentar-bucket.s3.us-west-1.amazonaws.com/decentar_scenes_scene.json");
            setSceneJSON(request.data);
            return request.data;
        }
        fetchData();
    }, []);

    const onSubmitObjectEditor = (e, itemValue, index) => {
        let newSceneJSON = {...sceneJSON};
        newSceneJSON[index] = itemValue;
        setSceneJSON(newSceneJSON);
        axios.put("https://decentar-bucket.s3.us-west-1.amazonaws.com/decentar_scenes_scene.json", newSceneJSON, {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}});
        e.preventDefault();
    }

    return (
        <div className='scene-editor'>
            <SceneHierarchy sceneJSON={sceneJSON}
                            onSubmitObjectEditor={onSubmitObjectEditor}
                            style={{minWidth:'50rem'}}
            />
            <SceneViewer sceneJSON={sceneJSON}/>
        </div>
    );
}

export default SceneEditor;