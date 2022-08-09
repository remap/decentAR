import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const NavList = (props) => {    
    return (
        <Card className="nav-list">
            <Card.Header>NAV LIST</Card.Header>
            <ListGroup variant="flush" style={{overflow: 'scroll'}}>
                {props.sceneList.map((scene, index) => 
                        <ListGroup.Item key={index} style={{display:'flex'}}>
                            {scene}
                        </ListGroup.Item>
                )}
            </ListGroup>
        </Card>
    );
}

export default NavList;