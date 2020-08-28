import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

// componentes
import { handleResponse, authorizationHeader, loadCssFile, alertNotifications, abortSignal, printCV, downloadAsPdf } from '../../helpers';
import ChangeTemplateDialog from '../build/ChangeTemplateDialog';
import { ClassicTemplate } from './ClassicTemplate';
import { ElegantTemplate } from './ElegantTemplate';
import { ModernTemplate } from './ModernTemplate';
import { CircleSpinner, NormalSpinner } from '../../Spinners';

class Finished extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showChangeTemplateDialog: false,
			shouldPrint: false,
			generatePdf: false
		}
	}

	componentDidMount() {
		this.getCurriculumReady();
		document.title = "CV finalizado - CVBuilder";
		loadCssFile("finished_cv_styles", "/assets/css/finished-cv.css");
	}

	componentWillUnmount() {
		document.getElementById("finished_cv_styles").remove();
	}

	getCurriculumReady = async () => {
		const requestOptions = {
			method: "GET",
			headers: { ...authorizationHeader() }
		}

		return fetch("https://localhost:5001/api/curriculum/ready", requestOptions)
		.then(handleResponse)
		.then(async result => {
			if(result) {
				if(!result.retry) {
					this.setState({ curriculumReadyData: result });
				}
				else {
					await abortSignal.updateAbortSignal();
					this.getCurriculumReady();
				}
			}
		})
		.catch(errorMessage => alertNotifications.error(errorMessage));
	}

	handleChangeTemplateDialog = (newTemplatePathUrl, templateName) => {
        if(newTemplatePathUrl && templateName) {
            this.setState(prevState => ({
            	showChangeTemplateDialog: !prevState.showChangeTemplateDialog,
            	curriculumReadyData: {
            		...prevState.curriculumReadyData,
            		template: {
            			...prevState.curriculumReadyData.template,
            			name: templateName,
            			path: newTemplatePathUrl
            		}
            	}
            }));
        }
        else
            this.setState(prevState => ({ showChangeTemplateDialog: !prevState.showChangeTemplateDialog }));
    }

    displayCurriculum = (curriculumReadyData) => {
    	switch(curriculumReadyData.template.name) {
			case "Classic":
                return <ClassicTemplate cvready={curriculumReadyData}></ClassicTemplate>
            case "Elegant":
                return <ElegantTemplate cvready={curriculumReadyData}></ElegantTemplate>
            case "Modern":
                return <ModernTemplate cvready={curriculumReadyData}></ModernTemplate>
            default:
                return (
                	<Col className="text-center">
                		<div className="alert alert-danger border-danger">No se ha podido cargar la plantilla, vuelva a seleccionarla.</div>
                	</Col>
                );
    	}
    }

	render() {
		return (
			<section className="finished-cv">
			    <Container>
			        <Row>
			            <Col>
			                <div className="template-actions-wrapper border-success">
			                	{ this.state.curriculumReadyData ?
			                	<React.Fragment>
			                    <h1><i className="fas fa-check-circle"></i></h1>
			                    <h3>¡Tu CV está completado!</h3>
			                    <p className="template-legend">Plantilla: {this.state.curriculumReadyData.template.name}</p>
			                    <Row className="no-gutters">
			                        <Col md="4" className="pb-2">
			                            <Button id="print_cv" variant="default" onClick={() => printCV(this, document.title)}><i className="fas fa-print"></i> Imprimir CV</Button>
			                        </Col>
			                        <Col md="4" className="pb-2">
			                            <Button id="choose_template" variant="default" onClick={() => this.handleChangeTemplateDialog()} data-target="#template_wizard"><i className="fas fa-palette"></i> Cambiar plantilla</Button>
			                        </Col>
			                        <Col md="4">
			                            <Button id="download_cv" variant="default" onClick={() => downloadAsPdf(this)}><i className="fas fa-download"></i> Descargar CV</Button>
			                        </Col>
			                    </Row>
			    				<ChangeTemplateDialog templatePath={this.state.curriculumReadyData.template.path} toggleDisplay={this.handleChangeTemplateDialog} visible={this.state.showChangeTemplateDialog}></ChangeTemplateDialog>
			                    </React.Fragment>
			                    : <NormalSpinner></NormalSpinner>
			                    }
			                </div>
			            </Col>
			        </Row>
			        <Row id="curriculum_finished">
			        { this.state.curriculumReadyData ?
			        	this.displayCurriculum(this.state.curriculumReadyData)
			        	: <div className="col-auto page-loading">
			        		<NormalSpinner></NormalSpinner>
			        	  </div>
			        }
			        </Row>
			    </Container>
			    <CircleSpinner loading={this.state.shouldPrint || this.state.generatePdf} message={this.state.message}></CircleSpinner>
			</section>
		);
	}
}

export default Finished;