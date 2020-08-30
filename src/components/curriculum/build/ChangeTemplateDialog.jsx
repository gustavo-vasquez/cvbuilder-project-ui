import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';

import { templates as templatesCollection } from '../globalCurriculumVariables';
import { handleResponse, authorizationHeader, alertNotifications, abortSignal } from '../../helpers';

const templates = [
	templatesCollection.classic.previewPath,
	templatesCollection.elegant.previewPath,
	templatesCollection.modern.previewPath
];

class ChangeTemplateDialog extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTemplate: 0
		}
	}

	componentDidMount() {
		this.setState({ activeTemplate: templates.indexOf(this.props.templatePath) });
	}

	/*componentDidUpdate(prevProps, prevState) {
		if(prevProps.templatePath !== this.props.templatePath)
	 		this.setState({activeTemplate: templates.indexOf(this.props.templatePath)});
 	}*/

	slideTo = direction => {
		let currentTemplate = this.state.activeTemplate;

		switch(direction) {
			case 'next':
				currentTemplate++;
				if(currentTemplate >= templates.length)
					currentTemplate = 0;
				this.setState({ activeTemplate: currentTemplate });
				break;
			case 'back':
				currentTemplate--;
				if(currentTemplate < 0)
					currentTemplate = 2;
				this.setState({ activeTemplate: currentTemplate });
				break;
			default: break;
		}
	}

	changeTemplate = async (templatePathUrl) => {
		const requestOptions = {
			method: "PUT",
			headers: {...authorizationHeader(), "Content-type": "application/json"},
			signal: abortSignal.controller.signal,
        	body: JSON.stringify(templatePathUrl)
		}

		await fetch("https://localhost:5001/api/curriculum/template", requestOptions)
		.then(handleResponse)
		.then(async success => {
			if(success) {
				if(!success.retry) {
					alertNotifications.success(success.message);
					this.props.toggleDisplay(templatePathUrl, success.templateName);
				}
				else {
					await abortSignal.updateAbortSignal();
					this.changeTemplate(templatePathUrl);
				}
			}
		})
		.catch(error => {
			if(error)
				alertNotifications.error(error || error.message);
			this.props.toggleDisplay();
		});
	}

	render() {
		return (
			<Modal className="text-center" id="template_wizard" show={this.props.visible} onHide={this.props.toggleDisplay}>
		        <div className="modal-content">
		            <Modal.Header closeButton>
		                <Modal.Title>Elige la plantilla de tu CV</Modal.Title>
		            </Modal.Header>
		            <Modal.Body>
		                <Button variant="default" className="btn-wizard-arrow" onClick={() => this.slideTo('back')} title="Anterior"><i className="fas fa-angle-left"></i></Button>
		                <Button variant="default" className="btn-wizard-arrow" onClick={() => this.slideTo('next')} title="Siguiente"><i className="fas fa-angle-right"></i></Button>
		                <Image className="cv-preview-img" src={templates[this.state.activeTemplate]} alt="available_template" fluid/>
		            </Modal.Body>
		            <Modal.Footer>
		                <Button variant="default" id="changeTemplate" type="button" onClick={() => this.changeTemplate(templates[this.state.activeTemplate])} block>Elegir</Button>
		            </Modal.Footer>
		        </div>
			</Modal>
		);
	}
}

export default ChangeTemplateDialog;