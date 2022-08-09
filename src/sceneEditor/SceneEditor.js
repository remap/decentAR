import React, { useState, useEffect } from 'react';
import axios from 'axios';
import uuid from 'react-uuid';
import ObjectHierarchy from './ObjectHierarchy';
import SceneViewer from './SceneViewer';
import ScenePicker from './ScenePicker';
import '../css/SceneEditor.css';
import { bucketURL } from '../constants/constants';

const placeholderURL = bucketURL + "decentar_scenes_scene.json";

const SceneEditor = () => {
    const [sceneJSON, setSceneJSON] = useState({});
    const [sceneURL, setSceneURL] = useState(placeholderURL);

    useEffect(() => {
        async function fetchData(sceneURL) {
            const request= await axios.get(sceneURL);
            setSceneJSON(request.data);
            return request.data;
        }
        if (sceneURL) {
            fetchData(sceneURL);
        }
    }, [sceneURL]);

    const addNewObject = (e, objectValue) => {
        let newID = uuid();
        while (sceneJSON[newID]) {
            newID = uuid();
        }
        let newSceneJSON = {...sceneJSON}
        newSceneJSON[newID] = objectValue;
        setSceneJSON(newSceneJSON);
        e.preventDefault();
    }

    const onSubmitObjectEditor = (e, objectValue, index) => {
        let newSceneJSON = {...sceneJSON};
        newSceneJSON[index] = objectValue;
        setSceneJSON(newSceneJSON);
        axios.put(sceneURL, newSceneJSON, {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}});
        e.preventDefault();
    }

    const onDeleteObject = ({e, index}) => {
        let newSceneJSON = {...sceneJSON};
        delete newSceneJSON[index];
        setSceneJSON(newSceneJSON);
        axios.put(sceneURL, newSceneJSON, {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}});
        e.preventDefault();
    }

    const pickScene = (e, scene) =>  {
        e.preventDefault();
        const sceneURL = bucketURL + scene + ".json";
        setSceneURL(sceneURL);
    }

    return (
        <div className='scene-editor'>
            <ObjectHierarchy sceneJSON={sceneJSON}
                                    addNewObject={addNewObject}
                                    onSubmitObjectEditor={onSubmitObjectEditor}
                                    onDeleteObject={onDeleteObject}
                />
            <div style={{width:'100%', display: 'flex', flexDirection: 'column', rowGap: '2rem'}}>
                <ScenePicker pickScene={pickScene}/>
                <SceneViewer sceneJSON={sceneJSON}/>
            </div>
        </div>
    );
}

export default SceneEditor;