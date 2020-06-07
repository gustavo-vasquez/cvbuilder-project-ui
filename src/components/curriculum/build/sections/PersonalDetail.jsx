import React from 'react';
import { Row, Col, Button, InputGroup } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class PersonalDetail extends React.Component {
	componentDidMount() {
		document.querySelector(".tabs-group").firstElementChild.classList.add('active');
	}

	componentWillUnmount() {
		document.querySelector(".tabs-group").firstElementChild.classList.remove('active');
	}

	render() {
		let formFields = {
			'personalDetailId': 0,
			'name': '',
			'lastName': '',
			'email': '',
			'profession': '',
			'uploadedPhoto': undefined,
			'photo': 0,
			'address': '',
			'city': '',
			'postalCode': '',
			'areaCodeLP': '',
			'linePhone': '',
			'areaCodeMP': '',
			'mobilePhone': '',
			'summary': '',
			'summaryCustomTitle': '',
			'summaryIsVisible': true,
			'webPageUrl': '',
			'linkedInUrl': '',
			'githubUrl': '',
			'facebookUrl': '',
			'twitterUrl': '',
			'id_Curriculum': 0,
			'formId': 'personal_detail',
			'formMode': 0
		};

		return (
			<Formik
			initialValues={formFields}
			validationSchema={Yup.object({
				name: Yup.string()
						 .required()
						 .max(100),
				lastName: Yup.string()
							 .required()
							 .max(100),
				email: Yup.string()
						  .required()
						  .max(100),
				address: Yup.string()
							.max(100),
				city: Yup.string()
						 .max(100),
				postalCode: Yup.number()
							   .min(1)
							   .max(99999),
				areaCodeLP: Yup.number()
							   .min(1)
							   .max(9999),
				linePhone: Yup.number()
							  .min(1)
							  .max(9999999999),
				areaCodeMP: Yup.number()
							   .min(1)
							   .max(9999),
				mobilePhone: Yup.number()
								.min(1)
								.max(9999999999),
				summary: Yup.string()
							.required()
							.max(300),
				summaryCustomTitle: Yup.string()
									   .max(50),
				webPageUrl: Yup.string()
							   .max(300),
				linkedInUrl: Yup.string()
							   .max(300),
				githubUrl: Yup.string()
							   .max(300),
				facebookUrl: Yup.string()
							   .max(300),
				twitterUrl: Yup.string()
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
						{/*<input type="hidden" id="personalDetailId" />
						<input type="hidden" id="type" />*/}
				        <Row>
				            <Col md={7}>
				                <div className="form-group">
				                    <label>Nombre(s)</label>
				                    <Field id="name" name="name" className="form-control"></Field>
				                    <ErrorMessage name="name" component="div" className="text-danger"></ErrorMessage>
				                </div>
				                <div className="form-group">
				                    <label>Apellido(s)</label>
				                    <Field id="lastName" name="lastName" className="form-control"></Field>
				                    <ErrorMessage name="lastName" component="div" className="text-danger"></ErrorMessage>
				                </div>
				                <div className="form-group">
				                    <label>Profesión</label>
				                    <Field id="profession" name="profession" className="form-control"></Field>
				                    <small className="form-text text-muted">¿A qué se dedica?</small>
				                </div>
				            </Col>
				            <Col md={5}>
				                <div className="form-group text-center">
				                	<Field type="file" id="uploadedPhoto" name="uploadedPhoto" className="d-none"></Field>
				                    <ErrorMessage name="uploadedPhoto" component="div" className="text-danger"></ErrorMessage>
				                    {values.photo !== 0 ? <Button type="button" variant="outline-success" className="profile-photo" style={{backgroundImage: values.photo}}></Button>
				                    : <Button type="button" variant="outline-success" className="profile-photo"></Button>}
				                </div>
				                <ErrorMessage name="uploadedPhoto" component="div" className="text-danger"></ErrorMessage>
				            </Col>
				        </Row>

				        <Row>
				            <Col>
				                <div id="summary_wrapper" className="form-group">
				                    <InputGroup id="custom_summary_title" className="col-md-7 mb-2 d-none">
				                    	<Field name="summaryCustomTitle" className="form-control form-control-sm" placeholder = "Nombre personalizado..."></Field>
				                        <InputGroup.Append><Button id="change_summary_title" type="button" variant="success" size="sm" title="Cambiar"><i className="fas fa-check"></i></Button></InputGroup.Append>
				                        <InputGroup.Append><Button id="cancel_summary_title" type="button" variant="danger" size="sm" title="Cancelar"><i className="fas fa-times"></i></Button></InputGroup.Append>
				                    </InputGroup>
				                    <ErrorMessage name="summaryCustomTitle" component="div" className="text-danger"></ErrorMessage>
				                    <div id="summary_title">
				                        <label>{!values.summaryCustomTitle ? 'Resumen profesional' : values.summaryCustomTitle}</label>
				                        <Button id="rename_title" type="button" variant="outline-info" size="sm"><i className="fas fa-pencil-alt"></i> Editar</Button>
				                    </div>
				                    <Field as="textarea" id="summary" name="summary" className="form-control" rows="3" placeholder="Máximo 300 caracteres..."></Field>
				                    <ErrorMessage name="summary" component="div" className="text-danger"></ErrorMessage>
				                    <Col md={5} className="custom-control custom-switch">
				                    	<Field type="checkbox" id="summary_is_visible" name="summaryIsVisible" className="custom-control-input"></Field>
				                        <label className="custom-control-label" htmlFor="summary_is_visible">Visible</label>
				                    </Col>
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
				                    <label>Teléfono fijo</label>
				                    <Row>
				                        <InputGroup className="col-md-5">
				                            <InputGroup.Prepend>
				                                <InputGroup.Text><b>+</b></InputGroup.Text>
				                            </InputGroup.Prepend>
				                            <Field id="area_code_LP" name="areaCodeLP" className="form-control" placeholder="Cod. área"></Field>
				                            <ErrorMessage name="areaCodeLP" component="div" className="text-danger"></ErrorMessage>
				                        </InputGroup>
				                        <Col md={7}>
				                        	<Field id="line_phone" name="linePhone" className="form-control"></Field>
				                        	<ErrorMessage name="linePhone" component="div" className="text-danger"></ErrorMessage>
				                        </Col>
				                    </Row>
				                </div>
				            </Col>
				        </Row>

				        <Row>
				            <Col md={6}>
				                <div className="form-group">
				                    <label>Teléfono celular</label>
				                    <Row>
				                        <InputGroup className="col-md-5">
				                            <InputGroup.Prepend>
				                                <InputGroup.Text><b>+</b></InputGroup.Text>
				                            </InputGroup.Prepend>
				                            <Field id="area_code_MP" name="areaCodeMP" className="form-control" placeholder="Cod. área"></Field>
				                            <ErrorMessage name="areaCodeMP" component="div" className="text-danger"></ErrorMessage>
				                        </InputGroup>
				                        <Col md={7}>
				                        	<Field id="mobile_phone" name="mobilePhone" className="form-control"></Field>
				                        	<ErrorMessage name="mobilePhone" component="div" className="text-danger"></ErrorMessage>
				                        </Col>
				                    </Row>
				                </div>
				            </Col>
				            <Col md={6}>
				                <div className="form-group">
				                    <label>Dirección</label>
				                    <Field id="address" name="address" className="form-control"></Field>
				                    <ErrorMessage name="address" component="div" className="text-danger"></ErrorMessage>
				                </div>
				            </Col>
				        </Row>

				        <Row>
				            <Col md={6}>
				                <div className="form-group">
				                    <label>Ciudad/Localidad</label>
				                    <Field id="city" name="city" className="form-control"></Field>
				                    <ErrorMessage name="city" component="div" className="text-danger"></ErrorMessage>
				                </div>
				            </Col>
				            <Col md={6}>
				                <div className="form-group">
				                    <label>Código postal</label>
				                    <Field id="postal_code" name="postalCode" className="form-control"></Field>
				                    <ErrorMessage name="postalCode" component="div" className="text-danger"></ErrorMessage>
				                </div>
				            </Col>
				        </Row>

				        <Row>
				            <Col>
				                <div className="form-group">
				                    <label>Blogs/Sitios web</label>
				                    <Field id="web_page_url" name="webPageUrl" className="form-control"></Field>
				                    <small className="form-text text-muted">Si hay más de uno, separar con coma.</small>
				                    <ErrorMessage name="webPageUrl" component="div" className="text-danger"></ErrorMessage>
				                </div>
				            </Col>
				        </Row>

				        <Row>
				            <Col md={6}>
				                <div className="form-group">
				                    <label>LinkedIn</label>
				                    <Field id="linkedIn_url" name="linkedInUrl" className="form-control"></Field>
				                    <small className="form-text text-muted">Si hay más de uno, separar con coma.</small>
				                </div>
				            </Col>
				            <Col md={6}>
				                <div className="form-group">
				                    <label>Github</label>
				                    <Field id="github_url" name="githubUrl" className="form-control"></Field>
				                    <small className="form-text text-muted">Si hay más de uno, separar con coma.</small>
				                    <ErrorMessage name="githubUrl" component="div" className="text-danger"></ErrorMessage>
				                </div>
				            </Col>
				        </Row>

				        <Row>
				            <Col md={6}>
				                <div className="form-group">
				                    <label>Facebook</label>
				                    <Field id="facebook_url" name="facebookUrl" className="form-control"></Field>
				                    <small className="form-text text-muted">Si hay más de uno, separar con coma.</small>
				                    <ErrorMessage name="facebookUrl" component="div" className="text-danger"></ErrorMessage>
				                </div>
				            </Col>
				            <Col md={6}>
				                <div className="form-group">
				                    <label>Twitter</label>
				                    <Field id="twitter_url" name="twitterUrl" className="form-control"></Field>
				                    <small className="form-text text-muted">Si hay más de uno, separar con coma.</small>
				                    <ErrorMessage name="twitterUrl" component="div" className="text-danger"></ErrorMessage>
				                </div>
				            </Col>
				        </Row>
				    </fieldset>
				    <hr />
				    <Row>
				        <Col className="text-center">
				            <Button type="submit" variant="success" disabled={isSubmitting} block>Guardar cambios</Button>
				        </Col>
				    </Row>
				</Form>
			)}
			</Formik>
		);
	}
}

export { PersonalDetail };