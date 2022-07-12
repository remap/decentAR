import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ObjectEditor from './ObjectEditor';

// Renders a card containing a list item for each object in props.sceneJSON.
// Each item consists of the ID of the object.
// Upon clicking each item, onClickHierarchyItem is called.
const SceneHierarchy = (props) => {
  return (
    <div className='scene-hierarchy'>
        <Card style={{width: '25rem'}}>
            <Card.Header>Items</Card.Header>
            <ListGroup variant="flush" style={{overflow: 'scroll'}}>
                {Object.entries(props.sceneJSON).map(([index, item]) => {
                    return item.url && 
                    <ListGroup.Item key={index} style={{display:'flex'}}>
                      <ObjectEditor onSubmitObjectEditor={props.onSubmitObjectEditor} itemValue={item} index={index}/>
                    </ListGroup.Item>;
                })}
            </ListGroup>
        </Card>
    </div>
  );
}

export default SceneHierarchy;