import React, { useState, useEffect } from 'react';
import axios from 'axios';
import uuid from 'react-uuid';
import ObjectHierarchy from './ObjectHierarchy';
import SceneViewer from './SceneViewerOld';
import ScenePicker from './ScenePicker';
import '../css/SceneEditor.css';

const SceneEditor = () => {
    const [sceneJSON, setSceneJSON] = useState({});

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
        // axios.put(sceneURL, newSceneJSON, {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}});
        e.preventDefault();
    }

    const onDeleteObject = ({e, index}) => {
        let newSceneJSON = {...sceneJSON};
        delete newSceneJSON[index];
        setSceneJSON(newSceneJSON);
        // axios.put(sceneURL, newSceneJSON, {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}});
        e.preventDefault();
    }

    const onSubmitScene = (e, scene) =>  {
        e.preventDefault();
        console.log("onSubmitScene fired.");
        console.log(`SCENE NAME: ${scene}`);
        console.log("OBJECT:");
        console.log(sceneJSON);
        // const sceneURL = bucketURL + scene + ".json";
        // setSceneURL(sceneURL);
    }

    return (
        <div className='scene-editor'>
            <ObjectHierarchy sceneJSON={sceneJSON}
                                    addNewObject={addNewObject}
                                    onSubmitObjectEditor={onSubmitObjectEditor}
                                    onDeleteObject={onDeleteObject}
                />
            <div style={{width:'100%', display: 'flex', flexDirection: 'column', rowGap: '2rem'}}>
                <ScenePicker onSubmitScene={onSubmitScene}/>
                <div style={{maxWidth: '50rem'}}>{JSON.stringify(sceneJSON)}</div>
            </div>
        </div>
    );
}

export default SceneEditor;