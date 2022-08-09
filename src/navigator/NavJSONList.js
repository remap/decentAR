import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const NavJSONList = (props) => {
    return (
        <div className='nav-jsonlist'>
            <Card className="nav-list">
                <Card.Header>SCENE JSON</Card.Header>
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

export default NavJSONList;