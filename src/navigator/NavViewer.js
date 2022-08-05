import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const NavViewer = (props) => {
    return (
        <div className='nav-viewer'>
            <Card className="nav-list">
                <Card.Header>NAV VIEWER</Card.Header>
                <ListGroup variant="flush" style={{overflow: 'scroll'}}>
                    {props.sceneJSONList.map((sceneJSON, index) => 
                        <ListGroup.Item key={index} style={{display:'flex'}}>
                            {JSON.stringify(sceneJSON)}
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card>
        </div>
    );
}

export default NavViewer;