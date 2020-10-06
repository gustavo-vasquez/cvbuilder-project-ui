import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// componentes
import validationMessages from '../../../helpers/validationMessages';
import { addOrUpdateBlock, loadSectionFormData, levelOptions } from './sectionTasks';
import { FormikFormModel } from './FormikFormModel';
import { NormalSpinner } from '../../../Spinners';

class Language extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			initialFormValues: {
				'languageId': 0,
				'name': '',
				'level': '',
				'isVisible': true,
				'id_curriculum': this.props.curriculumId
			},
			showSpinner: true
		}

		this.formValidationSchema = Yup.object({
			name: Yup.string()
					  .max(100, validationMessages.MAX_LENGTH_100)
					  .required(validationMessages.REQUIRED),
			level: Yup.string()
					  .oneOf(levelOptions.slice(1).map(option => option.value), "Nivel obligatorio.")
					  .required(validationMessages.REQUIRED)
		});
	}

	async componentDidMount() {
		await loadSectionFormData(this.props.editMode, this.props.sectionMetadata.index, this.props.summaryId, this);
	}

	formikSubmit = (values, { setSubmitting }) => {
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
					formTitle="Idioma"
					formId={this.props.sectionMetadata.formId}
					sectionIndex={this.props.sectionMetadata.index}
					editMode={this.props.editMode}
					removeBlock={this.props.removeBlock}
					closeForm={this.props.closeForm}>
					<Row>
			            <Col md="6">
			                <div className="form-group">
			                    <label>Idioma</label>
			                    <Field id="name" name="name" className="form-control" placeholder="Ej: Inglés"></Field>
			                    <ErrorMessage name="name" component="div" className="text-danger"></ErrorMessage>
			                </div>
			            </Col>
			            <Col md="6">
			                <div className="form-group">
			                    <label>Nivel</label>
			                    <Field as="select" id="level" name="level" className="custom-select">
			                    	{levelOptions.map(option =>
										<option key={option.value} value={option.value}>{option.text}</option>
			                    	)}
	                        	</Field>
	                            <ErrorMessage name="level" component="div" className="text-danger"></ErrorMessage>
			                </div>
			            </Col>
			        </Row>
				</FormikFormModel>
			);
	}
}

export { Language };