import React from 'react';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class Certificate extends React.Component {
	render() {
		let formFields = {
				'certificateId': 0,
				'name': '',
				'institute': '',
				'onlineMode': false,
				'inProgress': false,
				'year': '',
				'description': '',
				'isVisible': true,
				'id_curriculum': 0,
				'formId': 'certificate',
				'formMode': 0
		};
	
		return (
			<Formik
			initialValues={formFields}
			validationSchema={Yup.object({
				name: Yup.string()
						 .max(100)
						 .required(),
				institute: Yup.string()
							 .max(100)
							 .required(),
				year: Yup.string()
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
				<Form id={this.props.formId}>
					<div className="text-center py-2"><i class="fas fa-chevron-down"></i></div>
					<legend className="text-center">Certificado</legend>
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
				                <Button type="button" onClick={this.props.closeForm} variant="outline-secondary" size="sm" className="border-0 close-block" title="Cerrar">
				                    <i className="fas fa-times h4 mb-0"></i>
				                </Button>
				            </Col>
				        </Row>
	
				        <Row>
				            <Col md={6}>
				                <div className="form-group">
				                    <label>Nombre del certificado</label>
				                    <Field id="name" name="name" className="form-control"></Field>
				                    <ErrorMessage name="name" component="div" className="text-danger"></ErrorMessage>
				                </div>
				            </Col>
				            <Col md={6}>
				                <div className="form-group">
				                    <label>Instituto/establecimiento</label>
				                    <Field id="institute" name="institute" className="form-control"></Field>
				                    <ErrorMessage name="institute" component="div" className="text-danger"></ErrorMessage>
				                </div>
				            </Col>
				        </Row>
	
				        <Row>
				            <Col md={6}>
				                <div className="form-group">
					                <div className="custom-control custom-checkbox">
					                	<Field type="checkbox" id="online_mode" name="onlineMode" className="custom-control-input"></Field>
				                        <label className="custom-control-label" htmlFor="online_mode">Por internet</label>
				                    </div>
				                </div>
				            </Col>
				            <Col md={6}>
				                <div className="form-group">
					                <Row>
				                        <Col md={7}>
				                            <div className="custom-control custom-checkbox">
					                            <Field type="checkbox" id="in_progress" name="inProgress" className="custom-control-input"></Field>
					                        	<label className="custom-control-label" htmlFor="in_progress">En la actualidad</label>
				                            </div>
				                        </Col>
				                        <Col md={5}>
				                        	<Field as="select" id="year" name="year" className="custom-select">
				                        		<option value="">Elegir año...</option>
				                        		<option value="2020">2020</option>
				                        	</Field>
				                            <ErrorMessage name="year" component="div" className="text-danger"></ErrorMessage>
				                        </Col>
				                    </Row>
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
}

export { Certificate };