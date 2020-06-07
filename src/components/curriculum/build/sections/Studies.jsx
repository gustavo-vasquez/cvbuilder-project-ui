import React from 'react';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const Studies = () => {
	let formFields = {
			'studyId': 0,
			'title': '',
			'institute': '',
			'city': '',
			'startMonth': '',
			'startYear': '',
			'endMonth': '',
			'endYear': '',
			'description': '',
			'isVisible': true,
			'id_curriculum': 0,
			'formId': 'study',
			'formMode': 0
	};

	return (
		<Formik
		initialValues={formFields}
		validationSchema={Yup.object({
			title: Yup.string()
					 .required()
					 .max(100),
			institute: Yup.string()
						 .required()
						 .max(100),
			city: Yup.string()
					  .required()
					  .max(100),
			startMonth: Yup.string()
						.oneOf(["december"], "Mes no válido.")
						.required(),
			startYear: Yup.string()
						.oneOf(["2020"], "Año no válido.")
						.required(),
			endMonth: Yup.string()
						.oneOf(["december"], "Mes no válido.")
						.required(),
			endYear: Yup.string()
						.oneOf(["2020"], "Año no válido.")
						.required(),
			description: Yup.string()
						.max(300)
		})}
		onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    	}}>
		{({ values, isSubmitting }) => (
			<Form id="personal_detail_section_form">
				<legend className="mb-4">Detalles personales</legend>
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
			            <Col>
			                <div className="form-group">
			                    <label>Título académico</label>
			                    <Field id="title" name="title" className="form-control"></Field>
			                    <ErrorMessage name="title" component="div" className="text-danger"></ErrorMessage>
			                </div>
			            </Col>
			        </Row>

			        <Row>
			            <Col md={6}>
			                <div className="form-group">
			                    <label>Instituto</label>
			                    <Field id="institute" name="institute" className="form-control"></Field>
			                    <ErrorMessage name="institute" component="div" className="text-danger"></ErrorMessage>
			                </div>
			            </Col>
			            <Col md={6}>
			                <div className="form-group">
			                    <label>Ciudad</label>
			                    <Field id="city" name="city" className="form-control"></Field>
			                    <ErrorMessage name="city" component="div" className="text-danger"></ErrorMessage>
			                </div>
			            </Col>
			        </Row>

			        <Row>
			            <Col md={6}>
			                <div className="form-group">
			                    <label>Fecha de ingreso</label>
			                    <Row>
			                        <Col md={8}>
			                        	<Field as="select" id="startMonth" name="startMonth" className="custom-select">
			                        		<option value="">Elegir mes...</option>
			                        		<option value="december">Diciembre</option>
			                        	</Field>
			                        </Col>
			                        <div md={4}>
			                        	<Field as="select" id="startYear" name="startYear" className="custom-select">
			                        		<option value="">Elegir año...</option>
			                        		<option value="2020">2020</option>
			                        	</Field>
			                        </div>
			                    </Row>
	                        	<ErrorMessage name="startMonth" component="div" className="text-danger"></ErrorMessage>
	                        	<ErrorMessage name="startYear" component="div" className="text-danger"></ErrorMessage>
			                </div>
			            </Col>
			            <Col md={6}>
			                <div className="form-group">
			                    <label>Fecha de finalización</label>
			                    <Row>
			                        <Col md={8}>
			                        	<Field as="select" id="endMonth" name="endMonth" className="custom-select">
			                        		<option value="">Elegir mes...</option>
			                        		<option value="december">Diciembre</option>
			                        	</Field>
			                        </Col>
			                        <Col md={4}>
			                        	<Field as="select" id="endYear" name="endYear" className="custom-select">
			                        		<option value="">Elegir año...</option>
			                        		<option value="2020">2020</option>
			                        	</Field>
			                        </Col>
			                    </Row>
			                    <ErrorMessage name="endMonth" component="div" className="text-danger"></ErrorMessage>
	                        	<ErrorMessage name="endYear" component="div" className="text-danger"></ErrorMessage>
			                </div>
			            </Col>
			        </Row>

			        <Row>
			            <Col>
			                <div className="form-group">
			                    <label>Información adicional</label>
			                    <Field as="textarea" id="description" name="description" rows="3" className="form-control" placeholder="Máximo 300 caracteres..."></Field>
			                    <ErrorMessage name="description" component="div" className="text-danger"></ErrorMessage>
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