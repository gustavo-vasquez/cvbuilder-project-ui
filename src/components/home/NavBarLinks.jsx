import React from 'react';
import { Nav } from 'react-bootstrap';
import AnchorLink from 'react-anchor-link-smooth-scroll';

export default function NavBarLinks(props) {
    let asProp, navLinks = {
        landingPage: "#landing_page",
        features: "#features",
        templates: "#templates",
        testimonials: "#testimonials",
        download: "#download"
    }

    if(props.pathUrl === '/')
        asProp = AnchorLink;
    else {
        asProp = undefined;
        for(let key in navLinks)
            navLinks[key] = "/" + navLinks[key];
    }

    return (
        <Nav as="ul" className="navbar-nav mx-auto text-center">
            <Nav.Item as="li">
                <Nav.Link as={asProp} href={navLinks.landingPage} className="nav-link">Comenzar</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link as={asProp} href={navLinks.features} className="nav-link">Características</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link as={asProp} href={navLinks.templates} className="nav-link">Plantillas</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link as={asProp} href={navLinks.testimonials} className="nav-link">Testimonios</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link as={asProp} href={navLinks.download} className="nav-link">Descargas</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}