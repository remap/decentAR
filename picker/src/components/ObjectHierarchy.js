import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ObjectEditor from './ObjectEditor';
import Button from 'react-bootstrap/Button';
import { placeholderItemValue } from '../constants/constants';

// Renders a card containing a list item for each object in props.sceneJSON.
// Each item consists of the ID of the object.
// Upon clicking each item, onClickHierarchyItem is called.
const ObjectHierarchy = (props) => {
  return (
    <div className='object-hierarchy'>
        <Card style={{width: '25rem'}}>
            <Card.Header>Items</Card.Header>
            <ListGroup variant="flush">
                {Object.entries(props.sceneJSON).map(([index, item]) => {
                    return (index !== "originPoint") && 
                    <ListGroup.Item key={index} style={{display:'flex'}}>
                      <ObjectEditor onSubmitObjectEditor={props.onSubmitObjectEditor} 
                                    onDeleteObject={props.onDeleteObject}
                                    itemValue={item} 
                                    index={index}/>
                    </ListGroup.Item>;
                })}
            </ListGroup>
            <Button onClick={(e) => props.addNewObject(e, placeholderItemValue)}>
                Add object
            </Button>
        </Card>
    </div>
  );
}

export default ObjectHierarchy;