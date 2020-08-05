import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Button, Card } from 'react-bootstrap';

import { SummaryBlock } from './SummaryBlock';
import { Study, Certificate, WorkExperience, Language, Skill, Interest, PersonalReference, CustomSection } from './sections';
import sectionMetadata from '../../helpers/sectionMetadata';
import { authorizationHeader, handleResponse, alertNotifications, abortSignal } from '../../helpers';

class SummaryBlocksWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeForm: '',
            editMode: 0,
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

    getForm = (event, editMode, formId, sectionIndex, summaryId) => {
        this.closeForm();
        let ancestor;
        const wrapper = document.createElement("div");
        wrapper.id = Date.now();

        switch(editMode) {
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
                ReactDOM.render(<Study closeForm={this.closeForm} refreshBlocks={this.refreshBlocks} removeBlock={this.removeBlock} sectionMetadata={sectionMetadata.studies} curriculumId={this.props.curriculumId} editMode={editMode} summaryId={summaryId}></Study>, wrapper);
                break;
            case sectionMetadata.workExperiences.formId:
                ReactDOM.render(<WorkExperience closeForm={this.closeForm} refreshBlocks={this.refreshBlocks} removeBlock={this.removeBlock} sectionMetadata={sectionMetadata.workExperiences} curriculumId={this.props.curriculumId} editMode={editMode} summaryId={summaryId}></WorkExperience>, wrapper);
                break;
            case sectionMetadata.certificates.formId:
                ReactDOM.render(<Certificate closeForm={this.closeForm} refreshBlocks={this.refreshBlocks} removeBlock={this.removeBlock} sectionMetadata={sectionMetadata.certificates} curriculumId={this.props.curriculumId} editMode={editMode} summaryId={summaryId}></Certificate>, wrapper);
                break;
            case sectionMetadata.languages.formId:
                ReactDOM.render(<Language closeForm={this.closeForm} refreshBlocks={this.refreshBlocks} removeBlock={this.removeBlock} sectionMetadata={sectionMetadata.languages} curriculumId={this.props.curriculumId} editMode={editMode} summaryId={summaryId}></Language>, wrapper);
                break;
            case sectionMetadata.skills.formId:
                ReactDOM.render(<Skill closeForm={this.closeForm} refreshBlocks={this.refreshBlocks} removeBlock={this.removeBlock} sectionMetadata={sectionMetadata.skills} curriculumId={this.props.curriculumId} editMode={editMode} summaryId={summaryId}></Skill>, wrapper);
                break;
            case sectionMetadata.interests.formId:
                ReactDOM.render(<Interest closeForm={this.closeForm} refreshBlocks={this.refreshBlocks} removeBlock={this.removeBlock} sectionMetadata={sectionMetadata.interests} curriculumId={this.props.curriculumId} editMode={editMode} summaryId={summaryId}></Interest>, wrapper);
                break;
            case sectionMetadata.personalReferences.formId:
                ReactDOM.render(<PersonalReference closeForm={this.closeForm} refreshBlocks={this.refreshBlocks} removeBlock={this.removeBlock} sectionMetadata={sectionMetadata.personalReferences} curriculumId={this.props.curriculumId} editMode={editMode} summaryId={summaryId}></PersonalReference>, wrapper);
                break;
            case sectionMetadata.customSections.formId:
                ReactDOM.render(<CustomSection closeForm={this.closeForm} refreshBlocks={this.refreshBlocks} removeBlock={this.removeBlock} sectionMetadata={sectionMetadata.customSections} curriculumId={this.props.curriculumId} editMode={editMode} summaryId={summaryId}></CustomSection>, wrapper);
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
    
            await fetch(`https://localhost:5001/api/curriculum/block/${sectionIndex + 1}/${summaryId}`, requestOptions)
            .then(handleResponse)
            .then(async success => {
                if(success) {
                    if(!success.retry) {
                        // borrar
                        let sectionsInTab = this.state.sectionsInTab;
                        let patchIndex = sectionIndex;

                        switch(sectionsInTab.length) {
                            case 3: break;
                            case 4: patchIndex = sectionIndex - (sectionsInTab.length - 1); break;
                            case 1: patchIndex = 0; break;
                            default: return;
                        }
                        
                        for(var i = 0; i < sectionsInTab[patchIndex].blocks.length; i++) {
                            if(sectionsInTab[patchIndex].blocks[i].summaryId === summaryId) {
                                 sectionsInTab[patchIndex].blocks.splice(i,1);
                                break;
                            }
                        }

                        this.setState({ sectionsInTab: sectionsInTab }, alertNotifications.info(success.message));
                    }
                    else {
                        await abortSignal.updateAbortSignal();
                        this.removeBlock(sectionIndex, summaryId);
                    }
                }
            })
            .catch(errorMessage => alertNotifications.error(errorMessage));
        }
    }

    refreshBlocks = (sectionIndex, formId, editMode, newBlockData) => {
        let sectionsInTab = this.state.sectionsInTab;
        let patchIndex = sectionIndex;

        switch(sectionsInTab.length) {
            case 3: break;
            case 4: patchIndex = sectionIndex - (sectionsInTab.length - 1); break;
            case 1: patchIndex = 0; break;
            default: return;
        }

        if(editMode) {
            // editar
            for(var i = 0; i < sectionsInTab[patchIndex].blocks.length; i++) {
                if(sectionsInTab[patchIndex].blocks[i].summaryId === newBlockData.summaryId) {
                    sectionsInTab[patchIndex].blocks.splice(i, 1, newBlockData);
                    break;
                }
            }
        }
        else
            // agregar
            sectionsInTab[patchIndex].blocks.push(newBlockData);
        
        this.setState({ sectionsInTab: sectionsInTab }, this.closeForm());
    }

    toggleSectionVisibility = async (sectionIndex) => {
        const requestOptions = {
            method: "PUT",
            headers: authorizationHeader()
        }

        await fetch(`https://localhost:5001/api/curriculum/visibility/${sectionIndex + 1}`, requestOptions)
        .then(handleResponse)
        .then(async success => {
            if(success || success === "") {
                if(!success.retry) {
                    let sectionsInTab = this.state.sectionsInTab;
                    let patchIndex = sectionIndex;

                    switch(sectionsInTab.length) {
                        case 3: break;
                        case 4: patchIndex = sectionIndex - (sectionsInTab.length - 1); break;
                        case 1: patchIndex = 0; break;
                        default: return;
                    }

                    sectionsInTab[patchIndex].isVisible = !sectionsInTab[patchIndex].isVisible;
                    sectionsInTab.splice(patchIndex, 1, sectionsInTab[patchIndex]);

                    this.setState({ sectionsInTab: sectionsInTab });
                }
                else {
                    await abortSignal.updateAbortSignal();
                    this.toggleSectionVisibility(sectionIndex);
                }
            }
        })
        .catch(errorMessage => alertNotifications.error(errorMessage));
    }

	render() {
		return (
			<div id={this.props.id}>
                {this.state.sectionsInTab && this.state.sectionsInTab.map((sectionInTab, index) =>
                    <Card border="success" className="overflow-hidden mb-3" key={index}>
                        <section id={sectionInTab.metadata.id} className="card-body">
                            <h4>{sectionInTab.metadata.title}</h4>
                            <Row className="mb-4">
                                <Col>
                                    <div className="custom-control custom-switch">
                                        <input type="checkbox" id={`${sectionInTab.metadata.id}_is_visible`} name={`${sectionInTab.metadata.id}IsVisible`} className="custom-control-input toggle-section-visibility" onChange={() => this.toggleSectionVisibility(sectionInTab.metadata.index)} defaultChecked={sectionInTab.isVisible} />
                                        <label className="custom-control-label" htmlFor={`${sectionInTab.metadata.id}_is_visible`}>Visible</label>
                                    </div>
                                </Col>
                            </Row>

                            <div className={sectionInTab.isVisible ? "summary-block-wrapper" : "summary-block-wrapper section-not-visible"}>
                                <Row>
                                    <Col>
                                        <div className="contracted-block-group">
                                        {sectionInTab.blocks && sectionInTab.blocks.map((block, index) =>
                                            <SummaryBlock getForm={this.getForm} removeBlock={this.removeBlock} sectionIndex={sectionInTab.metadata.index} formId={sectionInTab.metadata.formId} blockData={block} key={index} showBlockContextMenu={this.showBlockContextMenu}></SummaryBlock>
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