import React from 'react';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import validationMessages from '../../../helpers/validationMessages';
import { handleResponse, authorizationHeader, alertNotifications, dateDropdownLists } from '../../../helpers';
import { FullSpinner } from '../../../Spinners';

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
				'id_curriculum': this.props.curriculumId,
				'formId': this.props.formId,
				'formMode': this.props.editMode
			}
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
						   .oneOf(dateDropdownLists.startPeriod.months.map(month => month.value), "Mes no válido.")
						   .required(validationMessages.REQUIRED),
			startYear: Yup.number()
						  .oneOf(dateDropdownLists.startPeriod.years.map(year => year.value), "Año no válido.")
						  .required(validationMessages.REQUIRED),
			endMonth: Yup.string()
						 .oneOf(dateDropdownLists.endPeriod.months.map(month => month.value), "Mes no válido.")
						 .required(validationMessages.REQUIRED),
			endYear: Yup.number()
						.oneOf(dateDropdownLists.endPeriod.years.map(year => year.value), "Año no válido.")
						.required(validationMessages.REQUIRED),
			description: Yup.string()
						.max(300, validationMessages.MAX_LENGTH_300)
		});
	}

	async componentDidMount() {
        const requestOptions = {
            method: "GET",
            headers: authorizationHeader()
        }

        await fetch(`https://localhost:5001/api/curriculum/study/${this.props.sectionIndex + 1}/${this.props.summaryId}`, requestOptions)
        	  .then(handleResponse)
        	  .then(success => this.setState({ initialFormValues: success }))
        	  .catch(errorMessage => alertNotifications.error(errorMessage || errorMessage.message));
	}

	formikSubmit = (values, { setSubmitting }) => {
	    setTimeout(async () => {
			values.startYear = parseInt(values.startYear);
			values.endYear = parseInt(values.endYear);
			values.formMode = this.props.editMode;

	    	const requestOptions = {
	    		method: this.props.editMode ? "PUT" : "POST",
	    		headers: { ...authorizationHeader(), "Content-Type": "application/json" },
	    		body: JSON.stringify(values)
	    	}

	    	await fetch("https://localhost:5001/api/curriculum/study", requestOptions)
			.then(handleResponse)
			.then(async success => {
				const requestOptions = {
					method: "GET",
					headers: authorizationHeader()
				}

				await fetch(`https://localhost:5001/api/curriculum/section/${this.props.sectionIndex + 1}/${success.id}`, requestOptions)
				.then(handleResponse)
				.then(success => {
					alertNotifications.success(!this.props.editMode ? `El bloque ${success.title} se ha creado.` : `El bloque ${success.title} se ha modificado.`);
					this.props.refreshBlocks(this.props.sectionIndex, this.props.formId, this.props.editMode, success);
				})
				.catch(errorMessage => alertNotifications.error(errorMessage));
			})
	    	.catch(errorMessage => alertNotifications.error(errorMessage));

	        //alert(JSON.stringify(values, null, 2));
	        setSubmitting(false);
	    }, 400);
	}

	render() {console.log(this.props.editMode);
		return (
			<Formik initialValues={this.state.initialFormValues} validationSchema={this.formValidationSchema} onSubmit={this.formikSubmit} enableReinitialize>
			{({ values, isSubmitting }) => (
				<Form id={this.props.formId}>
					<div className="text-center py-2"><i className="fas fa-chevron-down"></i></div>
					<legend className="text-center">Estudio académico</legend>
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
				                <button type="button" onClick={this.props.closeForm} className="close-block" title="Cerrar">
				                    <i className="fas fa-times h4 mb-0"></i>
				                </button>
				            </Col>
				        </Row>
	
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
				            <Col md={6}>
				                <div className="form-group">
				                    <label>Instituto</label>
				                    <Field id="institute" name="institute" className="form-control"></Field>
				                    <ErrorMessage name="institute" component="div" className="text-danger"></ErrorMessage>
				                </div>
				            </Col>
				            <Col md={6}>
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
				                        </Col>
				                        <Col md="4">
				                        	<Field as="select" id="startYear" name="startYear" className="custom-select">
				                        	{dateDropdownLists.startPeriod.years.map(year =>
												<option key={year.value} value={year.value}>{year.text}</option>
				                        	)}
				                        	</Field>
				                        </Col>
				                    </Row>
		                        	<ErrorMessage name="startMonth" component="div" className="text-danger"></ErrorMessage>
		                        	<ErrorMessage name="startYear" component="div" className="text-danger"></ErrorMessage>
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
				                        </Col>
				                        <Col md="4">
				                        	<Field as="select" id="endYear" name="endYear" className="custom-select">
				                        	{dateDropdownLists.endPeriod.years.map(year =>
				                        		<option key={year.value} value={year.value}>{year.text}</option>
				                        	)}
				                        	</Field>
				                        </Col>
				                    </Row>
				                    <ErrorMessage name="endMonth" component="div" className="text-danger"></ErrorMessage>
		                        	<ErrorMessage name="endYear" component="div" className="text-danger"></ErrorMessage>
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
				    </fieldset>
	
				    <Row>
				        <Col>
				            <ButtonGroup className="btn-block">
				                <Button type="submit" variant="success" size="sm" disabled={isSubmitting}><i className="fas fa-check"></i> Hecho</Button>&nbsp;
				                <Button onClick={() => this.props.editMode ? this.props.removeBlock(this.props.sectionIndex, 1) : this.props.closeForm() } type="button" variant="danger" size="sm" className="remove-form-block"><i className="far fa-trash-alt"></i> Eliminar</Button>
				            </ButtonGroup>
				        </Col>
				    </Row>
					<FullSpinner loading={isSubmitting}></FullSpinner>
				</Form>
			)}
			</Formik>
		);
	}
}

export { Study };