import React from 'react';
import { Row, Col, Button, InputGroup, ButtonGroup } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const PersonalReference = () => {
	let formFields = {
			'personalReferenceId': 0,
			'company': '',
			'contactPerson': '',
			'areaCode': '',
			'telephone': '',
			'email': '',
			'isVisible': true,
			'id_curriculum': 0,
			'formId': 'personal_reference',
			'formMode': 0
	};

	return (
		<Formik
		initialValues={formFields}
		validationSchema={Yup.object({
			company: Yup.string()
					 .max(100)
					 .required(),
			contactPerson: Yup.string()
					 		  .max(200)
					 		  .required(),
			areaCode: Yup.number()
					  	  .min(1)
					  	  .max(9999),
			telephone: Yup.number()
					  	  .min(1)
					  	  .max(9999999999),
		 	email: Yup.string()
		 			  .required()
		})}
		onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    	}}>
		{({ values, isSubmitting }) => (
			<Form id="personal_reference_section_form">
				<legend className="mb-4">Referencia personal</legend>
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
			                    <label>Nombre y apellido del contacto</label>
			                    <Field id="contact_person" name="contactPerson" className="form-control"></Field>
			                    <ErrorMessage name="contactPerson" component="div" className="text-danger"></ErrorMessage>
			                </div>
			            </Col>
			            <Col md={6}>
			                <div className="form-group">
			                    <label>Empresa</label>
			                    <Field id="company" name="company" className="form-control"></Field>
			                    <ErrorMessage name="company" component="div" className="text-danger"></ErrorMessage>
			                </div>
			            </Col>
			        </Row>

			        <Row>
			            <Col md={6}>
			                <div className="form-group">
			                    <label>Correo electrónico</label>
			                    <Field id="email" name="email" className="form-control"></Field>
			                    <ErrorMessage name="email" component="div" className="text-danger"></ErrorMessage>
			                </div>
			            </Col>
			            <Col md={6}>
			                <div className="form-group">
			                    <label>Teléfono fijo/móvil</label>
			                    <Row>
			                        <InputGroup className="col-md-5">
			                            <InputGroup.Prepend>
			                                <InputGroup.Text><b>+</b></InputGroup.Text>
			                            </InputGroup.Prepend>
			                            <Field id="areaCode" name="areaCode" className="form-control" placeholder="Cod. área"></Field>
			                    		<ErrorMessage name="areaCode" component="div" className="text-danger"></ErrorMessage>
			                        </InputGroup>
			                        <Col md={7}>
				                        <Field id="telephone" name="telephone" className="form-control" data_val_number="Sólo se admiten números."></Field>
				                    	<ErrorMessage name="telephone" component="div" className="text-danger"></ErrorMessage>
			                        </Col>
			                    </Row>
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