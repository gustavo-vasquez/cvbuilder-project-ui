import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';

class SummaryBlock extends React.Component {
	openContextMenu = (event, summaryId) => {
		event.preventDefault();
		event.persist();
		/*const element = this.findAncestor(event.target, "contracted-block");

		if(element)
			element.style.borderStyle = "dashed";*/
		
		let blockContextMenu = document.getElementById("block_context_menu");
		blockContextMenu.style.left = 0;
		blockContextMenu.style.top = 0;
		let bounds = blockContextMenu.getBoundingClientRect();
		blockContextMenu.style.left = (event.clientX - bounds.left) + "px";
		blockContextMenu.style.top = (event.clientY - bounds.top) + "px";
		this.props.showBlockContextMenu(event, this.props.formId);
	}

	render() {
		return (
			<Card bg="light" border={this.props.blockData.isVisible && "secondary"} className="contracted-block mb-3" onContextMenu={(event) => this.openContextMenu(event, this.props.blockData.summaryId)}>
			    <Card.Body className="pt-2 pb-2">
			        <Row>
			            <Col>
			                <h5>{this.props.blockData.title} {this.props.blockData.timePeriod}</h5>
			            </Col>
			            <Col md="auto" className="text-right form-action">
			                <Button onClick={(event) => this.props.getForm(event, 1, this.props.formId, "looool")} type="button" variant="outline-success" size="sm" className="edit-block" title={`Editar id ${this.props.blockData.summaryId}`}><i className="fas fa-pencil-alt"></i></Button>
			                <Button type="button" variant="outline-danger" size="sm" className="remove-block ml-2" title={`Eliminar id ${this.props.blockData.summaryId}`}><i className="far fa-trash-alt"></i></Button>
			            </Col>
			        </Row>
			    </Card.Body>
			</Card>
		);
	}
}

export { SummaryBlock };