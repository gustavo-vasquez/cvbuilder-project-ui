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
            this.setState({
                personalDetail: this.props.curriculumData.personalDetail,
                sectionsData: [
                    {
                        blocks: this.props.curriculumData.studies,
                        isVisible: this.props.curriculumData.sectionVisibilities.studiesIsVisible,
                        metadata: sectionMetadata.studies
                    },
                    {
                        blocks: this.props.curriculumData.workExperiences,
                        isVisible: this.props.curriculumData.sectionVisibilities.workExperiencesIsVisible,
                        metadata: sectionMetadata.workExperiences
                    },
                    {
                        blocks: this.props.curriculumData.certificates,
                        isVisible: this.props.curriculumData.sectionVisibilities.certificatesIsVisible,
                        metadata: sectionMetadata.certificates
                    },
                    {
                        blocks: this.props.curriculumData.languages,
                        isVisible: this.props.curriculumData.sectionVisibilities.languagesIsVisible,
                        metadata: sectionMetadata.languages
                    },
                    {
                        blocks: this.props.curriculumData.skills,
                        isVisible: this.props.curriculumData.sectionVisibilities.skillsIsVisible,
                        metadata: sectionMetadata.skills
                    },
                    {
                        blocks: this.props.curriculumData.interests,
                        isVisible: this.props.curriculumData.sectionVisibilities.interestsIsVisible,
                        metadata: sectionMetadata.interests
                    },
                    {
                        blocks: this.props.curriculumData.personalReferences,
                        isVisible: this.props.curriculumData.sectionVisibilities.personalReferencesIsVisible,
                        metadata: sectionMetadata.personalReferences
                    },
                    {
                        blocks: this.props.curriculumData.customSections,
                        isVisible: this.props.curriculumData.sectionVisibilities.customSectionsIsVisible,
                        metadata: sectionMetadata.customSections
                    }
                ],
                currentTabName: this.props.tabname
            });
    }

    renderSection = tabId => {
        if(this.state.sectionsData && this.state.personalDetail) {
            this.props.navigationButtonsDisplay();
        	
            switch(tabId) {
        		case this.props.tabnames[1].id:
                    return <SummaryBlocksWrapper
                                key={tabId}
                                sectionsInTab={this.state.sectionsData.slice(0,3)}
                                id={tabId}
                                curriculumId={this.props.curriculumData.curriculumId}>
                            </SummaryBlocksWrapper>
        		case this.props.tabnames[2].id:
                    return <SummaryBlocksWrapper
                                key={tabId}
                                sectionsInTab={this.state.sectionsData.slice(3,7)}
                                id={tabId}
                                curriculumId={this.props.curriculumData.curriculumId}>
                            </SummaryBlocksWrapper>
        		case this.props.tabnames[3].id:
                    return <SummaryBlocksWrapper
                                key={tabId}
                                sectionsInTab={this.state.sectionsData.slice(7)}
                                id={tabId}
                                curriculumId={this.props.curriculumData.curriculumId}>
                            </SummaryBlocksWrapper>
        		case this.props.tabnames[0].id:
        		default:
        			return <div id={this.props.tabnames[0].id}>
                    			<Card border="success" className="overflow-hidden mb-3">
                        			<Card.Body>
        								<PersonalDetail
                                            formData={this.state.personalDetail}
                                            metadata={sectionMetadata.personalDetail}
                                            curriculumId={this.props.curriculumData.curriculumId}
                                            updatePhotoPreview={this.updatePhotoPreview}
                                            updatePersonalDetailValues={this.updatePersonalDetailValues}>
                                        </PersonalDetail>
        							</Card.Body>
        						</Card>
        					</div>
        	}
        }
        else {
            return <Card border="success" className="overflow-hidden no-animation mb-3">
                        <Card.Body>
                            <NormalSpinner></NormalSpinner>
                        </Card.Body>
                    </Card>
        }
    }

    updatePhotoPreview = newPhoto => {
        let personalDetail = this.state.personalDetail;
        personalDetail.photo = newPhoto;
        this.setState({ personalDetail: personalDetail });
    }

    updatePersonalDetailValues = newValues => {
        this.setState({ personalDetail: newValues });
    }
	
	render() {
		return this.renderSection(this.props.tabname);
	}
}

export default TabPages;