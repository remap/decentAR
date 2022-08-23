import React, { useState, useEffect } from 'react';
import NavSelector from './NavSelector';
import NavJSONList from './NavJSONList';
import NavList from './NavList';
import axios from 'axios';
import '../css/Navigator.css';

const Navigator = (props) => {
    const [sceneURLList, setSceneURLList] = useState([]);
    const [sceneJSONList, setSceneJSONList] = useState([]);

    async function fetchData(sceneURLList) {
        Promise.all(sceneURLList.map((sceneURL) => axios.get(sceneURL))).then(
            (responseList) => {
                setSceneJSONList(responseList.map(responseObj => responseObj.data));
            }
        )
    }

    // Init sceneJSONList w/ get requests from URLS in sceneURLList
    useEffect(() => {
        console.log("SCENE:");
        console.log(window);
        fetch(`https://cloudflare-dns.com/dns-query?name=ndn.${window.location.hostname}&type=TXT&server=8.8.4.4`, {
            method: 'GET',
            headers: {
                'Accept': 'application/dns-json',
            }
        })
        .then(response => {
            console.log(`RESPONSE: ${response}`);
            return response.json();
        })
        .then(data => {
            console.log(data)
            console.log(`DATA: ${JSON.stringify(data)}`)
            let sceneurl=''
            if (typeof data.Answer != 'undefined') { 
                data.Answer.forEach(function(txt,k) {
                    let split=txt.data.replaceAll('"','').split("=",2)
                    let key = split[0]
                    let value = split[1]
                    console.log(`KEY: ${key}`)
                    if (key==="root_scene"){
                        sceneurl=value
                    }
                })
            }
            console.log(`SCENE URL: ${sceneurl}`);
            setSceneURLList([sceneurl]);
            return sceneurl;
        })
        .then(sceneurl => axios.get(sceneurl).then(sceneJSON => {
            setSceneJSONList([sceneJSON]);
        }));
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