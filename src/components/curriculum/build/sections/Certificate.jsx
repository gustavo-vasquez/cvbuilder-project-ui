import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// componentes
import validationMessages from '../../../helpers/validationMessages';
import { addOrUpdateBlock, loadSectionFormData, dateDropdownLists } from './sectionTasks';
import { FormikFormModel } from './FormikFormModel';

class Certificate extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			initialFormValues: {
				'certificateId': 0,
				'name': '',
				'institute': '',
				'onlineMode': false,
				'inProgress': false,
				'year': '',
				'description': '',
				'isVisible': true,
				'id_curriculum': this.props.curriculumId
			}
		}

		this.formValidationSchema = Yup.object({
			name: Yup.string()
					  .max(100, validationMessages.MAX_LENGTH_100)
					  .required(validationMessages.REQUIRED),
			institute: Yup.string()
						  .max(100, validationMessages.MAX_LENGTH_100)
						  .required(validationMessages.REQUIRED),
			year: Yup.number()
					 .when('inProgress', {
					 	is: value => !value,
					 	then: Yup.number()
					 	.oneOf(dateDropdownLists.endPeriod.years.slice(1).map(year => year.value), "Año no válido.")
					 	.required(validationMessages.REQUIRED)
					 }),
			description: Yup.string()
							.max(300, validationMessages.MAX_LENGTH_300)
		});
	}

	async componentDidMount() {
		await loadSectionFormData(this.props.editMode, this.props.sectionMetadata.index, this.props.summaryId, this);
	}

	formikSubmit = (values, { setSubmitting }) => {
		values.year = parseInt(values.year);
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
		return (
			<FormikFormModel
				initialFormValues={this.state.initialFormValues}
				formValidationSchema={this.formValidationSchema}
				formikSubmit={this.formikSubmit}
				formTitle="Certificado"
				formId={this.props.sectionMetadata.formId}
				sectionIndex={this.props.sectionMetadata.index}
				editMode={this.props.editMode}
				removeBlock={this.props.removeBlock}
				closeForm={this.props.closeForm}
				useValues={true}>{ (values) =>
				<React.Fragment>
				<Row>
		            <Col md="6">
		                <div className="form-group">
		                    <label>Nombre del certificado</label>
		                    <Field id="name" name="name" className="form-control"></Field>
		                    <ErrorMessage name="name" component="div" className="text-danger"></ErrorMessage>
		                </div>
		            </Col>
		            <Col md="6">
		                <div className="form-group">
		                    <label>Instituto/establecimiento</label>
		                    <Field id="institute" name="institute" className="form-control"></Field>
		                    <ErrorMessage name="institute" component="div" className="text-danger"></ErrorMessage>
		                </div>
		            </Col>
		        </Row>

		        <Row>
		            <Col md="6">
		                <div className="form-group">
			                <div className="custom-control custom-checkbox">
			                	<Field type="checkbox" id="online_mode" name="onlineMode" className="custom-control-input"></Field>
		                        <label className="custom-control-label" htmlFor="online_mode">Por internet</label>
		                    </div>
		                </div>
		            </Col>
		            <Col md="6">
		                <div className="form-group">
			                <Row>
		                        <Col md="7" className="pb-2 pb-md-0">
		                            <div className="custom-control custom-checkbox">
			                            <Field type="checkbox" id="in_progress" name="inProgress" className="custom-control-input"></Field>
			                        	<label className="custom-control-label" htmlFor="in_progress">En la actualidad</label>
		                            </div>
		                        </Col>
		                        { !values.inProgress &&
		                        <Col md="5">
		                        	<Field as="select" id="year" name="year" className="custom-select">
		                        		{dateDropdownLists.endPeriod.years.map(year =>
		                        			<option key={year.value} value={year.value}>{year.text}</option>
		                        		)}
		                        	</Field>
		                            <ErrorMessage name="year" component="div" className="text-danger"></ErrorMessage>
		                        </Col> }
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
		        </React.Fragment> }
	        </FormikFormModel>
		);
	}
}

export { Certificate };