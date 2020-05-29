import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Container, Button, Image, Dropdown } from 'react-bootstrap';
import NavBarLinks from './NavBarLinks';

import cvbuilderIcon from '../../assets/img/cvbuilder_icon.png';

class NavBar extends React.Component {
	render() {
        const { loginData } = this.props;

		return (
			<Navbar expand="lg" id="mainNav" className="fixed-top navbar-shrink">
		        <Container className="justify-content-center">
		            <Navbar.Brand as={Link} to="/" title="Ir a página principal"><Image src={cvbuilderIcon} width="24"></Image> CVBuilder</Navbar.Brand>
		            <Navbar.Toggle className="navbar-toggler-right" aria-controls="navbarResponsive">
		                <Navbar.Brand className="align-middle"><Image src={cvbuilderIcon} width="24"></Image> CVBuilder <i className="fas fa-caret-down"></i></Navbar.Brand>
		            </Navbar.Toggle>
		            <Navbar.Collapse id="navbarResponsive">
		                <hr />
		                <NavBarLinks pathUrl={window.location.pathname}></NavBarLinks>
		            </Navbar.Collapse>
                        {loginData != null ?
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-default" size="sm" className="btn-myaccount" title="Haz clic para ver las opciones.">Mi cuenta</Dropdown.Toggle>
                            <Dropdown.Menu alignRight={true}>
                                <Dropdown.Item href="/" className="disabled">
                                    <span className="d-block">{loginData.email}</span>
                                    <span className="d-block">{loginData.loginAt}</span>
                                </Dropdown.Item>
                                <Dropdown.Divider/>
                                <Dropdown.Item as={Link} to="/curriculum/build"><i className="fas fa-marker"></i> Editar curriculum</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/curriculum/finished"><i className="fas fa-print"></i> Imprimir/guardar como PDF</Dropdown.Item>
                                <Dropdown.Divider/>
                                <Dropdown.Item href="/account/logoff"><i className="fas fa-sign-out-alt"></i> Salir</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        : <Button as={Link} to="/account/signin" variant="outline-default" size="sm" className="btn-myaccount">Acceder <i className="fas fa-sign-in-alt"></i></Button>}
		        </Container>
		    </Navbar>
		);
	}
}

export const NavigationBar = withRouter(NavBar);