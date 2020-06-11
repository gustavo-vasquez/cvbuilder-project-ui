import React from 'react';
import { Card } from 'react-bootstrap';

import {
	PersonalDetail,
	Study,
	WorkExperience,
	Certificate,
	Language,
	Skill,
	Interest,
	PersonalReference,
	CustomSection
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

    renderSection(tabId) {
    	this.props.navigationButtonsDisplay();
    	switch(tabId) {
    		case this.props.tabnames[0].id:
    			return <PersonalDetail></PersonalDetail>
    		case this.props.tabnames[1].id:
    			return <React.Fragment>
	    			   	<Study></Study>
	    				<WorkExperience></WorkExperience>
	    				<Certificate></Certificate>
	    			   </React.Fragment>
    		case this.props.tabnames[2].id:
    			return <React.Fragment>
						<Language></Language>
						<Skill></Skill>
						<Interest></Interest>
						<PersonalReference></PersonalReference>
    				   </React.Fragment>
    		case this.props.tabnames[3].id:
    			return <CustomSection></CustomSection>
    		default:
    			return <PersonalDetail></PersonalDetail>
    	}
    }
	
	render() {
		//let tabId = this.getSectionNameParameter();
		let tabId = this.props.tabname;

		return (
			<div id={tabId} className="mb-4">
	            <Card border="success" className="overflow-hidden">
	                <Card.Body>{this.renderSection(tabId)}</Card.Body>
	            </Card>
	        </div>
		);
	}
}

export default TabSection;