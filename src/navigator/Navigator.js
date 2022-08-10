import React, { useState, useEffect } from 'react';
import NavSelector from './NavSelector';
import NavJSONList from './NavJSONList';
import NavList from './NavList';
import axios from 'axios';
import '../css/Navigator.css';

const Navigator = (props) => {
    const [sceneURLList, setSceneURLList] = useState([]);
    const [sceneJSONList, setSceneJSONList] = useState([]);

    // Init sceneJSONList w/ get requests from URLS in sceneURLList
    useEffect(() => {
        console.log('aa');
        async function fetchData(sceneURLList) {
            Promise.all(sceneURLList.map((sceneURL) => axios.get(sceneURL))).then(
                (responseList) => {
                    setSceneJSONList(responseList.map(responseObj => responseObj.data));
                }
            )
        }
        if (sceneURLList) {
            fetchData(sceneURLList);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Takes in scene URL and updates sceneURLList and sceneJSONList accordingly
    const addScene = (e, sceneURL) => {
        e.preventDefault();
        // Update URL list
        let newSceneList = [...sceneURLList, sceneURL];
        setSceneURLList(newSceneList);
        // Update JSON list
        axios.get(sceneURL).then((response) => {
            let newSceneJSONList = [...sceneJSONList, response.data];
            setSceneJSONList(newSceneJSONList);
        });
    }

    return (
        <div className='navigator'>
            <NavSelector addScene={addScene}/>
            <NavList sceneList={sceneURLList}/>
            <NavJSONList sceneJSONList={sceneJSONList}/>
        </div>
    );
}

export default Navigator;