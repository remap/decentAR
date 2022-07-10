import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

// Renders a card containing a list item for each object in props.sceneJSON.
// Each item consists of the ID of the object.
// Upon clicking each item, onClickHierarchyItem is called.
const SceneHierarchy = (props) => {
  return (
    <div className='scene-hierarchy'>
        <Card>
            <Card.Header>Items</Card.Header>
            <ListGroup variant="flush">
                {Object.entries(props.sceneJSON).map(([index, item]) => {
                    return item.url && 
                    <ListGroup.Item action onClick={props.onClickHierarchyItem} key={index}> {index} </ListGroup.Item>;
                })}
            </ListGroup>
        </Card>
    </div>
  );
}

export default SceneHierarchy;