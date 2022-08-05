import React, { useState, useEffect } from 'react';
import NavSelector from './NavSelector';
import NavViewer from './NavViewer';
import NavList from './NavList';

const Navigator = (props) => {
    const [sceneList, setSceneList] = useState([]);
    const [sceneJSON, setSceneJSON] = useState({});

    const addScene = (e, scene) => {
        e.preventDefault();
        let newSceneList = [...sceneList, scene];
        setSceneList(newSceneList);
    }

    return (
        <div className='navigator'>
            <NavSelector addScene={addScene}/>
            <NavList sceneList={sceneList}/>
            <NavViewer/>
        </div>
    );
}

export default Navigator;