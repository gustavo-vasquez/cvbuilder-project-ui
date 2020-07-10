import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Button, Card } from 'react-bootstrap';

import { SummaryBlock } from './SummaryBlock';
import { Study, Certificate, WorkExperience } from './sections';
import sectionMetadata from '../../helpers/sectionMetadata';
import { authorizationHeader, handleResponse, alertNotifications } from '../../helpers';

class SummaryBlocksWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            forms: ['study_section_form','certificate_section_form','work_experience_section_form'],
            activeForm: '',
            editMode: 0,
            dummy: '',
            showContextMenu: false,
            activeFormId: '',
            eventElement: '',
            sectionsInTab: this.props.sectionsInTab
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", (event) => event.keyCode === 27 && this.closeForm(), false);
        document.addEventListener('click', this.hideBlockContextMenu, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", (event) => event.keyCode === 27 && this.closeForm(), false);
        document.removeEventListener('click', this.hideBlockContextMenu, false);
    }

    getForm = (event, mode, formId, dummy) => {
        this.closeForm();
        const wrapper = document.createElement("div");
        wrapper.id = Date.now();
        let ancestor;

        switch(mode) {
            case 0:
                ancestor = this.findAncestorByClass(event.target, "summary-block-wrapper");
                break;
            case 1:
                ancestor = this.findAncestorByClass(event.target, "card-body");
                break;
            default:
                break;
        }

        if(ancestor)
            ancestor.appendChild(wrapper);

        switch(formId) {
            case sectionMetadata.studies.formId:
                ReactDOM.render(<Study closeForm={this.closeForm} refreshBlocks={this.refreshBlocks} removeBlock={this.removeBlock} sectionIndex={sectionMetadata.studies.index} formId={formId} curriculumId={this.props.curriculumId} editMode={mode} dummy={dummy}></Study>, wrapper);
                break;
            case sectionMetadata.certificates.formId:
                ReactDOM.render(<Certificate closeForm={this.closeForm} formId={formId} curriculumId={this.props.curriculumId}></Certificate>, wrapper);
                break;
            case sectionMetadata.workExperiences.formId:
                ReactDOM.render(<WorkExperience closeForm={this.closeForm} formId={formId} curriculumId={this.props.curriculumId}></WorkExperience>, wrapper);
                break;
            default:
                break;
        }

        /*switch(formId) {
            case this.state.forms[0]:
                ReactDOM.render(<Study closeForm={this.closeForm} refreshBlocks={this.refreshBlocks} sectionId={this.props.id} formId={this.state.forms[0]} curriculumId={this.props.curriculumId} dummy={dummy}></Study>, wrapper);
                break;
            case this.state.forms[1]:
                ReactDOM.render(<Certificate closeForm={this.closeForm} formId={this.state.forms[1]} curriculumId={this.props.curriculumId}></Certificate>, wrapper);
                break;
            case this.state.forms[2]:
                ReactDOM.render(<WorkExperience closeForm={this.closeForm} formId={this.state.forms[2]} curriculumId={this.props.curriculumId}></WorkExperience>, wrapper);
                break;
            default:
                break;
        }*/
    }

    closeForm = () => {
        let lastActiveForm = document.querySelector("form[id$=_section_form]");
        if(lastActiveForm)
            lastActiveForm.remove();
    }

    findAncestorByClass = (element, className) => {
        while ((element = element.parentElement) && !element.classList.contains(className));
        return element;
    }

    showBlockContextMenu = (eventElement, formId) => {
        this.setState({ showContextMenu: true, activeFormId: formId, eventElement: eventElement });
    }

    hideBlockContextMenu = (event) => {
        const blockContextMenu = document.getElementById('block_context_menu');
        if(!blockContextMenu.contains(event.target))
            this.setState({ showContextMenu: false });
    }

    removeBlock = async (sectionIndex, summaryId) => {
        var answer = window.confirm("¿Está seguro que quiere eliminar este bloque?");

        if(answer) {
            const requestOptions = {
                method: "DELETE",
                headers: authorizationHeader()
            }
    
            await fetch(`https://localhost:5001/api/curriculum/section/${sectionIndex + 1}/${summaryId}`, requestOptions)
            .then(handleResponse)
            .then(success => {
                // borrar
                let sectionsInTab = this.state.sectionsInTab;
                
                for(var i = 0; i < sectionsInTab[sectionIndex].blocks.length; i++) {
                    if(sectionsInTab[sectionIndex].blocks[i].summaryId === summaryId) {
                         sectionsInTab[sectionIndex].blocks.splice(i,1);
                        break;
                    }
                }
    
                this.setState({ sectionsInTab: sectionsInTab }, alertNotifications.success(success.message));
            })
            .catch(errorMessage => alertNotifications.error(errorMessage));
        }
    }

    refreshBlocks = (sectionIndex, formId, editMode, newBlockData) => {
        let sectionsInTab = this.state.sectionsInTab;

        if(editMode) {
            // editar
            sectionsInTab[sectionIndex].blocks.foreEach((currentValue, index, array) => {
                if(currentValue.summaryId === newBlockData.summaryId)
                    sectionsInTab[sectionIndex].blocks[index] = newBlockData;
            });
        }
        else
            // agregar
            sectionsInTab[sectionIndex].blocks.push(newBlockData);
        
        this.setState({ sectionsInTab: sectionsInTab }, this.closeForm());
    }

    searchClassInNodes = (element) => {
        for(var i = 0; i < element.childNodes.length; i++) {
            if(element.childNodes[i].classList.contains("contracted-block-group"))
                return element.childNodes[i];
        }
    }

	render() {
		return (
			<div id={this.props.id}>
                {this.state.sectionsInTab && this.state.sectionsInTab.map(sectionInTab =>
                    <Card border="success" className="overflow-hidden mb-3" key={sectionInTab.metadata.id}>
                        <section id={sectionInTab.metadata.id} className="card-body">
                            <h4>{sectionInTab.metadata.title}</h4>
                            <Row className="mb-4">
                                <Col>
                                    <div className="custom-control custom-switch">
                                        <input type="checkbox" id={`${sectionInTab.metadata.id}_is_visible`} name={`${sectionInTab.metadata.id}IsVisible`} className="custom-control-input toggle-section-visibility" onChange={() => alert("hooooooooooola!")} defaultChecked={sectionInTab.isVisible} />
                                        <label className="custom-control-label" htmlFor={`${sectionInTab.id}_is_visible`}>Visible</label>
                                    </div>
                                </Col>
                            </Row>

                            <div className={sectionInTab.isVisible ? "summary-block-wrapper" : "summary-block-wrapper section-not-visible"}>
                                <Row>
                                    <Col>
                                        <div className="contracted-block-group">
                                        {sectionInTab.blocks && sectionInTab.blocks.map(block =>
                                            <SummaryBlock getForm={this.getForm} removeBlock={this.removeBlock} sectionIndex={sectionInTab.metadata.index} formId={sectionInTab.metadata.formId} blockData={block} key={block.summaryId} showBlockContextMenu={this.showBlockContextMenu}></SummaryBlock>
                                        )}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center mb-2">
                                        <Button type="button" variant="outline-secondary" className="add-block" onClick={(event) => this.getForm(event, 0, sectionInTab.metadata.formId)}><i className="fas fa-plus"></i> Agregar un bloque</Button>
                                    </Col>
                                </Row>
                            </div>
                        </section>
                    </Card>
                )}
                <div id="block_context_menu" className={this.state.showContextMenu ? "dropdown-menu visible": "dropdown-menu"}>
                    <button className="dropdown-item" onClick={() => {this.setState({ showContextMenu: false }); this.getForm(this.state.eventElement, 0, this.state.activeFormId)}}>Agregar nuevo bloque</button>
                    <button className="dropdown-item" onClick={() => {this.setState({ showContextMenu: false }); this.getForm(this.state.eventElement, 1, this.state.activeFormId, "looool")}}>Editar bloque</button>
                    <button className="dropdown-item">Eliminar bloque</button>
                </div>
            </div>
		);
	}
}

export default SummaryBlocksWrapper;