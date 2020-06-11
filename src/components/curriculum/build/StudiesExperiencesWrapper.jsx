import React from 'react';
import ReactDOM from 'react-dom';
import { SummaryBlock } from './SummaryBlock';
import { Study, Certificate, WorkExperience } from './sections';

class StudiesExperiencesWrapper extends React.Component {
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
		let dummyModel = {
            sectionVisibility: {
                studiesIsVisible: true,
                certificatesIsVisible: true,
                workExperiencesIsVisible: true
            }
        }

		return (
			<div id={this.props.id}>
                <div className="card border-success overflow-hidden mb-3">
                    <section id="studies" className="card-body">
                        <h4>Estudios</h4>
                        <div className="row mb-4">
                            <div className="col">
                                <div className="custom-control custom-switch">
                                    <input type="checkbox" id="studies_is_visible" name="studiesIsVisible" className="custom-control-input toggle-section-visibility" defaultChecked={dummyModel.sectionVisibility.studiesIsVisible} />
                                    <label className="custom-control-label" htmlFor="studies_is_visible">Visible</label>
                                </div>
                            </div>
                        </div>

                        <div className={dummyModel.sectionVisibility.studiesIsVisible ? "summary-block-wrapper" : "summary-block-wrapper section-not-visible"}>
                            <div className="row">
                                <div className="col">
                                    <div className="contracted-block-group">
                                        <SummaryBlock getForm={this.getForm} formId={this.state.forms[0]}></SummaryBlock>
                                        <SummaryBlock getForm={this.getForm} formId={this.state.forms[0]}></SummaryBlock>
                                        <SummaryBlock getForm={this.getForm} formId={this.state.forms[0]}></SummaryBlock>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-center form-action">
                                    <button type="button" className="btn btn-outline-secondary add-block" onClick={(event) => this.getForm(event, this.state.forms[0])}><i className="fas fa-plus"></i> Agregar un bloque</button>
                                    {/*this.state.activeForm === this.state.forms[0] && <Study closeForm={this.closeForm} dummy={this.state.dummy}></Study>*/}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="card border-success overflow-hidden mb-3">
                    <section id="certificates" className="card-body">
                        <h4>Certificados/cursos</h4>
                        <div className="row mb-4">
                            <div className="col">
                                <div className="custom-control custom-switch">
                                    <input type="checkbox" id="certificates_is_visible" name="certificatesIsVisible" className="custom-control-input toggle-section-visibility" checked={dummyModel.sectionVisibility.certificatesIsVisible} />
                                    <label className="custom-control-label" htmlFor="certificates_is_visible">Visible</label>
                                </div>
                            </div>
                        </div>

                        <div className={dummyModel.sectionVisibility.certificatesIsVisible ? "summary-block-wrapper" : "summary-block-wrapper section-not-visible"}>
                            <div className="row">
                                <div className="col">
                                    <div className="contracted-block-group">
                                        <SummaryBlock getForm={this.getForm} formId={this.state.forms[1]}></SummaryBlock>
                                        <SummaryBlock getForm={this.getForm} formId={this.state.forms[1]}></SummaryBlock>
                                        <SummaryBlock getForm={this.getForm} formId={this.state.forms[1]}></SummaryBlock>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-center">
                                    <button type="button" className="btn btn-outline-secondary add-block" onClick={(event) => this.getForm(event, this.state.forms[1])}><i className="fas fa-plus"></i> Agregar un bloque</button>
                                    {/*this.state.activeForm === this.state.forms[1] && <Certificate></Certificate>*/}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="card border-success overflow-hidden mb-3">
                    <section id="work_experiences" className="card-body">
                        <h4>Experiencia laboral</h4>
                        <div className="row mb-4">
                            <div className="col">
                                <div className="custom-control custom-switch">
                                    <input type="checkbox" id="work_experiences_is_visible" name="workExperiencesIsVisible" className="custom-control-input toggle-section-visibility" checked={dummyModel.sectionVisibility.workExperiencesIsVisible} />
                                    <label className="custom-control-label" htmlFor="work_experiences_is_visible">Visible</label>
                                </div>
                            </div>
                        </div>

                        <div className={dummyModel.sectionVisibility.workExperiencesIsVisible ? "summary-block-wrapper" : "summary-block-wrapper section-not-visible"}>
                            <div className="row">
                                <div className="col">
                                    <div className="contracted-block-group">
                                        <SummaryBlock getForm={this.getForm} formId={this.state.forms[2]}></SummaryBlock>
                                        <SummaryBlock getForm={this.getForm} formId={this.state.forms[2]}></SummaryBlock>
                                        <SummaryBlock getForm={this.getForm} formId={this.state.forms[2]}></SummaryBlock>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-center">
                                    <button type="button" className="btn btn-outline-secondary add-block" onClick={(event) => this.getForm(event, this.state.forms[2])}><i className="fas fa-plus"></i> Agregar un bloque</button>
                                    {/*this.state.activeForm === this.state.forms[2] && <WorkExperience></WorkExperience>*/}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
		);
	}
}

export default StudiesExperiencesWrapper;