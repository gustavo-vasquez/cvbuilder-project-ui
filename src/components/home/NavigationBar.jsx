import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Image } from 'react-bootstrap';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import cvbuilderIcon from '../../assets/img/cvbuilder_icon.png';

class NavigationBar extends React.Component {
	render() {
		return (
			<Navbar bg="light" expand="lg" id="mainNav" className="fixed-top navbar-shrink">
		        <Container className="justify-content-center">
		            <Navbar.Brand as={Link} to="/" title="Ir a página principal"><Image src={cvbuilderIcon} width="24"></Image> CVBuilder</Navbar.Brand>
		            <Navbar.Toggle className="navbar-toggler-right" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
		                <Navbar.Brand className="align-middle"><Image src={cvbuilderIcon} width="24"></Image> CVBuilder <i className="fas fa-caret-down"></i></Navbar.Brand>
		                <Button as={Link} to="/account/login" variant="outline-default" size="sm" className="btn-myaccount">Acceder <i className="fas fa-sign-in-alt"></i></Button>
		            </Navbar.Toggle>
		            <Navbar.Collapse id="navbarResponsive">
		                <hr />
		                <NavbarLinks pathUrl={window.location.pathname}></NavbarLinks>
		                <Button as={Link} to="/account/login" variant="outline-default" size="sm" className="btn-myaccount">Acceder <i className="fas fa-sign-in-alt"></i></Button>
		            </Navbar.Collapse>
		        </Container>
		    </Navbar>
		);
	}
}

export default withRouter(NavigationBar);

function NavbarLinks(props) {
	if(props.pathUrl === '/') {
		return (
			<Nav as="ul" className="navbar-nav ml-auto text-center">
                <Nav.Item as="li">
                    <Nav.Link as={AnchorLink} href="#landing_page" className="nav-link">Comenzar</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link as={AnchorLink} href="#features" className="nav-link">Características</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link as={AnchorLink} href="#templates" className="nav-link">Plantillas</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link as={AnchorLink} href="#testimonials" className="nav-link">Testimonios</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link as={AnchorLink} href="#download" className="nav-link">Descargas</Nav.Link>
                </Nav.Item>
            </Nav>
		);
	}
	else {
		return (
			<Nav as="ul" className="navbar-nav ml-auto text-center">
                <Nav.Item as="li">
                    <Nav.Link href="/#landing_page" className="nav-link">Comenzar</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href="/#features" className="nav-link">Características</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href="/#templates" className="nav-link">Plantillas</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href="/#testimonials" className="nav-link">Testimonios</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link href="/#download" className="nav-link">Descargas</Nav.Link>
                </Nav.Item>
            </Nav>
		);
	}
}