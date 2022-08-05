import React, { useState, useEffect } from 'react';

const NavViewer = (props) => {
    return (
        <div className='nav-viewer'>
            NAV VIEWER
            <div style={{maxWidth: '50rem'}}>{JSON.stringify(props.sceneJSON)}</div>
        </div>
    );
}

export default NavViewer;