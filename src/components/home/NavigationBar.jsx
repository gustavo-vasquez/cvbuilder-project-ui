import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import AnchorLink from 'react-anchor-link-smooth-scroll';

class NavigationBar extends React.Component {
	render() {
		return (
			<Navbar bg="light" expand="lg" id="mainNav" className="fixed-top navbar-shrink">
		        <Container className="justify-content-center">
		            <Navbar.Brand href="/" title="Ir a página principal"><i className="fas fa-pencil-ruler"></i> CVBuilder</Navbar.Brand>
		            <Navbar.Toggle className="navbar-toggler-right" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
		                <Navbar.Brand className="navbar-brand align-middle"><i className="fas fa-pencil-ruler"></i> CVBuilder <i className="fas fa-caret-down"></i></Navbar.Brand>
		                <Button variant="outline-default" size="sm" as="span" className="btn-myaccount">Acceder <i className="fas fa-sign-in-alt"></i></Button>
		            </Navbar.Toggle>
		            <Navbar.Collapse id="navbarResponsive">
		                <hr />
		                <Nav as="ul" className="navbar-nav ml-auto text-center">
		                    <Nav.Item as="li">
		                        <AnchorLink href="#landing_page" className="nav-link">Comenzar</AnchorLink>
		                    </Nav.Item>
		                    <Nav.Item as="li">
		                        <AnchorLink href="#features" className="nav-link">Características</AnchorLink>
		                    </Nav.Item>
		                    <Nav.Item as="li">
		                        <AnchorLink href="#templates" className="nav-link">Plantillas</AnchorLink>
		                    </Nav.Item>
		                    <Nav.Item as="li">
		                        <AnchorLink href="#testimonials" className="nav-link">Testimonios</AnchorLink>
		                    </Nav.Item>
		                    <Nav.Item as="li">
		                        <AnchorLink href="#download" className="nav-link">Descargas</AnchorLink>
		                    </Nav.Item>
		                </Nav>
		                <Button href="/" variant="outline-default" size="sm" className="btn-myaccount">Acceder <i className="fas fa-sign-in-alt"></i></Button>
		            </Navbar.Collapse>
		        </Container>
		    </Navbar>
		);
	}
}

export default NavigationBar;