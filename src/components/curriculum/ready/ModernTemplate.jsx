import React, { useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';

// componentes
import { defaultProperties, formattedInterestList } from '../globalCurriculumVariables';
import { initialTask, endTask } from './readyTasks';

export const ModernTemplate = props => {
	useEffect(() => {
		initialTask(props.cvready.template.name);
		return () => endTask();
	}, [props.cvready.template.name]); // solo se va a volver a ejecutar si cambia este valor

	return (
		<div className="col-auto page">
		    <Row className="cv-header">
		        <Col xs="5" className="text-right justify-content-center align-self-center">
		            <h1>{ props.cvready.personalDetail.name }</h1>
		        </Col>
		        <Col xs="2" className="my-3 text-center">
		            <Image src={ props.cvready.personalDetail.photo } alt="curriculum_photo" roundedCircle />
		        </Col>
		        <Col xs="5" className="justify-content-center align-self-center">
		            <h1>{ props.cvready.personalDetail.lastName }</h1>
		        </Col>
		        { props.cvready.personalDetail.profession &&
		            <Col className="cv-legend">
		                <h4>{ props.cvready.personalDetail.profession }</h4>
		            </Col>
		        }
		    </Row>
		    <Row>
		        <Col xs="4" className="left-panel">
		        	{ props.cvready.personalDetail.summaryIsVisible &&
		        		<React.Fragment>
			            <Row>
			                <Col>
			                    <h5><i className="far fa-calendar-check highlight"></i> { props.cvready.personalDetail.summaryCustomTitle || defaultProperties.DEFAULT_SUMMARY_TITLE }</h5>
			                    <hr />
			                </Col>
			            </Row>
			            <Row className="no-gutters justify-content-end">
			                <div xs="11">
			                    <p>{ props.cvready.personalDetail.summary }</p>
			                </div>
			            </Row>
			            </React.Fragment>
		        	}

		            { props.cvready.sectionVisibility.skillsIsVisible && props.cvready.skills.length > 0 &&
		            	<React.Fragment>
		                <Row>
		                    <Col>
		                        <h5><i className="fas fa-star highlight"></i> Habilidades</h5>
		                        <hr />
		                    </Col>
		                </Row>
		                { props.cvready.skills.map((skill, index) =>
		                    <Row className="no-gutters justify-content-end" key={ index }>
		                        <Col xs="11">
		                            <span>{ skill.name }</span>
		                            <div className="progress">
		                                <div className={`progress-bar progress-bar-${skill.level}`} role="progressbar"></div>
		                            </div>
		                        </Col>
		                    </Row>
		                )}
		                </React.Fragment>
		            }
		            
		            <Row className="no-gutters contact">
		                <Col>
		                    <h5><i className="far fa-comment highlight"></i> Contacto</h5>
		                    <hr />
		                </Col>
		            </Row>
		            <Row>
		                <Col xs="3" className="text-right">
		                    <i className="fas fa-globe-americas highlight"></i>
		                </Col>
		                <Col xs="9" className="pl-0">
		                    <span>{ props.cvready.personalDetail.email }</span>
		                    { props.cvready.personalDetail.webPageUrl && <span>{ props.cvready.personalDetail.webPageUrl }</span> }
		                </Col>
		            </Row>

		            { (props.cvready.personalDetail.mobilePhone || props.cvready.personalDetail.linePhone) &&
		                <Row>
		                    <Col xs="3" className="text-right">
		                        <i className="fas fa-phone-volume highlight"></i>
		                    </Col>
		                    <Col xs="9">
		                        { props.cvready.personalDetail.mobilePhone && <span>{ props.cvready.personalDetail.mobilePhone }</span> }
		                        { props.cvready.personalDetail.linePhone && <span>{ props.cvready.personalDetail.linePhone }</span> }
		                    </Col>
		                </Row>
		            }
		            
		            { props.cvready.personalDetail.facebookUrl &&
		                <Row>
		                    <Col xs="3" className="text-right">
		                        <i className="fab fa-facebook-square highlight"></i>
		                    </Col>
		                    <Col xs="9">
		                        <span>{ props.cvready.personalDetail.facebookUrl }</span>
		                    </Col>
		                </Row>
		            }

		            { props.cvready.personalDetail.twitterUrl &&
		                <Row>
		                    <Col xs="3" className="text-right">
		                        <i className="fab fa-twitter highlight"></i>
		                    </Col>
		                    <Col xs="9">
		                        <span>{ props.cvready.personalDetail.twitterUrl }</span>
		                    </Col>
		                </Row>
		            }

		            { props.cvready.personalDetail.linkedInUrl &&
		                <Row>
		                    <Col xs="3" className="text-right">
		                        <i className="fab fa-linkedin highlight"></i>
		                    </Col>
		                    <Col xs="9">
		                        <span>{ props.cvready.personalDetail.linkedInUrl }</span>
		                    </Col>
		                </Row>
		            }

		            { props.cvready.personalDetail.githubUrl &&
		                <Row>
		                    <Col xs="3" className="text-right">
		                        <i className="fab fa-github highlight"></i>
		                    </Col>
		                    <Col xs="9">
		                        <span>{ props.cvready.personalDetail.githubUrl }</span>
		                    </Col>
		                </Row>
		            }
		        </Col>
		        <Col xs="8" className="right-panel">
		            { props.cvready.sectionVisibility.workExperiencesIsVisible && props.cvready.workExperiences.length > 0 &&
		            	<React.Fragment>
		                <Row className="no-gutters">
		                    <Col>
		                        <h5><i className="fas fa-briefcase highlight"></i> Experiencia laboral</h5>
		                        <hr />
		                    </Col>
		                </Row>
		                { props.cvready.workExperiences.map((work, index) =>
		                    <Row className="no-gutters justify-content-start" key={ index }>
		                        <Col xs="11">
		                            <h5 className="d-inline highlight">{ work.job }</h5>
		                            { work.timePeriod && <h5 className="d-inline legend">{` | ${work.timePeriod}`}</h5> }
		                            <p className="subtitle">{`${work.company} | ${work.city}`}</p>
		                            { work.description && <p className="space-word-break">{ work.description }</p> }
		                        </Col>
		                    </Row>
		                )}
		                </React.Fragment>
		            }

		            { props.cvready.sectionVisibility.studiesIsVisible && props.cvready.studies.length > 0 &&
		            	<React.Fragment>
		                <Row className="no-gutters">
		                    <Col>
		                        <h5><i className="fas fa-graduation-cap highlight"></i> Estudios</h5>
		                        <hr />
		                    </Col>
		                </Row>
		                { props.cvready.studies.map((study, index) =>
		                    <Row className="no-gutters justify-content-start" key={ index }>
		                        <Col xs="11">
		                            <h5 className="d-inline highlight">{ study.title }</h5>
		                            { study.timePeriod && <h5 className="d-inline legend">{` | ${study.timePeriod}`}</h5> }
		                            <p className="subtitle">{ `${study.institute} | ${study.city}` }</p>
		                            { study.description && <p className="space-word-break">{ study.description }</p> }
		                        </Col>
		                    </Row>
		                )}
		                </React.Fragment>
		            }

		            { props.cvready.sectionVisibility.certificatesIsVisible && props.cvready.certificates.length > 0 &&
		            	<React.Fragment>
		                <Row className="no-gutters">
		                    <Col>
		                        <h5><i className="fas fa-certificate highlight"></i> Certificados/Cursos</h5>
		                        <hr />
		                    </Col>
		                </Row>
		                { props.cvready.certificates.map((certificate, index) =>
		                    <Row className="no-gutters justify-content-start" key={ index }>
		                        <Col xs="11">
		                            <h5 className="d-inline highlight">{ certificate.name }</h5>
		                            <h5 className="d-inline legend"> | { certificate.inProgress ? defaultProperties.CERTIFICATE_INPROGRESS_TEXT : certificate.year }</h5>
		                            <p className="subtitle">{ `${certificate.institute} | ${certificate.onlineMode ? defaultProperties.CERTIFICATE_ONLINE_TEXT : defaultProperties.CERTIFICATE_CLASS_TEXT}` }</p>
		                            { certificate.description && <p className="space-word-break">{ certificate.description }</p> }
		                        </Col>
		                    </Row>
		                )}
		                </React.Fragment>
		            }

		            { props.cvready.sectionVisibility.personalReferencesIsVisible && props.cvready.personalReferences.length > 0 &&
		            	<React.Fragment>
		                <Row className="no-gutters">
		                    <Col>
		                        <h5><i className="fas fa-chalkboard-teacher highlight"></i> Referencias personales</h5>
		                        <hr />
		                    </Col>
		                </Row>
		                { props.cvready.personalReferences.map((reference, index) =>
		                    <Row className="no-gutters justify-content-start" key={ index }>
		                        <Col xs="11">
		                            <h5 className="d-inline highlight">{ reference.contactPerson }</h5>
		                            <h5 className="d-inline legend">{` | ${reference.email}`}</h5>
		                            <p className="subtitle">{ reference.company } { reference.phoneNumber && <label>{` | ${reference.phoneNumber}`}</label> }</p>
		                        </Col>
		                    </Row>
		                )}
		                </React.Fragment>
		            }

		            { props.cvready.sectionVisibility.languagesIsVisible && props.cvready.languages.length > 0 &&
		            	<React.Fragment>
		                <Row className="no-gutters">
		                    <Col>
		                        <h5><i className="fas fa-language highlight"></i> Idiomas</h5>
		                        <hr />
		                    </Col>
		                </Row>
                        <Row className="no-gutters">
                            { props.cvready.languages.map((language, index) =>
                                <Col xs="6" key={ index }>
                                    <Row>
                                        <Col xs="auto">
                                            <span>{ language.name }</span>
                                        </Col>
                                        <Col xs="6" className="align-self-center">
                                            <div className="progress">
                                                <div className={`progress-bar progress-bar-${language.level}`} role="progressbar"></div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            )}
                        </Row>
                        </React.Fragment>
		            }

		            { props.cvready.sectionVisibility.interestsIsVisible && props.cvready.interests.length > 0 &&
		            	<React.Fragment>
		            	<Row className="no-gutters">
		            		<Col>
			            		<h5><i className="fas fa-bullhorn highlight"></i> Intereses</h5>
		                        <hr />
	                        </Col>
		            	</Row>
		                <Row className="no-gutters">
		                    <Col>
		                        <p className="pt-2">{ formattedInterestList(props.cvready.interests) }</p>
		                    </Col>
		                </Row>
		                </React.Fragment>
		            }

		            { props.cvready.sectionVisibility.customSectionsIsVisible && props.cvready.customSections.length > 0 &&
		                props.cvready.customSections.map((custom, index) =>
		                	<React.Fragment key={ index }>
		                    <Row className="no-gutters">
		                        <Col>
		                            <h5><i className="fas fa-stream highlight"></i> { custom.sectionName }</h5>
		                            <hr />
		                        </Col>
		                    </Row>
		                    <Row className="no-gutters justify-content-start">
		                        <Col>
		                            <p className="subtitle space-word-break">{ custom.description }</p>
		                        </Col>
		                    </Row>
		                    </React.Fragment>
		                )
		            }
		        </Col>
		    </Row>
		</div>
	);
}