import React from 'react';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';

export const FormikFormModel = props => {
	return (
		<Formik initialValues={props.initialFormValues} validationSchema={props.formValidationSchema} onSubmit={props.formikSubmit} enableReinitialize>
		{({ values, isSubmitting }) => (
			<Form id={props.formId}>
				<div className="text-center py-2"><i className="fas fa-chevron-down"></i></div>
				<legend className="mb-4">{props.formTitle}</legend>
				<fieldset>
					<Row className="mb-4">
			            <Col md="10">
			                <div className="custom-control custom-switch">
			                	<Field type="checkbox" id="is_visible" name="isVisible" className="custom-control-input"></Field>
			                    <label className="custom-control-label" htmlFor="is_visible">Bloque visible</label>
			                </div>
			            </Col>
			            <Col md="2" className="text-right">
			                <button type="button" onClick={props.closeForm} className="close-block" title="Cerrar">
			                    <i className="fas fa-times h4 mb-0"></i>
			                </button>
			            </Col>
			        </Row>

			        {props.useValues ? props.children(values) : props.children}
			    </fieldset>

			    <Row>
			        <Col>
			            <ButtonGroup className="btn-block">
			                <Button type="submit" variant="success" size="sm" disabled={isSubmitting}><i className="fas fa-check"></i> Hecho</Button>&nbsp;
			                <Button onClick={() => props.editMode ? props.removeBlock(props.sectionIndex, props.initialFormValues.studyId) : props.closeForm() } type="button" variant="danger" size="sm" className="remove-form-block"><i className="far fa-trash-alt"></i> Eliminar</Button>
			            </ButtonGroup>
			        </Col>
			    </Row>
			</Form>
		)}
		</Formik>
	);
}