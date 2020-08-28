import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';

import { loadCssFile } from '../helpers';

export const Main = () => {
	useEffect(() => {
	  document.title = "Inicio - CVBuilder";
	  loadCssFile("device_mockups_styles", "/assets/device-mockups/device-mockups.css");

	  return () => document.getElementById("device_mockups_styles").remove();
	}, []);

	return (
		<div className="body-content">
			<header id="landing_page" className="masthead">
		    <Container className="container-content h-100">
		        <Row className="h-100">
		            <Col md="7" className="my-auto">
		                <div className="header-content mx-auto">
		                    <h1 className="mb-5">Creador de CV en línea. Introduce tu datos, elige una plantilla y descárgalo. Es sencillo, fácil de usar y GRATUITO.</h1>
		                    <Link to="/curriculum/build" className="btn btn-outline btn-xl">Crear mi curriculum ahora <i className="fas fa-arrow-right"></i></Link>
		                </div>
		            </Col>
		            <Col md="5" className="my-auto">
		                <div className="device-container">
		                    <div className="device-mockup ipad_air_2 portrait silver">
		                        <div className="device">
		                            <div className="screen">
		                                <Image src="/assets/img/templates/modern.png" alt="cv_example" fluid></Image>
		                            </div>
		                            <a href="#templates" className="button" title="Ver todas las plantillas"> </a>
		                        </div>
		                    </div>
		                </div>
		            </Col>
		        </Row>
		    </Container>
		    <div className="overlay"></div>
		</header>
		<section id="features" className="features">
		    <Container>
		        <div className="section-heading text-center">
		            <i className="far fa-file-alt icon-item"></i>
		            <h2>CVBuilder te ayuda a presentar un excelente curriculum profesional</h2>
		            <p className="text-muted">Echa un vistazo a algunas de las características de la plataforma</p>
		            <hr/>
		        </div>
		        <Row>
		            <Col className="my-auto">
		                <Container fluid>
		                    <Row>
		                        <Col md="6">
		                            <div className="feature-item">
		                                <i className="far fa-smile"></i>
		                                <h3>Fácil de usar</h3>
		                                <p className="text-muted">La plataforma fue echa para que sea lo más amena posible para el usuario</p>
		                            </div>
		                        </Col>
		                        <Col md="6">
		                            <div className="feature-item">
		                                <i className="fas fa-cloud-upload-alt"></i>
		                                <h3>Guardado en la nube</h3>
		                                <p className="text-muted">Crea una cuenta y podrás mantener siempre los cambios de tu curriculum para cuando lo necesites</p>
		                            </div>
		                        </Col>
		                    </Row>
		                    <Row>
		                        <Col md="6">
		                            <div className="feature-item">
		                                <i className="fas fa-palette"></i>
		                                <h3>Temas</h3>
		                                <p className="text-muted">Puedes elegir entre distintas plantillas al momento de crear tu cv</p>
		                            </div>
		                        </Col>
		                        <Col md="6">
		                            <div className="feature-item">
		                                <i className="fas fa-puzzle-piece"></i>
		                                <h3>Secciones propias</h3>
		                                <p className="text-muted">Si las secciones del CV no son suficientes para ti puedes crear todas las que quieras</p>
		                            </div>
		                        </Col>
		                    </Row>
		                    <Row>
		                        <Col md="6">
		                            <div className="feature-item">
		                                <i className="fas fa-download"></i>
		                                <h3>Descarga</h3>
		                                <p className="text-muted">Una vez terminado podrás descargar el CV como PDF listo para enviarlo</p>
		                            </div>
		                        </Col>
		                        <Col md="6">
		                            <div className="feature-item">
		                            	<i className="fas fa-gift"></i>
		                                <h3>Gratuito</h3>
		                                <p className="text-muted">Puedes crear, editar y descargar tu CV las veces que quieras sin ningún costo</p>
		                            </div>
		                        </Col>
		                    </Row>
		                </Container>
		            </Col>
		        </Row>
		    </Container>
		</section>
		<section id="templates" className="download text-center">
		    <Container>
		        <Row>
		            <Col>
		                <i className="fas fa-magic icon-item"></i>
		                <h2 className="section-heading">Dale tu estilo al curriculum con estas plantillas disponibles</h2>
		                <p>Puedes cambiarla en cualquier momento mientras creas tu CV. ¡Elige el que más te guste!</p>
		                <hr />
		            </Col>
		        </Row>
		        <Row className="available-templates">
		            <Col md="4">
		                <a href="/assets/img/templates/classic.png" target="_blank" rel="noopener noreferrer" title="Ver en detalle"><Image src="/assets/img/templates/classic.png" alt="classic_template" fluid/></a>
		                <p className="template-name">Classic</p>
		            </Col>
		            <Col md="4">
		                <a href="/assets/img/templates/elegant.png" target="_blank" rel="noopener noreferrer" title="Ver en detalle"><Image src="/assets/img/templates/elegant.png" alt="elegant_template" fluid/></a>
		                <p className="template-name">Elegant</p>
		            </Col>
		            <Col md="4">
		                <a href="/assets/img/templates/modern.png" target="_blank" rel="noopener noreferrer" title="Ver en detalle"><Image src="/assets/img/templates/modern.png" alt="modern_template" fluid/></a>
		                <p className="template-name">Modern</p>
		            </Col>
		        </Row>
		    </Container>
		</section>
		<section id="testimonials">
		    <Container>
		        <Row>
		            <Col className="text-center">
		                <i className="far fa-comment-alt icon-item"></i>
		                <h2>Testimonios</h2>
		                <hr />
		            </Col>
		        </Row>
		        <Row>
		            <Col md="4">
		                <blockquote className="blockquote">
		                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
		                    <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
		                </blockquote>
		            </Col>
		            <Col md="4">
		                <blockquote className="blockquote text-center">
		                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
		                    <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
		                </blockquote>
		            </Col>
		            <Col md="4">
		                <blockquote className="blockquote text-right">
		                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
		                    <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
		                </blockquote>
		            </Col>
		            <Col md="12" className="mt-4"></Col>
		            <Col md="4">
		                <blockquote className="blockquote">
		                    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
		                    <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
		                </blockquote>
		            </Col>
		            <Col md="4">
		                <blockquote className="blockquote text-center">
		                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
		                    <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
		                </blockquote>
		            </Col>
		            <Col md="4">
		                <blockquote className="blockquote text-right">
		                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
		                    <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
		                </blockquote>
		            </Col>
		        </Row>
		    </Container>
		</section>
		<section id="download" className="download text-center">
		    <Container>
		        <Row>
		            <Col>
		                <i className="fas fa-mobile-alt icon-item"></i>
		                <h2 className="section-heading">¡Descubre una manera eficiente de elaborar curriculum profesionales!</h2>
		                <p>¡Nuestra aplicación está disponible para cualquier dispositivo móvil! ¡Descárgalo ahora para comenzar!</p>
		                <div className="badges">
		                    <a className="badge-link" href="/assets/img/google-play-badge.svg" target="_blank" rel="noopener noreferrer"><Image src="/assets/img/google-play-badge.svg" alt="google_play_link" /></a>
		                    <a className="badge-link" href="/assets/img/app-store-badge.svg" target="_blank" rel="noopener noreferrer"><Image src="/assets/img/app-store-badge.svg" alt="app_store_link" /></a>
		                </div>
		            </Col>
		        </Row>
		    </Container>
		</section>
	</div>
	);
};