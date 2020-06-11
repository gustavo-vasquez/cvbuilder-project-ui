import React from 'react';
import ReactDOM from 'react-dom';
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
                {this.props.sectionsPage.map(sectionPage =>
                    <div className="card border-success overflow-hidden mb-3" key={sectionPage.id}>
                        <section id={sectionPage.id} className="card-body">
                            <h4>{sectionPage.title}</h4>
                            <div className="row mb-4">
                                <div className="col">
                                    <div className="custom-control custom-switch">
                                        <input type="checkbox" id={`${sectionPage.id}_is_visible`} name={`${sectionPage.id}IsVisible`} className="custom-control-input toggle-section-visibility" defaultChecked={sectionPage.isVisible} />
                                        <label className="custom-control-label" htmlFor={`${sectionPage.id}_is_visible`}>Visible</label>
                                    </div>
                                </div>
                            </div>

                            <div className={sectionPage.isVisible ? "summary-block-wrapper" : "summary-block-wrapper section-not-visible"}>
                                <div className="row">
                                    <div className="col">
                                        <div className="contracted-block-group">
                                        {sectionPage.blocks.map(block =>
                                            <SummaryBlock getForm={this.getForm} formId={sectionPage.formId} blockData={block} key={block.summaryId}></SummaryBlock>
                                        )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col text-center form-action">
                                        <button type="button" className="btn btn-outline-secondary add-block" onClick={(event) => this.getForm(event, sectionPage.formId)}><i className="fas fa-plus"></i> Agregar un bloque</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </div>
		);
	}
}

export default SummaryBlocksWrapper;