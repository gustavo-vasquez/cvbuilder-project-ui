import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';

/*const templates = [
			require('../../../assets/img/templates/classic.png'),
			require('../../../assets/img/templates/elegant.png'),
			require('../../../assets/img/templates/modern.png')
		];*/

const templates = [
			"/assets/img/templates/classic.png",
			"/assets/img/templates/elegant.png",
			"/assets/img/templates/modern.png"
		];

class ChangeTemplateDialog extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeTemplate: 0
		}
	}

	slideTo = (direction) => {
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
		                <Image className="cv-preview-img" src={templates[this.state.activeTemplate]} alt="available_templates" fluid/>
		            </Modal.Body>
		            <Modal.Footer>
		                <Button variant="default" id="changeTemplate" type="button" onClick={() => alert("Elegiste: " + templates[this.state.activeTemplate])} block>Elegir</Button>
		            </Modal.Footer>
		        </div>
			</Modal>
		);
	}
}

export default ChangeTemplateDialog;