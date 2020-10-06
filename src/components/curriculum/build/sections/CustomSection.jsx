import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// componentes
import validationMessages from '../../../helpers/validationMessages';
import { addOrUpdateBlock, loadSectionFormData } from './sectionTasks';
import { FormikFormModel } from './FormikFormModel';
import { NormalSpinner } from '../../../Spinners';

class CustomSection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			initialFormValues: {
				'customSectionId': 0,
				'sectionName': '',
				'description': '',
				'isVisible': true,
				'id_curriculum': this.props.curriculumId
			},
			showSpinner: true
		}

		this.formValidationSchema = Yup.object({
			sectionName: Yup.string()
					 		.max(100, validationMessages.MAX_LENGTH_100)
					 		.required(validationMessages.REQUIRED),
			description: Yup.string()
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
				formTitle="Sección personalizada"
				formId={this.props.sectionMetadata.formId}
				sectionIndex={this.props.sectionMetadata.index}
				editMode={this.props.editMode}
				removeBlock={this.props.removeBlock}
				closeForm={this.props.closeForm}>
					<Row>
			            <Col>
			                <div className="form-group">
			                    <label>Nombre de la sección</label>
			                    <Field id="section_name" name="sectionName" className="form-control" placeholder="Ej: Emprendimientos"></Field>
			                    <ErrorMessage name="sectionName" component="div" className="text-danger"></ErrorMessage>
			                </div>
			            </Col>
			        </Row>

			        <Row>
			            <Col>
			                <div className="form-group">
			                    <label>Descripción</label>
			                    <Field as="textarea" id="description" name="description" rows="10" className="form-control" placeholder="Sin límite de caracteres..."></Field>
			                    <ErrorMessage name="description" component="div" className="text-danger"></ErrorMessage>
			                </div>
			            </Col>
			        </Row>
				</FormikFormModel>
			);
	}
}

export { CustomSection };