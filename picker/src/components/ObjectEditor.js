import React from 'react';
import { Formik } from "formik";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const ObjectEditor = (props) => {
    return (
        <div className='object-editor'>
            {Object.entries(props.sceneJSON).map(([index, item]) => {
                return item.url && 
                    <Formik
                    key={index}
                    onSubmit={props.onSubmitObjectEditor}
                    initialValues={{
                        url: item.url,
                        x: parseFloat(item.x),
                        y: parseFloat(item.y),
                        z: parseFloat(item.z),
                        pitch: parseFloat(item.pitch),
                        yaw: parseFloat(item.yaw),
                        roll: parseFloat(item.roll),
                    }}
                >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="url"
                                value={values.url}
                                onChange={handleChange}
                                isValid={touched.url && !errors.url}
                            />
                        </Form.Group>

                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>x</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="x"
                                    value={values.x}
                                    onChange={handleChange}
                                    isValid={touched.x && !errors.x}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>y</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="y"
                                    value={values.y}
                                    onChange={handleChange}
                                    isValid={touched.y && !errors.y}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>z</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="z"
                                    value={values.z}
                                    onChange={handleChange}
                                    isValid={touched.z && !errors.z}
                                />
                            </Form.Group>
                        </Row>
                        
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Pitch</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="pitch"
                                    value={values.pitch}
                                    onChange={handleChange}
                                    isValid={touched.pitch && !errors.pitch}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Yaw</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="yaw"
                                    value={values.yaw}
                                    onChange={handleChange}
                                    isValid={touched.yaw && !errors.yaw}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Roll</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="roll"
                                    value={values.roll}
                                    onChange={handleChange}
                                    isValid={touched.roll && !errors.roll}
                                />
                            </Form.Group>
                        </Row>   

                        <Button type="submit">Submit form</Button>
                    </Form>
                )}
                </Formik>
            })}
        </div>
  );
}

export default ObjectEditor;