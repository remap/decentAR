import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SceneHierarchy from './SceneHierarchy';
import SceneViewer from './SceneViewer';
import ObjectEditor from './ObjectEditor';
import '../css/SceneEditor.css';

const SceneEditor = () => {
    const [sceneJSON, setSceneJSON] = useState({});
    const [selectedItemKey, setSelectedItemKey] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const request= await axios.get("https://decentar-bucket.s3.us-west-1.amazonaws.com/decentar_scenes_scene.json");
            setSceneJSON(request.data);
            return request.data;
        }
        fetchData();
    }, []);

    const onClickHierarchyItem = (itemKey) => {
        let newItemKey = itemKey
        setSelectedItemKey(newItemKey);
    }

    const onSubmitObjectEditor = (values) => {
        console.log(`MY LITTLE OBJECT VALUES: ${JSON.stringify(values)}`);
    }

    return (
        <div className='scene-editor'>
            <SceneHierarchy sceneJSON={sceneJSON} onClickHierarchyItem={onClickHierarchyItem}/>
            <SceneViewer sceneJSON={sceneJSON}/>
            <ObjectEditor onSubmitObjectEditor={onSubmitObjectEditor} sceneJSON={sceneJSON}/>
        </div>
    );
}

export default SceneEditor;