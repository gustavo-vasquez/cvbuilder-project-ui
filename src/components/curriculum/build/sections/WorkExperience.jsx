import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import validationMessages from '../../../helpers/validationMessages';
import { addOrUpdateBlock, loadSectionFormData, dateDropdownLists } from './sectionTasks';
import { FormikFormModel } from './FormikFormModel';

class WorkExperience extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			initialFormValues: {
				workExperienceId: 0,
				job: '',
				city: '',
				company: '',
				startMonth: '',
				startYear: '',
				endMonth: '',
				endYear: '',
				description: '',
				isVisible: true,
				id_curriculum: this.props.curriculumId
			}
		}

		this.formValidationSchema = Yup.object({
			job: Yup.string()
					  .max(100, validationMessages.MAX_LENGTH_100)
					  .required(validationMessages.REQUIRED),
			city: Yup.string()
						  .max(100, validationMessages.MAX_LENGTH_100)
						  .required(validationMessages.REQUIRED),
			company: Yup.string()
					 .max(100, validationMessages.MAX_LENGTH_100)
					 .required(validationMessages.REQUIRED),
			startMonth: Yup.string()
						   .oneOf(dateDropdownLists.startPeriod.months.slice(1).map(month => month.value), "Mes no válido.")
						   .required(validationMessages.REQUIRED),
			startYear: Yup.number()
						  .oneOf(dateDropdownLists.startPeriod.years.slice(1).map(year => year.value), "Año no válido.")
						  .required(validationMessages.REQUIRED),
			endMonth: Yup.string()
						 .oneOf(dateDropdownLists.endPeriod.months.slice(1).map(month => month.value), "Mes no válido.")
						 .required(validationMessages.REQUIRED),
			endYear: Yup.number()
						.oneOf(dateDropdownLists.endPeriod.years.slice(1).map(year => year.value), "Año no válido.")
						.required(validationMessages.REQUIRED),
			description: Yup.string()
						.max(300, validationMessages.MAX_LENGTH_300)
		});
	}

	async componentDidMount() {
    	await loadSectionFormData(this.props.editMode, this.props.sectionMetadata.index, this.props.summaryId, this);
	}

	formikSubmit = (values, { setSubmitting }) => {
		values.startYear = parseInt(values.startYear);
		values.endYear = parseInt(values.endYear);
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
				formTitle="Experiencia laboral"
				formId={this.props.sectionMetadata.formId}
				sectionIndex={this.props.sectionMetadata.index}
				editMode={this.props.editMode}
				removeBlock={this.props.removeBlock}
				closeForm={this.props.closeForm}>
				<Row>
		            <Col>
		                <div className="form-group">
		                    <label>Puesto de trabajo</label>
		                    <Field id="job" name="job" className="form-control"></Field>
		                    <ErrorMessage name="job" component="div" className="text-danger"></ErrorMessage>
		                </div>
		            </Col>
		        </Row>

		        <Row>
		            <Col md="6">
		                <div className="form-group">
		                    <label>Empresa</label>
		                    <Field id="company" name="company" className="form-control"></Field>
		                    <ErrorMessage name="company" component="div" className="text-danger"></ErrorMessage>
		                </div>
		            </Col>
		            <Col md="6">
		                <div className="form-group">
		                    <label>Ciudad</label>
		                    <Field id="city" name="city" className="form-control"></Field>
		                    <ErrorMessage name="city" component="div" className="text-danger"></ErrorMessage>
		                </div>
		            </Col>
		        </Row>

		        <Row>
		            <Col md="6">
		                <div className="form-group">
		                    <label>Fecha de ingreso</label>
		                    <Row>
		                        <Col md="8">
		                        	<Field as="select" id="startMonth" name="startMonth" className="custom-select">
	                        		{dateDropdownLists.startPeriod.months.map(month => 
		                        		<option key={month.value} value={month.value}>{month.text}</option>
		                        	)}
		                        	</Field>
                        			<ErrorMessage name="startMonth" component="div" className="text-danger"></ErrorMessage>
		                        </Col>
		                        <Col md="4">
		                        	<Field as="select" id="startYear" name="startYear" className="custom-select">
		                        	{dateDropdownLists.startPeriod.years.map(year =>
										<option key={year.value} value={year.value}>{year.text}</option>
		                        	)}
		                        	</Field>
                        			<ErrorMessage name="startYear" component="div" className="text-danger"></ErrorMessage>
		                        </Col>
		                    </Row>
		                </div>
		            </Col>
		            <Col md="6">
		                <div className="form-group">
		                    <label>Fecha de finalización</label>
		                    <Row>
		                        <Col md="8">
		                        	<Field as="select" id="endMonth" name="endMonth" className="custom-select">
		                        	{dateDropdownLists.endPeriod.months.map(month =>
										<option key={month.value} value={month.value}>{month.text}</option>
		                        	)}
		                        	</Field>
		                    		<ErrorMessage name="endMonth" component="div" className="text-danger"></ErrorMessage>
		                        </Col>
		                        <Col md="4">
		                        	<Field as="select" id="endYear" name="endYear" className="custom-select">
		                        	{dateDropdownLists.endPeriod.years.map(year =>
		                        		<option key={year.value} value={year.value}>{year.text}</option>
		                        	)}
		                        	</Field>
                        			<ErrorMessage name="endYear" component="div" className="text-danger"></ErrorMessage>
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
			</FormikFormModel>
		);
	}
}

export { WorkExperience };