import React from 'react';
import { Nav } from 'react-bootstrap';
import AnchorLink from 'react-anchor-link-smooth-scroll';

export default function NavBarLinks(props) {
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