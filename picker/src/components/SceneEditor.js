import React from 'react';
import SceneHierarchy from './SceneHierarchy';
import SceneViewer from './SceneViewer';
import ObjectEditor from './ObjectEditor';
import '../css/SceneEditor.css';

const placeholderJSON = {"1":{"url":"https://decentar-bucket.s3.us-west-1.amazonaws.com/decentar_objects_gold.glb","position":{"x":0,"y":0,"z":0},"rotation":{"pitch":30,"yaw":0,"roll":0}},"2":{"url":"https://decentar-bucket.s3.us-west-1.amazonaws.com/decentar_objects_gold.glb","position":{"x":3,"y":0,"z":0},"rotation":{"pitch":0,"yaw":5,"roll":0}},"3":{"url":"https://decentar-bucket.s3.us-west-1.amazonaws.com/decentar_objects_plant.glb","position":{"x":5,"y":0,"z":0},"rotation":{"pitch":0,"yaw":10,"roll":50}},"originPoint":{"x":1,"y":0,"z":0}};

const SceneEditor = () => {
    const onClickHierarchyItem = () => {
        console.log("Clicked hierarchy item!");
    }

    const onSubmitObjectEditor = (values) => {
        console.log(`MY LITTLE OBJECT VALUES: ${JSON.stringify(values)}`);
    }

    return (
        <div className='scene-editor'>
            <SceneHierarchy sceneJSON={placeholderJSON} onClickHierarchyItem={onClickHierarchyItem}/>
            <SceneViewer sceneJSON={placeholderJSON}/>
            <ObjectEditor onSubmitObjectEditor={onSubmitObjectEditor}/>
        </div>
    );
}

export default SceneEditor;