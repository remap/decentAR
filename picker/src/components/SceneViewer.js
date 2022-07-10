import React from 'react';

// Displays a representation of the scene represented by sceneJSON.
// Current temp implementation just displays the JSON text itself.
const SceneViewer = (props) => {
  return (
    <div className='scene-viewer'>
        {JSON.stringify(props.sceneJSON)}
    </div>
  );
}

export default SceneViewer;