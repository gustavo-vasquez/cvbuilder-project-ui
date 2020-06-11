import React from 'react';
import { SummaryBlock } from './SummaryBlock';

class OtherInformationWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeLanguageForm: false,
            activeSkillForm: false,
            activeInterestForm: false,
            activePersonalReferenceForm: false
        }
    }

	render() {
		let dummyModel = {
            sectionVisibility: {
                languagesIsVisible: true,
                skillsIsVisible: true,
                interestsIsVisible: true,
                personalReferencesIsVisible: true
            }
        }

		return (
			<div id={this.props.id}>
                <div className="card border-success overflow-hidden mb-3">
                    <section id="languages" className="card-body">
                        <h4>Idiomas</h4>
                        <div className="row mb-4">
                            <div className="col">
                                <div className="custom-control custom-switch">
                                    <input type="checkbox" id="languages_is_visible" name="languagesIsVisible" className="custom-control-input toggle-section-visibility" defaultChecked={dummyModel.sectionVisibility.languagesIsVisible} />
                                    <label className="custom-control-label" htmlFor="languages_is_visible">Visible</label>
                                </div>
                            </div>
                        </div>

                        <div className={dummyModel.sectionVisibility.languagesIsVisible ? "summary-block-wrapper" : "summary-block-wrapper section-not-visible"}>
                            <div className="row">
                                <div className="col">
                                    <div className="contracted-block-group">
                                        <SummaryBlock></SummaryBlock>
                                        <SummaryBlock></SummaryBlock>
                                        <SummaryBlock></SummaryBlock>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-center">
                                    <button type="button" className="btn btn-outline-secondary add-block"><i className="fas fa-plus"></i> Agregar un bloque</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="card border-success overflow-hidden mb-3">
                    <section id="skills" className="card-body">
                        <h4>Habilidades informáticas</h4>
                        <div className="row mb-4">
                            <div className="col">
                                <div className="custom-control custom-switch">
                                    <input type="checkbox" id="skills_is_visible" name="skillsIsVisible" className="custom-control-input toggle-section-visibility" checked={dummyModel.sectionVisibility.skillsIsVisible} />
                                    <label className="custom-control-label" htmlFor="skills_is_visible">Visible</label>
                                </div>
                            </div>
                        </div>

                        <div className={dummyModel.sectionVisibility.skillsIsVisible ? "summary-block-wrapper" : "summary-block-wrapper section-not-visible"}>
                            <div className="row">
                                <div className="col">
                                    <div className="contracted-block-group">
                                        <SummaryBlock></SummaryBlock>
                                        <SummaryBlock></SummaryBlock>
                                        <SummaryBlock></SummaryBlock>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-center">
                                    <button type="button" className="btn btn-outline-secondary add-block"><i className="fas fa-plus"></i> Agregar un bloque</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="card border-success overflow-hidden mb-3">
                    <section id="interests" className="card-body">
                        <h4>Intereses/Hobbies</h4>
                        <div className="row mb-4">
                            <div className="col">
                                <div className="custom-control custom-switch">
                                    <input type="checkbox" id="interests_is_visible" name="interestsIsVisible" className="custom-control-input toggle-section-visibility" checked={dummyModel.sectionVisibility.interestsIsVisible} />
                                    <label className="custom-control-label" htmlFor="interests_is_visible">Visible</label>
                                </div>
                            </div>
                        </div>

                        <div className={dummyModel.sectionVisibility.interestsIsVisible ? "summary-block-wrapper" : "summary-block-wrapper section-not-visible"}>
                            <div className="row">
                                <div className="col">
                                    <div className="contracted-block-group">
                                        <SummaryBlock></SummaryBlock>
                                        <SummaryBlock></SummaryBlock>
                                        <SummaryBlock></SummaryBlock>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-center">
                                    <button type="button" className="btn btn-outline-secondary add-block"><i className="fas fa-plus"></i> Agregar un bloque</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="card border-success overflow-hidden mb-3">
                    <section id="personal_references" className="card-body">
                        <h4>Referencias personales</h4>
                        <div className="row mb-4">
                            <div className="col">
                                <div className="custom-control custom-switch">
                                    <input type="checkbox" id="personal_references_is_visible" name="personalReferencesIsVisible" className="custom-control-input toggle-section-visibility" checked={dummyModel.sectionVisibility.personalReferencesIsVisible} />
                                    <label className="custom-control-label" htmlFor="personal_references_is_visible">Visible</label>
                                </div>
                            </div>
                        </div>

                        <div className={dummyModel.sectionVisibility.personalReferencesIsVisible ? "summary-block-wrapper" : "summary-block-wrapper section-not-visible"}>
                            <div className="row">
                                <div className="col">
                                    <div className="contracted-block-group">
                                        <SummaryBlock></SummaryBlock>
                                        <SummaryBlock></SummaryBlock>
                                        <SummaryBlock></SummaryBlock>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-center">
                                    <button type="button" className="btn btn-outline-secondary add-block"><i className="fas fa-plus"></i> Agregar un bloque</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
		);
	}
}

export default OtherInformationWrapper;