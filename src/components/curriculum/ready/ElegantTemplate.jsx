import React, { useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';

// componentes
import { defaultProperties, formattedInterestList } from '../globalCurriculumVariables';
import { initialTask, endTask } from './readyTasks';

export const ElegantTemplate = props => {
	useEffect(() => {
		initialTask(props.cvready.template.name);
		return () => endTask();
	}, [props.cvready.template.name]); // solo se va a volver a ejecutar si cambia este valor

	return (
		<div className="col-auto page">
		    <Row>
		        <Col xs="4" className="left-panel">
		            <Row>
		                <Col className="text-center">
		                    <Image src={ props.cvready.personalDetail.photo } alt="curriculum_photo" roundedCircle />
		                </Col>
		            </Row>
		            <Row>
		                <Col>
		                    <h1 className="title">Contacto</h1>
		                    <hr className="mw-100" />
		                </Col>
		            </Row>
		            <Row>
		                <Col xs="2">
		                    <i className="fas fa-map-marker-alt"></i>
		                </Col>
		                <Col xs="10">
		                { props.cvready.personalDetail.location && <span>{ props.cvready.personalDetail.location }</span> }
		                </Col>
		            </Row>

		            {(props.cvready.personalDetail.mobilePhone || props.cvready.personalDetail.linePhone) &&
		                <Row>
		                    <Col xs="2">
		                        <i className="fas fa-phone-volume"></i>
		                    </Col>
		                    <Col xs="10">
		                        { props.cvready.personalDetail.mobilePhone && <span>{ props.cvready.personalDetail.mobilePhone }</span> }
		                        { props.cvready.personalDetail.linePhone && <span>{ props.cvready.personalDetail.linePhone }</span> }
		                    </Col>
		                </Row>
		            }
		            
		            <Row>
		                <Col xs="2">
		                    <i className="fas fa-globe-americas"></i>
		                </Col>
		                <Col xs="10">
		                    <span>{ props.cvready.personalDetail.email }</span>
		                    { props.cvready.personalDetail.webPageUrl && <span>{ props.cvready.personalDetail.webPageUrl }</span> }
		                </Col>
		            </Row>

		            { props.cvready.sectionVisibility.skillsIsVisible && props.cvready.skills.length > 0 &&
		            	<React.Fragment>
		                <Row>
		                    <Col>
		                        <h1 className="title">Habilidades</h1>
		                        <hr className="mw-100" />
		                    </Col>
		                </Row>
		                { props.cvready.skills.map((skill, index) =>
		                    <Row key={ index }>
		                        <Col>
		                            <span className="letter-spacing-1 text-uppercase">{ skill.name }</span>
		                            <div className="progress">
		                                <div className={`progress-bar progress-bar-${skill.level}`} role="progressbar"></div>
		                            </div>
		                        </Col>
		                    </Row>
		                )}
		                </React.Fragment>
		            }

		            { props.cvready.sectionVisibility.languagesIsVisible && props.cvready.languages.length > 0 &&
		            	<React.Fragment>
		                <Row>
		                    <Col>
		                        <h1 className="title">Idiomas</h1>
		                        <hr className="mw-100" />
		                    </Col>
		                </Row>
		                { props.cvready.languages.map((language, index) =>
		                    <Row key={ index }>
		                        <Col>
		                            <span className="letter-spacing-1 text-uppercase">{ language.name }</span>
		                            <div className="progress">
		                                <div className={`progress-bar progress-bar-${language.level}`} role="progressbar"></div>
		                            </div>
		                        </Col>
		                    </Row>
		                )}
		                </React.Fragment>
		            }

		            { (props.cvready.personalDetail.facebookUrl || props.cvready.personalDetail.twitterUrl || props.cvready.personalDetail.linkedInUrl || props.cvready.personalDetail.githubUrl) &&
		            	<React.Fragment>
		                <Row>
		                    <Col>
		                        <h1 className="title">Redes sociales</h1>
		                        <hr className="mw-100" />
		                    </Col>
		                </Row>

		                { props.cvready.personalDetail.facebookUrl &&
		                    <Row>
		                        <Col xs="2">
		                            <i className="fab fa-facebook-square"></i>
		                        </Col>
		                        <Col xs="10">
		                            <span>{ props.cvready.personalDetail.facebookUrl }</span>
		                        </Col>
		                    </Row>
		                }

		                { props.cvready.personalDetail.twitterUrl &&
		                    <Row>
		                        <Col xs="2">
		                            <i className="fab fa-twitter"></i>
		                        </Col>
		                        <Col xs="10">
		                            <span>{ props.cvready.personalDetail.twitterUrl }</span>
		                        </Col>
		                    </Row>
		                }

		                { props.cvready.personalDetail.linkedInUrl &&
		                    <Row>
		                        <Col xs="2">
		                            <i className="fab fa-linkedin"></i>
		                        </Col>
		                        <Col xs="10">
		                            <span>{ props.cvready.personalDetail.linkedInUrl }</span>
		                        </Col>
		                    </Row>
		                }

		                { props.cvready.personalDetail.githubUrl &&
		                    <Row>
		                        <Col xs="2">
		                            <i className="fab fa-github"></i>
		                        </Col>
		                        <Col xs="10">
		                            <span>{ props.cvready.personalDetail.githubUrl }</span>
		                        </Col>
		                    </Row>
		                }
						</React.Fragment>
		            }
		        </Col>
		        <Col xs="8" className="right-panel">
		            <Row>
		                <Col>
		                    <h1 className="text-uppercase">{props.cvready.personalDetail.name} {props.cvready.personalDetail.lastName}</h1>
		                    { props.cvready.personalDetail.profession && <h5 className="occupation text-uppercase">{ props.cvready.personalDetail.profession }</h5> }
		                </Col>
		            </Row>
		            { props.cvready.personalDetail.summaryIsVisible &&
		            	<React.Fragment>
			            <Row>
			                <Col>
			                    <h1 className="title"><i className="far fa-calendar-check"></i> { props.cvready.personalDetail.summaryCustomTitle || defaultProperties.DEFAULT_SUMMARY_TITLE }</h1>
			                    <hr className="mw-100" />
			                </Col>
			            </Row>
			            <Row>
			                <Col>
			                    <p>{ props.cvready.personalDetail.summary }</p>
			                </Col>
			            </Row>
			            </React.Fragment>
		        	}

		            { props.cvready.sectionVisibility.workExperiencesIsVisible && props.cvready.workExperiences.length > 0 &&
		            	<React.Fragment>
		                <Row>
		                    <Col>
		                        <h1 className="title"><i className="fas fa-briefcase"></i> Experiencia laboral</h1>
		                        <hr className="mw-100" />
		                    </Col>
		                </Row>
		                { props.cvready.workExperiences.map((work, index) =>
		                    <Row key={ index }>
		                        <Col xs="4">
		                            <span className="block-title">{ work.company }</span>
		                            { work.timePeriod && <span className="block-subtitle">{ work.timePeriod }</span> }
		                        </Col>
		                        <Col xs="7" className="offset-1">
		                            <span className="block-title text-uppercase">{ work.job }</span>
		                            <span className="block-subtitle">{ work.city }</span>
		                            { work.description && <p className="space-word-break">{ work.description }</p> }
		                        </Col>
		                    </Row>
		                )}
		                </React.Fragment>
		            }

		            { props.cvready.sectionVisibility.studiesIsVisible && props.cvready.studies.length > 0 &&
		            	<React.Fragment>
		                <Row>
		                    <Col>
		                        <h1 className="title"><i className="fas fa-graduation-cap"></i> Estudios</h1>
		                        <hr className="mw-100" />
		                    </Col>
		                </Row>
		                { props.cvready.studies.map((study, index) =>
		                    <Row key={ index }>
		                        <Col xs="4">
		                            <span className="block-title">{ study.institute }</span>
		                            { study.timePeriod && <span className="block-subtitle">{ study.timePeriod }</span> }
		                        </Col>
		                        <Col xs="7" className="offset-1">
		                            <span className="block-title text-uppercase">{ study.title }</span>
		                            <span className="block-subtitle">{ study.city }</span>
		                            { study.description && <p className="space-word-break">{ study.description }</p> }
		                        </Col>
		                    </Row>
		                )}
		                </React.Fragment>
		            }

		            { props.cvready.sectionVisibility.certificatesIsVisible && props.cvready.certificates.length > 0 &&
		            	<React.Fragment>
		                <Row>
		                    <Col>
		                        <h1 className="title"><i className="fas fa-certificate"></i> Certificados</h1>
		                        <hr className="mw-100" />
		                    </Col>
		                </Row>
		                { props.cvready.certificates.map((certificate, index) =>
		                    <Row key={ index }>
		                        <Col xs="4">
		                            <span className="block-title">{ certificate.institute }</span>
		                            { certificate.inProgress ?
		                                <span className="block-subtitle">{ defaultProperties.CERTIFICATE_INPROGRESS_TEXT }</span>
		                                : <span className="block-subtitle">{ certificate.year }</span>
		                            }
		                        </Col>
		                        <Col xs="7" className="offset-1">
		                            <span className="block-title text-uppercase">{ certificate.name }</span>
		                            { certificate.onlineMode ?
		                                <span className="block-subtitle">{ defaultProperties.CERTIFICATE_ONLINE_TEXT }</span>
		                                : <span className="block-subtitle">{ defaultProperties.CERTIFICATE_CLASS_TEXT }</span>
		                            }

		                            { certificate.description && <p className="space-word-break">{ certificate.description }</p> }
		                        </Col>
		                    </Row>
		                )}
		                </React.Fragment>
		            }

		            { props.cvready.sectionVisibility.personalReferencesIsVisible && props.cvready.personalReferences.length > 0 &&
		            	<React.Fragment>
		                <Row>
		                    <Col>
		                        <h1 className="title"><i className="far fa-file-alt"></i> Referencias personales</h1>
		                        <hr className="mw-100" />
		                    </Col>
		                </Row>
		                { props.cvready.personalReferences.map((reference, index) =>
		                    <Row key={ index }>
		                        <Col xs="4">
		                            <span className="block-title">{ reference.company }</span>
		                            { reference.phoneNumber && <span className="block-subtitle">{ reference.phoneNumber }</span> }
		                        </Col>
		                        <Col xs="7" className="offset-1">
		                            <span className="block-title text-uppercase">{ reference.contactPerson }</span>
		                            <span className="block-subtitle">{ reference.email }</span>
		                        </Col>
		                    </Row>
		                )}
		                </React.Fragment>
		            }

		            { props.cvready.sectionVisibility.interestsIsVisible && props.cvready.interests.length > 0 &&
		                <Row>
		                    <Col xs="5">
		                        <span className="block-title text-uppercase">Intereses</span>
		                    </Col>
		                    <Col xs="7">
		                        <p>{ formattedInterestList(props.cvready.interests) }</p>
		                    </Col>
		                </Row>
		            }

		            { props.cvready.sectionVisibility.customSectionsIsVisible && props.cvready.customSections.length > 0 &&
		                props.cvready.customSections.map((custom, index) =>
	                	<React.Fragment key={ index }>
		                    <Row>
		                        <Col>
		                            <h1 className="title"><i className="far fa-file-alt"></i> { custom.sectionName }</h1>
		                            <hr className="mw-100" />
		                        </Col>
		                    </Row>
		                    <Row>
		                        <Col>
		                            <p className="space-word-break">{ custom.description }</p>
		                        </Col>
		                    </Row>
		                </React.Fragment>
		            )}
		        </Col>
		    </Row>
		</div>
	);
}