import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import validationMessages from '../../../helpers/validationMessages';
import { addOrUpdateBlock, loadSectionFormData, dateDropdownLists } from './sectionTasks';
import { FormikFormModel } from './FormikFormModel';
import { NormalSpinner } from '../../../Spinners';

class Study extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			initialFormValues: {
				'studyId': 0,
				'title': '',
				'institute': '',
				'city': '',
				'startMonth': '',
				'startYear': '',
				'endMonth': '',
				'endYear': '',
				'description': '',
				'isVisible': true,
				'id_curriculum': this.props.curriculumId
			},
			showSpinner: true
		}

		this.formValidationSchema = Yup.object({
			title: Yup.string()
					  .max(100, validationMessages.MAX_LENGTH_100)
					  .required(validationMessages.REQUIRED),
			institute: Yup.string()
						  .max(100, validationMessages.MAX_LENGTH_100)
						  .required(validationMessages.REQUIRED),
			city: Yup.string()
					 .max(100, validationMessages.MAX_LENGTH_100)
					 .required(validationMessages.REQUIRED),
			startMonth: Yup.string()
						   .oneOf(dateDropdownLists.startPeriod.months.slice(1).map(month => month.value), validationMessages.MONTH_NOT_VALID)
						   .required(validationMessages.REQUIRED),
			startYear: Yup.number()
						  .when(['startMonth','endMonth'], {
						  	is: (startMonth, endMonth) => startMonth !== "not_show" && endMonth !== "present",
						  	then: Yup.number()
						  	.oneOf(dateDropdownLists.startPeriod.years.slice(1).map(year => year.value), validationMessages.YEAR_NOT_VALID)
						  	.lessThan(Yup.ref("endYear"), validationMessages.START_YEAR_LESS_THAN)
						  	.required(validationMessages.REQUIRED)
						  }),
			endMonth: Yup.string()
						 .oneOf(dateDropdownLists.endPeriod.months.slice(1).map(month => month.value), validationMessages.MONTH_NOT_VALID)
						 .required(validationMessages.REQUIRED),
			endYear: Yup.number()
						.when(['endMonth','startMonth'], {
							is: (endMonth, startMonth) => endMonth !== "present" && endMonth !== "not_show" && startMonth !== "not_show",
							then: Yup.number()
							.oneOf(dateDropdownLists.endPeriod.years.slice(1).map(year => year.value), validationMessages.YEAR_NOT_VALID)
							.moreThan(Yup.ref("startYear"), validationMessages.END_YEAR_GREATER_THAN)
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
		if(this.state.showSpinner)
			return <NormalSpinner></NormalSpinner>
		else
			return (
				<FormikFormModel
					initialFormValues={this.state.initialFormValues}
					formValidationSchema={this.formValidationSchema}
					formikSubmit={this.formikSubmit}
					formTitle="Estudio académico"
					formId={this.props.sectionMetadata.formId}
					sectionIndex={this.props.sectionMetadata.index}
					editMode={this.props.editMode}
					removeBlock={this.props.removeBlock}
					closeForm={this.props.closeForm}
					useValues={true}>{ (values) =>
					<React.Fragment>
					<Row>
			            <Col>
			                <div className="form-group">
			                    <label>Título académico</label>
			                    <Field id="title" name="title" className="form-control"></Field>
			                    <ErrorMessage name="title" component="div" className="text-danger"></ErrorMessage>
			                </div>
			            </Col>
			        </Row>

			        <Row>
			            <Col md="6">
			                <div className="form-group">
			                    <label>Instituto</label>
			                    <Field id="institute" name="institute" className="form-control"></Field>
			                    <ErrorMessage name="institute" component="div" className="text-danger"></ErrorMessage>
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
			                        <Col md="8" className="pb-2 pb-md-0">
			                        	<Field as="select" id="startMonth" name="startMonth" className="custom-select">
			                        	{dateDropdownLists.startPeriod.months.map(month => 
			                        		<option key={month.value} value={month.value}>{month.text}</option>
			                        	)}
			                        	</Field>
	                        			<ErrorMessage name="startMonth" component="div" className="text-danger"></ErrorMessage>
			                        </Col>
			                        { values.startMonth !== "not_show" &&
			                        <Col md="4">
			                        	<Field as="select" id="startYear" name="startYear" className="custom-select">
			                        	{dateDropdownLists.startPeriod.years.map(year =>
											<option key={year.value} value={year.value}>{year.text}</option>
			                        	)}
			                        	</Field>
	                        			<ErrorMessage name="startYear" component="div" className="text-danger"></ErrorMessage>
			                        </Col> }
			                    </Row>
			                </div>
			            </Col>
			            <Col md="6">
			                <div className="form-group">
			                    <label>Fecha de finalización</label>
			                    <Row>
			                        <Col md="8" className="pb-2 pb-md-0">
			                        	<Field as="select" id="endMonth" name="endMonth" className="custom-select">
			                        	{dateDropdownLists.endPeriod.months.map(month =>
											<option key={month.value} value={month.value}>{month.text}</option>
			                        	)}
			                        	</Field>
			                    		<ErrorMessage name="endMonth" component="div" className="text-danger"></ErrorMessage>
			                        </Col>
			                        { values.endMonth !== "present" && values.endMonth !== "not_show" &&
			                        <Col md="4">
			                        	<Field as="select" id="endYear" name="endYear" className="custom-select">
			                        	{dateDropdownLists.endPeriod.years.map(year =>
			                        		<option key={year.value} value={year.value}>{year.text}</option>
			                        	)}
			                        	</Field>
	                        			<ErrorMessage name="endYear" component="div" className="text-danger"></ErrorMessage>
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

export { Study };