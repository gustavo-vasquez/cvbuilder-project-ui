import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Button, Card } from 'react-bootstrap';

import { SummaryBlock } from './SummaryBlock';
import { Study, Certificate, WorkExperience } from './sections';

class SummaryBlocksWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            forms: ['study_section_form','certificate_section_form','work_experience_section_form'],
            activeForm: '',
            editMode: 0,
            dummy: ''
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", (event) => event.keyCode === 27 && this.closeForm(), false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", (event) => event.keyCode === 27 && this.closeForm(), false);
    }

    getForm = (event, formId, dummy, mode) => {
        this.closeForm();
        const wrapper = document.createElement("div");
        wrapper.id = Date.now();
        this.findAncestor(event.target, "card-body").appendChild(wrapper);

        switch(formId) {
            case this.state.forms[0]:
                ReactDOM.render(<Study closeForm={this.closeForm} formId={this.state.forms[0]} dummy={dummy}></Study>, wrapper);
                break;
            case this.state.forms[1]:
                ReactDOM.render(<Certificate closeForm={this.closeForm} formId={this.state.forms[1]}></Certificate>, wrapper);
                break;
            case this.state.forms[2]:
                ReactDOM.render(<WorkExperience closeForm={this.closeForm} formId={this.state.forms[2]}></WorkExperience>, wrapper);
                break;
            default:
                break;
        }
    }

    closeForm = () => {
        let lastActiveForm = document.querySelector("form[id$=_section_form]");
        if(lastActiveForm)
            lastActiveForm.remove();
    }

    findAncestor = (element, className) => {
        while ((element = element.parentElement) && !element.classList.contains(className));
        return element;
    }

	render() {
		return (
			<div id={this.props.id}>
                {this.props.sectionsInTab.map(sectionInTab =>
                    <Card border="success" className="overflow-hidden mb-3" key={sectionInTab.id}>
                        <section id={sectionInTab.id} className="card-body">
                            <h4>{sectionInTab.title}</h4>
                            <Row className="mb-4">
                                <Col>
                                    <div className="custom-control custom-switch">
                                        <input type="checkbox" id={`${sectionInTab.id}_is_visible`} name={`${sectionInTab.id}IsVisible`} className="custom-control-input toggle-section-visibility" onChange={() => alert("hooooooooooola!")} defaultChecked={sectionInTab.isVisible} />
                                        <label className="custom-control-label" htmlFor={`${sectionInTab.id}_is_visible`}>Visible</label>
                                    </div>
                                </Col>
                            </Row>

                            <div className={sectionInTab.isVisible ? "summary-block-wrapper" : "summary-block-wrapper section-not-visible"}>
                                <Row>
                                    <Col>
                                        <div className="contracted-block-group">
                                        {sectionInTab.blocks.map(block =>
                                            <SummaryBlock getForm={this.getForm} formId={sectionInTab.formId} blockData={block} key={block.summaryId}></SummaryBlock>
                                        )}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center mb-2">
                                        <Button type="button" variant="outline-secondary" className="add-block" onClick={(event) => this.getForm(event, sectionInTab.formId)}><i className="fas fa-plus"></i> Agregar un bloque</Button>
                                    </Col>
                                </Row>
                            </div>
                        </section>
                    </Card>
                )}
            </div>
		);
	}
}

export default SummaryBlocksWrapper;