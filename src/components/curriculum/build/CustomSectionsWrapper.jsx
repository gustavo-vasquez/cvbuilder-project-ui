import React from 'react';
import { SummaryBlock } from './SummaryBlock';

class CustomSectionsWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeCustomSectionForm: false
        }
    }

	render() {
		let dummyModel = {
            sectionVisibility: {
                customSectionsIsVisible: true
            }
        }

		return (
			<div id={this.props.id}>
                <div className="card border-success overflow-hidden mb-3">
                    <section id="custom_sections" className="card-body">
                        <h4>Secciones personalizadas</h4>
                        <div className="row mb-4">
                            <div className="col">
                                <div className="custom-control custom-switch">
                                    <input type="checkbox" id="custom_sections_is_visible" name="customSectionsIsVisible" className="custom-control-input toggle-section-visibility" defaultChecked={dummyModel.sectionVisibility.customSectionsIsVisible} />
                                    <label className="custom-control-label" htmlFor="custom_sections_is_visible">Visible</label>
                                </div>
                            </div>
                        </div>

                        <div className={dummyModel.sectionVisibility.customSectionsIsVisible ? "summary-block-wrapper" : "summary-block-wrapper section-not-visible"}>
                            <div className="row">
                                <div className="col">
                                    <div className="contracted-block-group">
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

export default CustomSectionsWrapper;