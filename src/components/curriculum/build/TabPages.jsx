import React from 'react';
import { Card } from 'react-bootstrap';
import StudiesExperiencesWrapper from './StudiesExperiencesWrapper';
import OtherInformationWrapper from './OtherInformationWrapper';
import CustomSectionsWrapper from './CustomSectionsWrapper';
import { PersonalDetail } from './sections';
import SummaryBlocksWrapper from './SummaryBlocksWrapper';

class TabPages extends React.Component {
	constructor(props) {
		super(props);
		this.renderSection = this.renderSection.bind(this);
	}

    renderSection(tabId) {
    	this.props.navigationButtonsDisplay();
        var sections = [];
        sections.push({blocks: [{summaryId: 1, title: "hola", periodTime: "(2015-2016)", isVisible: true},{summaryId: 2, title: "hola de nuevo", periodTime: "(2016-2020)", isVisible: true}], isVisible: true, id: "studies", title: "Estudios", formId: "study_section_form"});
        sections.push({blocks: [{summaryId: 1, title: "hola", periodTime: "(2015-2016)", isVisible: true},{summaryId: 2, title: "hola de nuevo", periodTime: "(2016-2020)", isVisible: true}], isVisible: true, id: "certificates", title: "Certificados", formId: "certificate_section_form"});
        sections.push({blocks: [{summaryId: 1, title: "hola", periodTime: "(2015-2016)", isVisible: true},{summaryId: 2, title: "hola de nuevo", periodTime: "(2016-2020)", isVisible: true}], isVisible: true, id: "work_experiences", title: "Experiencias laborales", formId: "work_experience_section_form"});
    	
        switch(tabId) {
    		case this.props.tabnames[1].id:
                return <SummaryBlocksWrapper sectionsPage={sections} id={this.props.tabnames[1].id}></SummaryBlocksWrapper>
    			//return <StudiesExperiencesWrapper id={this.props.tabnames[1].id}></StudiesExperiencesWrapper>
    		case this.props.tabnames[2].id:
    			return <OtherInformationWrapper id={this.props.tabnames[2].id}></OtherInformationWrapper>
    		case this.props.tabnames[3].id:
    			return <CustomSectionsWrapper id={this.props.tabnames[3].id}></CustomSectionsWrapper>
    		case this.props.tabnames[0].id:
    		default:
    			return <div id={this.props.tabnames[0].id}>
                			<Card border="success" className="overflow-hidden mb-3">
                    			<Card.Body>
    								<PersonalDetail></PersonalDetail>
    							</Card.Body>
    						</Card>
    					</div>
    	}
    }
	
	render() {
		let tabId = this.props.tabname;

		return (
			this.renderSection(tabId)
		);
	}
}

export default TabPages;