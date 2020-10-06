import React from 'react';
import { Row, Col, Button, InputGroup } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import validationMessages from '../../../helpers/validationMessages';
import { handleResponse, authorizationHeader, alertNotifications, abortSignal } from '../../../helpers';
import { defaultProperties } from '../../globalCurriculumVariables';

class PersonalDetail extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			initialFormValues: {
				'personalDetailId': this.props.formData.personalDetailId || 0,
				'name': this.props.formData.name || '',
				'lastName': this.props.formData.lastName || '',
				'email': this.props.formData.email || '',
				'profession': this.props.formData.profession || '',
				'uploadedPhoto': '',
				'photo': this.props.formData.photo || '',
				'address': this.props.formData.address || '',
				'city': this.props.formData.city || '',
				'postalCode': this.props.formData.postalCode || '',
				'areaCodeLP': this.props.formData.areaCodeLP || '',
				'linePhone': this.props.formData.linePhone || '',
				'areaCodeMP': this.props.formData.areaCodeMP || '',
				'mobilePhone': this.props.formData.mobilePhone || '',
				'summary': this.props.formData.summary || '',
				'summaryCustomTitle': this.props.formData.summaryCustomTitle || '',
				'summaryIsVisible': this.props.formData.summaryIsVisible,
				'webPageUrl': this.props.formData.webPageUrl || '',
				'linkedInUrl': this.props.formData.linkedInUrl || '',
				'githubUrl': this.props.formData.githubUrl || '',
				'facebookUrl': this.props.formData.facebookUrl || '',
				'twitterUrl': this.props.formData.twitterUrl || '',
				'id_Curriculum': this.props.curriculumId
			},
			renameSummaryTitle: false
		}

		this.photoPreview = this.props.formData.photo;

		this.formValidationSchema = Yup.object({
			name: Yup.string()
					 .max(100, validationMessages.MAX_LENGTH_100)
					 .required(validationMessages.REQUIRED),
			lastName: Yup.string()
						 .max(100, validationMessages.MAX_LENGTH_100)
						 .required(validationMessages.REQUIRED),
			email: Yup.string()
					  .max(100, validationMessages.MAX_LENGTH_100)
					  .required(validationMessages.REQUIRED),
			uploadedPhoto: Yup.mixed()
							  .test("fileExtension", validationMessages.POSTED_FILE_EXTENSIONS, (value) => {
							  	if (!value)
							  		return true; // necesario si el archivo es opcional

							  	return ["image/jpeg","image/png"].includes(value.type);
							  })
							  .test("fileSize", validationMessages.MAX_FILE_SIZE, (value) => {
								if (!value)
									return true; // necesario si el archivo es opcional

    							return value.size <= 1048576;
							  }),
			address: Yup.string()
						.max(100, validationMessages.MAX_LENGTH_100),
			city: Yup.string()
					 .max(100, validationMessages.MAX_LENGTH_100)
					 .required(validationMessages.REQUIRED),
			postalCode: Yup.number()
						   .max(99999, validationMessages.MAX_RANGE_5)
						   .typeError(validationMessages.NUMBER_NOT_VALID)
						   .positive(validationMessages.NUMBER_NOT_VALID)
						   .integer(validationMessages.NUMBER_NOT_VALID),
			areaCodeLP: Yup.number()
						   .max(9999, validationMessages.MAX_RANGE_4)
						   .typeError(validationMessages.NUMBER_NOT_VALID)
						   .positive(validationMessages.NUMBER_NOT_VALID)
						   .integer(validationMessages.NUMBER_NOT_VALID),
			linePhone: Yup.number()
						  .max(99999999, validationMessages.MAX_RANGE_8)
						  .typeError(validationMessages.NUMBER_NOT_VALID)
						  .positive(validationMessages.NUMBER_NOT_VALID)
						  .integer(validationMessages.NUMBER_NOT_VALID),
			areaCodeMP: Yup.number()
						   .max(9999, validationMessages.MAX_RANGE_4)
						   .typeError(validationMessages.NUMBER_NOT_VALID)
						   .positive(validationMessages.NUMBER_NOT_VALID)
						   .integer(validationMessages.NUMBER_NOT_VALID),
			mobilePhone: Yup.number()
							.max(99999999, validationMessages.MAX_RANGE_8)
							.typeError(validationMessages.NUMBER_NOT_VALID)
						    .positive(validationMessages.NUMBER_NOT_VALID)
						    .integer(validationMessages.NUMBER_NOT_VALID),
			summary: Yup.string()
						.max(300, validationMessages.MAX_LENGTH_300)
						.required(validationMessages.REQUIRED),
			webPageUrl: Yup.string()
						   .max(300, validationMessages.MAX_LENGTH_300),
			linkedInUrl: Yup.string()
						   .max(300, validationMessages.MAX_LENGTH_300),
			githubUrl: Yup.string()
						   .max(300, validationMessages.MAX_LENGTH_300),
			facebookUrl: Yup.string()
						   .max(300, validationMessages.MAX_LENGTH_300),
			twitterUrl: Yup.string()
						   .max(300, validationMessages.MAX_LENGTH_300)
		});
	}

	componentDidMount() {
		document.querySelector(".tabs-group").firstElementChild.classList.add('active');
		document.querySelector(".profile-photo").addEventListener("click", () => document.getElementById("uploaded_photo").click(), false);
	}

	componentWillUnmount() {
		document.querySelector(".tabs-group").firstElementChild.classList.remove('active');
		document.querySelector(".profile-photo").removeEventListener("click", () => document.getElementById("uploaded_photo").click(), false);
	}

	profilePhotoUploaded = (event, setFieldValue) => {
		setFieldValue("uploadedPhoto", event.currentTarget.files[0]);
		
		if (window.File && window.FileList && window.FileReader) {
	        var inputFile = event.target;

	        if (inputFile.files && inputFile.files[0]) {
	            var reader = new FileReader();

	            reader.onload = (e) => {
	                document.querySelector('.profile-photo').style.backgroundImage = `url(${e.target.result})`;
	                this.photoPreview = e.target.result;
	            }

	            reader.readAsDataURL(inputFile.files[0]);
	    	}
		}
	}

	formikSubmit = (values, { setSubmitting }) => {
		if(values.postalCode !== '') values.postalCode = parseInt(values.postalCode);
		if(values.areaCodeLP !== '') values.areaCodeLP = parseInt(values.areaCodeLP);
		if(values.linePhone !== '') values.linePhone = parseInt(values.linePhone);
		if(values.areaCodeMP !== '') values.areaCodeMP = parseInt(values.areaCodeMP);
		if(values.mobilePhone !== '') values.mobilePhone = parseInt(values.mobilePhone);
		values.formMode = 1;console.log(values.postalCode);

		const formData = new FormData();

		for(var key in values)
			formData.append(key, values[key]);

		setTimeout(async () => {
            const requestOptions = {
	    		method: "PUT",
	    		headers: { ...authorizationHeader() },
	    		signal: abortSignal.controller.signal,
	    		body: formData
	    	}

			await fetch(`https://localhost:5001/api/curriculum/${this.props.metadata.name}`, requestOptions)
			.then(handleResponse)
			.then(async result => {
				if(result) {
					if(!result.retry) {
						if(!values.postalCode) values.postalCode = '';
						if(!values.areaCodeLP) values.areaCodeLP = '';
						if(!values.linePhone) values.linePhone = '';
						if(!values.areaCodeMP) values.areaCodeMP = '';
						if(!values.mobilePhone) values.mobilePhone = '';
						this.props.updatePhotoPreview(this.photoPreview);
						this.props.updatePersonalDetailValues(values);
						alertNotifications.success(result.message);
					}
					else {
						await abortSignal.updateAbortSignal();
						this.formikSubmit(values, { setSubmitting });
					}
				}
			})
			.catch(errorMessage => alertNotifications.error(errorMessage));

			setSubmitting(false);
        }, 400);
	}

	toggleCustomSummaryTitle = customTitle => {
		if(!customTitle)
			this.setState(prevState => ({ renameSummaryTitle: !prevState.renameSummaryTitle }));
		else if(customTitle || customTitle === '')
			this.setState(prevState => ({
				renameSummaryTitle: !prevState.renameSummaryTitle,
				initialFormValues: {
					...prevState.initialFormValues,
					summaryCustomTitle: customTitle
				}
			}));
	}

	setCustomSummaryTitle = (values, { setSubmitting }, setFieldValue) => {
		setFieldValue("summaryCustomTitle", values.customTitle);
		setSubmitting(false);
		this.toggleCustomSummaryTitle(values.customTitle);
	}

	cancelCustomSummaryTitle = subformik => {
		if(subformik)
			subformik.resetForm();

		this.toggleCustomSummaryTitle();
	}

	render() {
		return (
			<Formik initialValues={this.state.initialFormValues} validationSchema={this.formValidationSchema} onSubmit={this.formikSubmit} enableReinitialize>
			{({ values, isSubmitting, setFieldValue }) => (
				<Form id={this.props.metadata.formId} encType="multipart/form-data">
					<legend className="mb-4">{this.props.metadata.title}</legend>
					<fieldset>
				        <Row>
				            <Col md="7">
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
				            <Col md="5">
				                <div className="form-group text-center">
				                	<input id="uploaded_photo" name="uploadedPhoto" type="file" className="d-none" accept="image/*" onChange={(event) => this.profilePhotoUploaded(event, setFieldValue)}/>
				                    {values.photo ? <Button type="button" variant="outline-success" className="profile-photo" style={{backgroundImage: `url(${values.photo})`}}></Button>
				                    : <Button type="button" variant="outline-success" className="profile-photo"></Button>}
				                    <span className="d-inline-block pt-2">Formatos: jpg, jpeg, png</span>
				                    <span className="d-block">Peso máximo: 1mb</span>
				                	<ErrorMessage name="uploadedPhoto" component="div" className="text-danger"></ErrorMessage>
				                </div>
				            </Col>
				        </Row>

				        <Row>
				            <Col>
				                <div id="summary_wrapper" className="form-group">
				                { this.state.renameSummaryTitle ?
				                	<Formik
				                		initialValues={{'customTitle': values.summaryCustomTitle || ''}}
				                		validationSchema={Yup.object({
				                			customTitle: Yup.string()
							   								.max(50, validationMessages.MAX_LENGTH_50)
				                		})}
				                		onSubmit={(values, { setSubmitting }) => this.setCustomSummaryTitle(values, { setSubmitting }, setFieldValue)}>
				                		{(subformik) => (
				                		<React.Fragment>
				                	<InputGroup id="custom_summary_title" className="col col-sm-8 mb-2 border border-info rounded">
						            	<Field name="customTitle" className="form-control border-0" placeholder="Nombre personalizado..." autoFocus></Field>
						                <InputGroup.Append>
						                	<Button id="change_summary_title" onClick={() => subformik.submitForm()} type="submit" variant="outline-success" className="border-0" title="Cambiar">
						                		<i className="fas fa-check"></i>
					                		</Button>
					                	</InputGroup.Append>
						                <InputGroup.Append>
						                	<Button id="cancel_summary_title" onClick={() => this.cancelCustomSummaryTitle(subformik)} type="reset" variant="outline-danger" className="border-0 rounded-right" title="Cancelar">
						                		<i className="fas fa-times"></i>
					                		</Button>
					                	</InputGroup.Append>
						            </InputGroup>
						            <ErrorMessage name="customTitle" component="div" className="text-danger pb-3"></ErrorMessage>
						            </React.Fragment>)}
						            </Formik>
				                    : <div id="summary_title">
				                        <label>{!values.summaryCustomTitle ? defaultProperties.DEFAULT_SUMMARY_TITLE : values.summaryCustomTitle}</label>
				                        <Button id="rename_title" type="button" variant="outline-info" size="sm" onClick={() => this.toggleCustomSummaryTitle()}><i className="fas fa-pencil-alt"></i> Editar</Button>
				                    </div>
				                }
				                    <Field as="textarea" id="summary" name="summary" className="form-control" rows="4" placeholder="Máximo 300 caracteres..."></Field>
				                    <ErrorMessage name="summary" component="div" className="text-danger"></ErrorMessage>
				                    <Col md="7" className="custom-control custom-switch">
				                    	<Field type="checkbox" id="summary_is_visible" name="summaryIsVisible" className="custom-control-input"></Field>
				                        <label className="custom-control-label" htmlFor="summary_is_visible">Visible <span className="d-inline-block"><small>(debe escribir algo igualmente)</small></span></label>
				                    </Col>
				                </div>
				            </Col>
				        </Row>

				        <Row>
				            <Col md="6">
				                <div className="form-group">
				                    <label>Correo electrónico</label>
				                    <Field id="email" name="email" className="form-control"></Field>
				                    <ErrorMessage name="email" component="div" className="text-danger"></ErrorMessage>
				                </div>
				            </Col>
				            <Col md="6">
				                <div className="form-group">
				                    <label>Teléfono fijo</label>
				                    <Row>
				                        <InputGroup className="col-md-5 pb-2 pb-md-0">
				                            <InputGroup.Prepend>
				                                <InputGroup.Text><b>+</b></InputGroup.Text>
				                            </InputGroup.Prepend>
				                            <Field id="area_code_LP" name="areaCodeLP" className="form-control" placeholder="Cod. área"></Field>
				                            <ErrorMessage name="areaCodeLP" component="div" className="text-danger"></ErrorMessage>
				                        </InputGroup>
				                        <Col md="7">
				                        	<Field id="line_phone" name="linePhone" className="form-control"></Field>
				                        	<ErrorMessage name="linePhone" component="div" className="text-danger"></ErrorMessage>
				                        </Col>
				                    </Row>
				                </div>
				            </Col>
				        </Row>

				        <Row>
				            <Col md="6">
				                <div className="form-group">
				                    <label>Teléfono celular</label>
				                    <Row>
				                        <InputGroup className="col-md-5 pb-2 pb-md-0">
				                            <InputGroup.Prepend>
				                                <InputGroup.Text><b>+</b></InputGroup.Text>
				                            </InputGroup.Prepend>
				                            <Field id="area_code_MP" name="areaCodeMP" className="form-control" placeholder="Cod. área"></Field>
				                            <ErrorMessage name="areaCodeMP" component="div" className="text-danger"></ErrorMessage>
				                        </InputGroup>
				                        <Col md="7">
				                        	<Field id="mobile_phone" name="mobilePhone" className="form-control"></Field>
				                        	<ErrorMessage name="mobilePhone" component="div" className="text-danger"></ErrorMessage>
				                        </Col>
				                    </Row>
				                </div>
				            </Col>
				            <Col md="6">
				                <div className="form-group">
				                    <label>Dirección</label>
				                    <Field id="address" name="address" className="form-control"></Field>
				                    <ErrorMessage name="address" component="div" className="text-danger"></ErrorMessage>
				                </div>
				            </Col>
				        </Row>

				        <Row>
				            <Col md="6">
				                <div className="form-group">
				                    <label>Ciudad/Localidad</label>
				                    <Field id="city" name="city" className="form-control"></Field>
				                    <ErrorMessage name="city" component="div" className="text-danger"></ErrorMessage>
				                </div>
				            </Col>
				            <Col md="6">
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
				            <Col md="6">
				                <div className="form-group">
				                    <label>LinkedIn</label>
				                    <Field id="linkedIn_url" name="linkedInUrl" className="form-control" placeholder={defaultProperties.SOCIALPLACEHOLDER}></Field>
				                    <small className="form-text text-muted">Si hay más de uno, separar con coma.</small>
				                    <ErrorMessage name="linkedInUrl" component="div" className="text-danger"></ErrorMessage>
				                </div>
				            </Col>
				            <Col md="6">
				                <div className="form-group">
				                    <label>Github</label>
				                    <Field id="github_url" name="githubUrl" className="form-control" placeholder={defaultProperties.SOCIALPLACEHOLDER}></Field>
				                    <small className="form-text text-muted">Si hay más de uno, separar con coma.</small>
				                    <ErrorMessage name="githubUrl" component="div" className="text-danger"></ErrorMessage>
				                </div>
				            </Col>
				        </Row>

				        <Row>
				            <Col md="6">
				                <div className="form-group">
				                    <label>Facebook</label>
				                    <Field id="facebook_url" name="facebookUrl" className="form-control" placeholder={defaultProperties.SOCIALPLACEHOLDER}></Field>
				                    <small className="form-text text-muted">Si hay más de uno, separar con coma.</small>
				                    <ErrorMessage name="facebookUrl" component="div" className="text-danger"></ErrorMessage>
				                </div>
				            </Col>
				            <Col md="6">
				                <div className="form-group">
				                    <label>Twitter</label>
				                    <Field id="twitter_url" name="twitterUrl" className="form-control" placeholder={defaultProperties.SOCIALPLACEHOLDER}></Field>
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