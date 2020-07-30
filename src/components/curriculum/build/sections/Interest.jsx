import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// componentes
import validationMessages from '../../../helpers/validationMessages';
import { addOrUpdateBlock, loadSectionFormData } from './sectionTasks';
import { FormikFormModel } from './FormikFormModel';

class Interest extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			initialFormValues: {
				'interestId': 0,
				'name': '',
				'isVisible': true,
				'id_curriculum': this.props.curriculumId
			}
		}

		this.formValidationSchema = Yup.object({
			name: Yup.string()
					 .max(100, validationMessages.MAX_LENGTH_100)
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
		return (
			<FormikFormModel
				initialFormValues={this.state.initialFormValues}
				formValidationSchema={this.formValidationSchema}
				formikSubmit={this.formikSubmit}
				formTitle="Interés"
				formId={this.props.sectionMetadata.formId}
				sectionIndex={this.props.sectionMetadata.index}
				editMode={this.props.editMode}
				removeBlock={this.props.removeBlock}
				closeForm={this.props.closeForm}>
				<Row>
		            <Col>
		                <div className="form-group">
		                    <label>Nombre de la actividad</label>
		                    <Field id="name" name="name" className="form-control" placeholder="Ej: Jugar"></Field>
		                    <ErrorMessage name="name" component="div" className="text-danger"></ErrorMessage>
		                </div>
		            </Col>
		        </Row>
			</FormikFormModel>
		);
	}
}

export { Interest };