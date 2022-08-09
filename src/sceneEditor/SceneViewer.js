import React from 'react';
import '../css/SceneViewer.css';

// Displays a representation of the scene represented by sceneJSON.
// Current temp implementation just displays the JSON text itself.
const SceneViewer = (props) => {
  return (
    <div className='scene-viewer'>
      <div style={{maxWidth: '50rem'}}>{JSON.stringify(props.sceneJSON)}</div>
    </div>
  );
}

// <a data-8code="jywmx"></a>

export default SceneViewer;