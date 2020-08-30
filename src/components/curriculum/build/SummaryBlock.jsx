import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';

class SummaryBlock extends React.Component {
	openContextMenu = (event, sectionIndex, summaryId) => {
		event.preventDefault();
		event.persist();
		
		let blockContextMenu = document.getElementById("block_context_menu");
		blockContextMenu.style.left = 0;
		blockContextMenu.style.top = 0;
		let bounds = blockContextMenu.getBoundingClientRect();
		blockContextMenu.style.left = (event.clientX - bounds.left) + "px";
		blockContextMenu.style.top = (event.clientY - bounds.top) + "px";
		
		this.props.showBlockContextMenu(event, this.props.formId, sectionIndex, summaryId);
	}

	render() {
		return (
			<Card bg="light" border={this.props.blockData.isVisible && "secondary"} className="contracted-block mb-3" onContextMenu={(event) => this.openContextMenu(event, this.props.sectionIndex, this.props.blockData.summaryId)}>
			    <Card.Body className="py-2">
			        <Row className="justify-content-center align-items-center">
			            <Col xs="8" sm>
			                <span>{this.props.blockData.title} {this.props.blockData.timePeriod}</span>
			            </Col>
			            <Col xs="4" sm="auto" className="form-action">
			                <Button onClick={(event) => this.props.getForm(event, 1, this.props.formId, this.props.sectionIndex, this.props.blockData.summaryId)} type="button" variant="outline-success" size="sm" className="edit-block" title={`Editar id ${this.props.blockData.summaryId}`}><i className="fas fa-pencil-alt"></i></Button>
			                <Button onClick={() => this.props.removeBlock(this.props.sectionIndex, this.props.blockData.summaryId)} type="button" variant="outline-danger" size="sm" className="remove-block ml-2" title={`Eliminar id ${this.props.blockData.summaryId}`}><i className="far fa-trash-alt"></i></Button>
			            </Col>
			        </Row>
			    </Card.Body>
			</Card>
		);
	}
}

export { SummaryBlock };