import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col, Image } from 'react-bootstrap';

// componentes
import { levelOptions } from '../build/sections/sectionTasks';
import { defaultProperties, formattedInterestList } from '../globalCurriculumVariables';
import { analyzePagedCurriculum } from './readyTasks';

export const ClassicTemplate = props => {
	useEffect(() =>
		analyzePagedCurriculum(props.cvready.template.name, props.el),
		[props.cvready.template.name, props.el] // solo se va a volver a ejecutar si cambia este valor
	);

	return (
		<div className="col-auto page">
			<Helmet>
				<link rel="stylesheet" type="text/css" href="/assets/css/templates/classic.css" />
			</Helmet>
		    <Row className="cv-header">
		        <label className="profession-label">{ props.cvready.personalDetail.profession }</label>
		        <Col>
		            <Image src={ props.cvready.personalDetail.photo } alt="curriculum_photo" fluid roundedCircle />
		            <p className="title">{ `${props.cvready.personalDetail.name} ${props.cvready.personalDetail.lastName}` }</p>
		            <p className="subtitle font-weight-bold">
		            	{ props.cvready.personalDetail.email }
		            	{ props.cvready.personalDetail.linePhone && <React.Fragment><span> |</span> { props.cvready.personalDetail.linePhone }</React.Fragment> }
		            	{ props.cvready.personalDetail.mobilePhone && <React.Fragment><span> |</span> { props.cvready.personalDetail.mobilePhone } </React.Fragment> }
		            </p>
		            <p className="subtitle">
		                { props.cvready.personalDetail.facebookUrl && <React.Fragment><i className="fab fa-facebook-square highlight"></i> { props.cvready.personalDetail.facebookUrl }</React.Fragment> }
		                { props.cvready.personalDetail.linkedInUrl && <React.Fragment><i className="fab fa-linkedin highlight"></i> { props.cvready.personalDetail.linkedInUrl }</React.Fragment> }
		                { props.cvready.personalDetail.githubUrl && <React.Fragment><i className="fab fa-github highlight"></i> { props.cvready.personalDetail.githubUrl }</React.Fragment> }
		                { props.cvready.personalDetail.twitterUrl && <React.Fragment><i className="fab fa-twitter highlight"></i> { props.cvready.personalDetail.twitterUrl }</React.Fragment> }
		            </p>
		            <p className="subtitle">{ props.cvready.personalDetail.location && props.cvready.personalDetail.location }
		                { props.cvready.personalDetail.webPageUrl && <React.Fragment><i className="fas fa-globe-americas pl-1"></i> { props.cvready.personalDetail.webPageUrl }</React.Fragment> }
		            </p>
		        </Col>
		    </Row>
		    { props.cvready.personalDetail.summaryIsVisible &&
		        <Row className="cv-block">
		            <Col md="4">
		                <h3 className="block-title text-uppercase">{ props.cvready.personalDetail.summaryCustomTitle || defaultProperties.DEFAULT_SUMMARY_TITLE }</h3>
		            </Col>
		            <Col md="8">
		                <p>{ props.cvready.personalDetail.summary }</p>
		            </Col>
		        </Row>
		    }

		    { props.cvready.sectionVisibility.workExperiencesIsVisible && props.cvready.workExperiences.length > 0 &&
		    	<React.Fragment>
		        <Row>
		            <Col>
		                <h3 className="block-title text-uppercase">Experiencia laboral</h3>
		                <hr className="mw-100 mt-0 mb-0" />
		            </Col>
		        </Row>
		        { props.cvready.workExperiences.map((work, index) =>
		            <Row className="cv-block" key={ index }>
		                <Col md="4">
		                    <h5 className="block-subtitle font-weight-bold">{ work.company }</h5>
		                    <h5 className="block-subtitle">{ work.city }</h5>
		                </Col>
		                <Col md="8">
		                    <h5 className="block-subtitle font-weight-bold">{ work.job }</h5>
		                    { work.timePeriod && <h5 className="block-subtitle">{ work.timePeriod }</h5> }
		                    { work.description && <p>{ work.description }</p> }
		                </Col>
		            </Row>
		        )}
		        </React.Fragment>
		    }

		    { props.cvready.sectionVisibility.certificatesIsVisible && props.cvready.certificates.length > 0 &&
		    	<React.Fragment>
		        <Row>
		            <Col>
		                <h3 className="block-title text-uppercase">Certificados - Cursos</h3>
		                <hr className="mw-100 mt-0 mb-0" />
		            </Col>
		        </Row>
		        { props.cvready.certificates.map((certificate, index) =>
		            <Row className="cv-block" key={ index }>
		                <Col md="4">
		                    <h5 className="block-subtitle font-weight-bold">{ certificate.institute }</h5>
		                    { certificate.onlineMode ?
	                    	  <h5 className="block-subtitle">{ defaultProperties.CERTIFICATE_ONLINE_TEXT }</h5>
		                    : <h5 className="block-subtitle">{ defaultProperties.CERTIFICATE_CLASS_TEXT }</h5>
		                	}
		                </Col>
		                <Col md="8">
		                    <h5 className="block-subtitle font-weight-bold">{ certificate.name }</h5>
		                    { certificate.inProgress ?
		                      <h5 className="block-subtitle">{ defaultProperties.CERTIFICATE_INPROGRESS_TEXT }</h5>
		                    : <h5 className="block-subtitle">{ certificate.year }</h5>
		                    }

		                    { certificate.description && <p>{ certificate.description }</p> }
		                </Col>
		            </Row>
		        )}
		        </React.Fragment>
		    }

		    { props.cvready.sectionVisibility.studiesIsVisible && props.cvready.studies.length > 0 &&
		    	<React.Fragment>
		        <Row>
		            <Col>
		                <h3 className="block-title text-uppercase">Estudios</h3>
		                <hr className="mw-100 mt-0 mb-0" />
		            </Col>
		        </Row>
		        { props.cvready.studies.map((study, index) =>
	            <Row className="cv-block" key={ index }>
	                <Col md="4">
	                    <h5 className="block-subtitle font-weight-bold">{ study.institute }</h5>
	                    <h5 className="block-subtitle">{ study.city }</h5>
	                </Col>
	                <Col md="8">
	                    <h5 className="block-subtitle font-weight-bold">{ study.title }</h5>
	                    { study.timePeriod && <h5 className="block-subtitle">{ study.timePeriod }</h5> }
	                    { study.description && <p>{ study.description }</p> }
	                </Col>
	            </Row>
	            )}
		        </React.Fragment>
		    }
		    
		    { props.cvready.sectionVisibility.personalReferencesIsVisible && props.cvready.personalReferences.length > 0 &&
		    	<React.Fragment>
		        <Row>
		            <Col>
		                <h3 className="block-title text-uppercase">Referencias personales</h3>
		                <hr className="mw-100 mt-0 mb-0" />
		            </Col>
		        </Row>
		        { props.cvready.personalReferences.map((reference, index) =>
					<Row className="cv-block" key={ index }>
			            <Col md="4">
			                <h5 className="block-subtitle font-weight-bold">{ reference.company }</h5>
			                { reference.phoneNumber && <h5 className="block-subtitle">reference.phoneNumber</h5> }
			            </Col>
			            <Col md="8">
			                <h5 className="block-subtitle font-weight-bold">{ reference.contactPerson }</h5>
			                <h5 className="block-subtitle">{ reference.email }</h5>
			            </Col>
			        </Row>
		    	)}
		        </React.Fragment>
	        }
		    
		    { props.cvready.sectionVisibility.languagesIsVisible && props.cvready.languages.length > 0 &&
		        <Row className="cv-block">
		            <Col md="4">
		                <h3 className="block-title text-uppercase">Idiomas</h3>
		            </Col>
		            <Col md="8">
		                <p>{ formattedLanguageOrSkillList(props.cvready.languages) }</p>
		            </Col>
	            </Row>
        	}
		        
		    { props.cvready.sectionVisibility.skillsIsVisible && props.cvready.skills.length > 0 &&
		        <Row className="cv-block">
		            <Col md="4">
		                <h3 className="block-title text-uppercase">Habilidades</h3>
		            </Col>
		            <Col md="8">
		                <p>{ formattedLanguageOrSkillList(props.cvready.skills) }</p>
		            </Col>
		        </Row>
	    	}
		        
		    { props.cvready.sectionVisibility.interestsIsVisible && props.cvready.interests.length > 0 &&
		        <Row className="cv-block">
		            <Col md="4">
		                <h3 className="block-title text-uppercase">Intereses</h3>
		            </Col>
		            <Col md="8">
		                <p>{ formattedInterestList(props.cvready.interests) }</p>
		            </Col>
		        </Row>
	    	}

		    { props.cvready.sectionVisibility.CustomSectionsIsVisible
	    	&& props.cvready.customSections.length > 0
	    	&& props.cvready.customSections.map((customSection, index) =>
	            <Row class="row cv-block" key={ index }>
	                <Col md="4">
	                    <h3 className="block-title text-uppercase">{ customSection.sectionName }</h3>
	                </Col>
	                <Col md="8">
	                    <p className="white-space-pre-wrap">{ customSection.description }</p>
	                </Col>
	            </Row>
            )}
		</div>
	);
}

const formattedLanguageOrSkillList = items => {
	let result = [];
	items.map(item => result.push(item.name.concat(" (", (levelOptions.find(element => element.value === item.level)).text, ")")));
	return result.join(", ");
}

/*const formattedInterestList = interests => {
	let result = [];
	interests.map(interest => result.push(interest.name));
	return result.join(", ");
}*/