import React from 'react';
import { Card } from 'react-bootstrap';
//import StudiesExperiencesWrapper from './StudiesExperiencesWrapper';
//import OtherInformationWrapper from './OtherInformationWrapper';
//import CustomSectionsWrapper from './CustomSectionsWrapper';
import { PersonalDetail } from './sections';
import SummaryBlocksWrapper from './SummaryBlocksWrapper';
import { NormalSpinner } from '../../Spinners';

class TabPages extends React.Component {
	constructor(props) {
		super(props);

        this.state = {
            curriculumData: null
        }
	}

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.curriculumData !== this.props.curriculumData)
           this.setState({ curriculumData: this.props.curriculumData });
     }

    renderSection = tabId => {
        if(this.state.curriculumData) {
            this.props.navigationButtonsDisplay();
            var sections = [];
        	
            switch(tabId) {
        		case this.props.tabnames[1].id:
                    sections.push({blocks: this.state.curriculumData.studies, isVisible: this.state.curriculumData.sectionVisibilities.studiesIsVisible, id: "studies", title: "Estudios", formId: "study_section_form"});
                    // sections.push({blocks: [{summaryId: 1, title: "hola", timePeriod: "(2015-2016)", isVisible: false}], isVisible: true, id: "studies", title: "Estudios", formId: "study_section_form"});
                    sections.push({blocks: this.state.curriculumData.certificates, isVisible: this.state.curriculumData.sectionVisibilities.certificatesIsVisible, id: "certificates", title: "Certificados", formId: "certificate_section_form"});
                        //sections.push({blocks: [{summaryId: 1, title: "hola", timePeriod: "(2015-2016)", isVisible: false}], isVisible: true, id: "certificates", title: "Certificados", formId: "certificate_section_form"});
                    sections.push({blocks: this.state.curriculumData.workExperiences, isVisible: this.state.curriculumData.sectionVisibilities.workExperiencesIsVisible, id: "work_experiences", title: "Experiencias laborales", formId: "work_experience_section_form"});
                    //sections.push({blocks: [{summaryId: 1, title: "hola", timePeriod: "(2015-2016)", isVisible: false}], isVisible: true, id: "work_experiences", title: "Experiencias laborales", formId: "work_experience_section_form"});
                    return <SummaryBlocksWrapper sectionsInTab={sections} id={tabId}></SummaryBlocksWrapper>
        			//return <StudiesExperiencesWrapper id={this.props.tabnames[1].id}></StudiesExperiencesWrapper>
        		case this.props.tabnames[2].id:
                    sections.push({blocks: [{summaryId: 1, title: "hola", timePeriod: "(2015-2016)", isVisible: false},{summaryId: 2, title: "hola de nuevo", timePeriod: "(2016-2020)", isVisible: true}], isVisible: true, id: "languages", title: "Idiomas", formId: "language_section_form"});
                    sections.push({blocks: [{summaryId: 1, title: "hola", timePeriod: "(2015-2016)", isVisible: false},{summaryId: 2, title: "hola de nuevo", timePeriod: "(2016-2020)", isVisible: true}], isVisible: true, id: "skills", title: "Habilidades informáticas", formId: "skill_section_form"});
                    sections.push({blocks: [{summaryId: 1, title: "hola", timePeriod: "(2015-2016)", isVisible: true},{summaryId: 2, title: "hola de nuevo", timePeriod: "(2016-2020)", isVisible: true}], isVisible: true, id: "interests", title: "Intereses", formId: "interest_section_form"});
                    sections.push({blocks: [{summaryId: 1, title: "hola", timePeriod: "(2015-2016)", isVisible: true},{summaryId: 2, title: "hola de nuevo", timePeriod: "(2016-2020)", isVisible: true}], isVisible: true, id: "personal_references", title: "Referencias personales", formId: "personal_reference_section_form"});
                    return <SummaryBlocksWrapper sectionsInTab={sections} id={tabId}></SummaryBlocksWrapper>
        			//return <OtherInformationWrapper id={this.props.tabnames[2].id}></OtherInformationWrapper>
        		case this.props.tabnames[3].id:
                    sections.push({blocks: [{summaryId: 1, title: "hola", timePeriod: "(2015-2016)", isVisible: true},{summaryId: 2, title: "hola de nuevo", timePeriod: "(2016-2020)", isVisible: true}], isVisible: true, id: "custom_sections", title: "Secciones personalizadas", formId: "custom_section_section_form"});
                    return <SummaryBlocksWrapper sectionsInTab={sections} id={tabId}></SummaryBlocksWrapper>
        			//return <CustomSectionsWrapper id={this.props.tabnames[3].id}></CustomSectionsWrapper>
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
        else {
            return <Card border="success" className="overflow-hidden mb-3">
                        <Card.Body>
                            <NormalSpinner></NormalSpinner>
                        </Card.Body>
                    </Card>
        }
    }
	
	render() {
		let tabId = this.props.tabname;
		return this.renderSection(tabId);
	}
}

export default TabPages;