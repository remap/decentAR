import React from 'react';
import '../css/SceneViewer.css';

const placeholderSceneFile = {
  "1":{"url":"firstobject","position":{"x":6,"y":6,"z":0},"rotation":{"pitch":0,"yaw":10,"roll":100}},
  "2":{"url":"secondobject","position":{"x":4,"y":0,"z":0},"rotation":{"pitch":0,"yaw":30,"roll":0}},
  "3":{"url":"thirdobject","position":{"x":1,"y":2,"z":3},"rotation":{"pitch":20,"yaw":0,"roll":0}},
  "originPoint":{"x":0,"y":0,"z":0}
};


// Displays a representation of the scene represented by sceneJSON.
// Current temp implementation just displays the JSON text itself.
const SceneViewerPrototype = (props) => {
  const getObjectFile = (objectFileName) => {
    console.log("getObjectFile fired.");
  }

  const getSceneFile = (sceneFileName) => {
    console.log(`getSceneFile fired with sceneFileName: ${sceneFileName}.`);
    // Fetch the scene file
    // Parse the scene file and retrieve all objects
    // Display the objects on the viewer
  }

  return (
    <div className='scene-viewer'>
      <button onClick={() => getSceneFile("placeholderSceneFileName")}>Consume</button>
      <div style={{maxWidth: '50rem'}}>{JSON.stringify(props.sceneJSON)}</div>
    </div>
  );
}

// <a data-8code="jywmx"></a>

export default SceneViewerPrototype;