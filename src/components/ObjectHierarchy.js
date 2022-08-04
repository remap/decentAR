import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ObjectEditor from './ObjectEditor';
import Button from 'react-bootstrap/Button';
import { placeholderItemValue } from '../constants/constants';
import '../css/ObjectHierarchy.css';

// Renders a card containing a list item for each object in props.sceneJSON.
// Each item consists of the ID of the object.
// Upon clicking each item, onClickHierarchyItem is called.
const ObjectHierarchy = (props) => {
  return (
    <Card className="object-hierarchy">
            <Card.Header>Items</Card.Header>
            <ListGroup variant="flush" style={{overflow: 'scroll'}}>
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
  );
}

export default ObjectHierarchy;