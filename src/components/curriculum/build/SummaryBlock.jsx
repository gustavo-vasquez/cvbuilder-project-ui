import React from 'react';
//import { Link } from 'react-router-dom';
import { Row, Col, Button, Card } from 'react-bootstrap';

class SummaryBlock extends React.Component {
	render() {
		let dummyModel = {
			summaryId: 1,
			title: "Soy un título",
			stateInTime: "(2014-2015)",
			isVisible: true
		}
	
		return (
			<Card bg="light" border="secondary" className={this.props.blockData.isVisible ? "contracted-block mb-3" : "contracted-block mb-3 border-0"}>
			    <Card.Body className="pt-2 pb-2">
			        <Row>
			            <Col>
			                <h5>{this.props.blockData.title} {this.props.blockData.stateInTime}</h5>
			            </Col>
			            <Col md="auto" className="text-right form-action">
			                <Button onClick={(event) => this.props.getForm(event, this.props.formId, "looool", 1)} type="button" variant="outline-success" size="sm" className="edit-block" title={`Editar id ${this.props.blockData.summaryId}`}><i className="fas fa-pencil-alt"></i></Button>
			                <Button type="button" variant="outline-danger" size="sm" className="remove-block ml-2" title={`Eliminar id ${this.props.blockData.summaryId}`}><i className="far fa-trash-alt"></i></Button>
			            </Col>
			        </Row>
			    </Card.Body>
			</Card>
		);
	}
}

export { SummaryBlock };