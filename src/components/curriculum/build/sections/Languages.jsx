import React from 'react';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const Languages = () => {
	let formFields = {
			'languageId': 0,
			'name': '',
			'level': '',
			'isVisible': true,
			'id_curriculum': 0,
			'formId': 'language',
			'formMode': 0
	};

	return (
		<Formik
		initialValues={formFields}
		validationSchema={Yup.object({
			name: Yup.string()
					 .max(100)
					 .required(),
			level: Yup.string()
					  .oneOf(["advanced","expert"], "Debe elegir un nivel.")
					  .required()
		})}
		onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    	}}>
		{({ values, isSubmitting }) => (
			<Form id="language_section_form">
				<legend className="mb-4">Idioma</legend>
				<fieldset>
					{/*<input type="hidden" id="studyId" />
					<input type="hidden" id="type" />*/}
					<Row className="mb-4">
			            <Col md={10}>
			                <div className="custom-control custom-switch">
			                	<Field type="checkbox" id="is_visible" name="isVisible" className="custom-control-input"></Field>
			                    <label className="custom-control-label" htmlFor="is_visible">Bloque visible</label>
			                </div>
			            </Col>
			            <Col md={2} className="text-right">
			                <Button type="button" variant="outline-secondary" size="sm" className="border-0 close-block" title="Cerrar">
			                    <i className="fas fa-times h4 mb-0"></i>
			                </Button>
			            </Col>
			        </Row>

			        <Row>
			            <Col md={6}>
			                <div className="form-group">
			                    <label>Idioma</label>
			                    <Field id="name" name="name" className="form-control" placeholder="Ej: Español"></Field>
			                    <ErrorMessage name="name" component="div" className="text-danger"></ErrorMessage>
			                </div>
			            </Col>
			            <Col md={6}>
			                <div className="form-group">
			                    <label>Nivel</label>
			                    <Field as="select" id="level" name="level" className="custom-select">
	                        		<option value="">Elegir nivel...</option>
	                        		<option value="advanced">Avanzado</option>
	                        		<option value="expert">Experto</option>
	                        	</Field>
	                            <ErrorMessage name="level" component="div" className="text-danger"></ErrorMessage>
			                </div>
			            </Col>
			        </Row>
			    </fieldset>

			    <Row>
			        <Col>
			            <ButtonGroup className="btn-block">
			                <Button type="submit" variant="success" size="sm" disabled={isSubmitting}><i className="fas fa-check"></i> Hecho</Button>&nbsp;
			                <Button type="button" variant="danger" size="sm" className="remove-form-block"><i className="far fa-trash-alt"></i> Eliminar</Button>
			            </ButtonGroup>
			        </Col>
			    </Row>
			</Form>
		)}
		</Formik>
	);
}