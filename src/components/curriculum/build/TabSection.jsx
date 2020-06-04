import React from 'react';
import { Card } from 'react-bootstrap';

import {
	PersonalDetail,
	Studies,
	WorkExperiences,
	Certificates,
	Languages,
	Skills,
	Interests,
	PersonalReferences,
	CustomSections
} from './sections';

class TabSection extends React.Component {
	constructor(props) {
		super(props);
		this.getSectionNameParameter = this.getSectionNameParameter.bind(this);
		this.renderSection = this.renderSection.bind(this);
	}

	getSectionNameParameter() {
        return (new URLSearchParams(window.location.search)).get('sectionName');
    }

    renderSection(sectionId) {
    	switch(sectionId) {
    		case this.props.tabSections[0].id:
    			return <PersonalDetail></PersonalDetail>
    		case this.props.tabSections[1].id:
    			return <React.Fragment>
	    			   	<Studies></Studies>
	    				<WorkExperiences></WorkExperiences>
	    				<Certificates></Certificates>
	    			   </React.Fragment>
    		case this.props.tabSections[2].id:
    			return <React.Fragment>
						<Languages></Languages>
						<Skills></Skills>
						<Interests></Interests>
						<PersonalReferences></PersonalReferences>
    				   </React.Fragment>
    		case this.props.tabSections[3].id:
    			return <CustomSections></CustomSections>
    		default:
    			return <PersonalDetail></PersonalDetail>
    	}
    }
	
	render() {
		//let sectionId = this.getSectionNameParameter();
		let sectionId = this.props.sectionName;

		return (
			<div id={sectionId}>
	            <Card border="success" className="overflow-hidden">
	                <Card.Body>{this.renderSection(sectionId)}</Card.Body>
	            </Card>
	        </div>
		);
	}
}

export default TabSection;