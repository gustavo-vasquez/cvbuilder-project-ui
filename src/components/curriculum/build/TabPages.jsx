import React from 'react';
import { Card } from 'react-bootstrap';

// componentes
import { PersonalDetail } from './sections';
import SummaryBlocksWrapper from './SummaryBlocksWrapper';
import { NormalSpinner } from '../../Spinners';
import sectionMetadata from '../../helpers/sectionMetadata';

class TabPages extends React.Component {
	constructor(props) {
		super(props);

        this.state = {
            curriculumData: null,
            currentTabName: ''
        }
	}

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.curriculumData !== this.props.curriculumData)
           this.setState({ curriculumData: this.props.curriculumData, currentTabName: this.props.tabname });
     }

    renderSection = tabId => {
        if(this.state.curriculumData) {
            this.props.navigationButtonsDisplay();
            var sections = [];
        	
            switch(tabId) {
        		case this.props.tabnames[1].id:
                    sections.push({blocks: this.state.curriculumData.studies, isVisible: this.state.curriculumData.sectionVisibilities.studiesIsVisible, metadata: sectionMetadata.studies });
                    sections.push({blocks: this.state.curriculumData.workExperiences, isVisible: this.state.curriculumData.sectionVisibilities.workExperiencesIsVisible, metadata: sectionMetadata.workExperiences });
                    sections.push({blocks: this.state.curriculumData.certificates, isVisible: this.state.curriculumData.sectionVisibilities.certificatesIsVisible, metadata: sectionMetadata.certificates });
                    return <SummaryBlocksWrapper key={tabId} sectionsInTab={sections} id={tabId} curriculumId={this.state.curriculumData.curriculumId}></SummaryBlocksWrapper>
        		case this.props.tabnames[2].id:
                    sections.push({blocks: this.state.curriculumData.languages, isVisible: this.state.curriculumData.sectionVisibilities.languagesIsVisible, metadata: sectionMetadata.languages });
                    sections.push({blocks: this.state.curriculumData.skills, isVisible: this.state.curriculumData.sectionVisibilities.skillsIsVisible, metadata: sectionMetadata.skills });
                    sections.push({blocks: this.state.curriculumData.interests, isVisible: this.state.curriculumData.sectionVisibilities.interestsIsVisible, metadata: sectionMetadata.interests });
                    sections.push({blocks: this.state.curriculumData.personalReferences, isVisible: this.state.curriculumData.sectionVisibilities.personalReferencesIsVisible, metadata: sectionMetadata.personalReferences });
                    return <SummaryBlocksWrapper key={tabId} sectionsInTab={sections} id={tabId} curriculumId={this.state.curriculumData.curriculumId}></SummaryBlocksWrapper>
        		case this.props.tabnames[3].id:
                    sections.push({blocks: this.state.curriculumData.customSections, isVisible: this.state.curriculumData.sectionVisibilities.customSectionsIsVisible, metadata: sectionMetadata.customSections });
                    return <SummaryBlocksWrapper key={tabId} sectionsInTab={sections} id={tabId} curriculumId={this.state.curriculumData.curriculumId}></SummaryBlocksWrapper>
        		case this.props.tabnames[0].id:
        		default:
        			return <div id={this.props.tabnames[0].id}>
                    			<Card border="success" className="overflow-hidden mb-3">
                        			<Card.Body>
        								<PersonalDetail formData={this.state.curriculumData.personalDetail} metadata={sectionMetadata.personalDetail} curriculumId={this.state.curriculumData.curriculumId}></PersonalDetail>
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
		return this.renderSection(this.props.tabname);
	}
}

export default TabPages;