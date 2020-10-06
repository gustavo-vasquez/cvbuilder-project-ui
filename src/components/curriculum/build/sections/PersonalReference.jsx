import React from 'react';
import { Row, Col, InputGroup } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// componentes
import validationMessages from '../../../helpers/validationMessages';
import { addOrUpdateBlock, loadSectionFormData } from './sectionTasks';
import { FormikFormModel } from './FormikFormModel';
import { NormalSpinner } from '../../../Spinners';

class PersonalReference extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			initialFormValues: {
				'personalReferenceId': 0,
				'company': '',
				'contactPerson': '',
				'areaCode': '',
				'telephone': '',
				'email': '',
				'isVisible': true,
				'id_curriculum': this.props.curriculumId
			},
			showSpinner: true
		}

		this.formValidationSchema = Yup.object({
			company: Yup.string()
					 .max(100, validationMessages.MAX_LENGTH_100)
					 .required(validationMessages.REQUIRED),
			contactPerson: Yup.string()
							.max(200, validationMessages.MAX_LENGTH_200)
							.required(validationMessages.REQUIRED),
			areaCode: Yup.number()
						.max(9999, validationMessages.MAX_RANGE_4)
						.typeError(validationMessages.NUMBER_NOT_VALID)
						.positive(validationMessages.NUMBER_NOT_VALID)
						.integer(validationMessages.NUMBER_NOT_VALID),
			telephone: Yup.number()
						.max(99999999, validationMessages.MAX_RANGE_8)
						.typeError(validationMessages.NUMBER_NOT_VALID)
						.positive(validationMessages.NUMBER_NOT_VALID)
						.integer(validationMessages.NUMBER_NOT_VALID),
			email: Yup.string()
		 			  .required(validationMessages.REQUIRED)
		});
	}

	async componentDidMount() {
		await loadSectionFormData(this.props.editMode, this.props.sectionMetadata.index, this.props.summaryId, this);
	}

	formikSubmit = (values, { setSubmitting }) => {
		values.areaCode = values.areaCode !== '' ? parseInt(values.areaCode) : null;
		values.telephone = values.telephone !== '' ? parseInt(values.telephone) : null;
		values.formMode = this.props.editMode;
		
		addOrUpdateBlock(
	    	values,
	    	{ setSubmitting },
	    	this.props.sectionMetadata,
	    	this.props.editMode,
	    	this.props.refreshBlocks
	    );
	}

	render() {
		if(this.state.showSpinner)
			return <NormalSpinner></NormalSpinner>
		else
			return (
				<FormikFormModel
					initialFormValues={this.state.initialFormValues}
					formValidationSchema={this.formValidationSchema}
					formikSubmit={this.formikSubmit}
					formTitle="Referencia personal"
					formId={this.props.sectionMetadata.formId}
					sectionIndex={this.props.sectionMetadata.index}
					editMode={this.props.editMode}
					removeBlock={this.props.removeBlock}
					closeForm={this.props.closeForm}>
					<Row>
			            <Col md="6">
			                <div className="form-group">
			                    <label>Nombre y apellido del contacto</label>
			                    <Field id="contact_person" name="contactPerson" className="form-control"></Field>
			                    <ErrorMessage name="contactPerson" component="div" className="text-danger"></ErrorMessage>
			                </div>
			            </Col>
			            <Col md="6">
			                <div className="form-group">
			                    <label>Empresa</label>
			                    <Field id="company" name="company" className="form-control"></Field>
			                    <ErrorMessage name="company" component="div" className="text-danger"></ErrorMessage>
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
			                    <label>Teléfono fijo/móvil</label>
			                    <Row>
			                        <InputGroup className="col-md-5 pb-2 pb-md-0">
			                            <InputGroup.Prepend>
			                                <InputGroup.Text><b>+</b></InputGroup.Text>
			                            </InputGroup.Prepend>
			                            <Field id="areaCode" name="areaCode" className="form-control" placeholder="Cod. área"></Field>
			                    		<ErrorMessage name="areaCode" component="div" className="text-danger"></ErrorMessage>
			                        </InputGroup>
			                        <Col md="7">
				                        <Field id="telephone" name="telephone" className="form-control"></Field>
				                    	<ErrorMessage name="telephone" component="div" className="text-danger"></ErrorMessage>
			                        </Col>
			                    </Row>
			                </div>
			            </Col>
			        </Row>
				</FormikFormModel>
			);
	}
}

export { PersonalReference };