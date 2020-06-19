import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

// componentes
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const SignIn = (props) => {
    useEffect(() => {
      document.title = "Acceder - CVBuilder";
    }, []);
    //render() {
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

        return (
            <section className="sign-in-account">
                <Container>
                    <Row>
                        <Col md={6}>
                            <Card border="success" className="mb-3">
                                <Card.Body>
                                    <Card.Title className="mb-4">Accede a tu cuenta.</Card.Title>
                                    <LoginForm returnUrl={from}></LoginForm>
                                </Card.Body>
                            </Card>
                            <Card border="success" className="mb-3">
                                <Card.Body>
                                    <form action="Account/ExternalLogin?returnUrl=hola">
                                        <Row className="connect-with">
                                            <Col md={5}>
                                                <p className="mt-2">Conéctate con:</p>
                                            </Col>
                                            <Col md={7}>
                                                <Link to="/" title="Cuenta de Google"><i className="fab fa-google"></i></Link>
                                                <Link to="/" title="Cuenta Microsoft"><i className="fab fa-windows"></i></Link>
                                                <Link to="/" title="Cuenta de LinkedIn"><i className="fab fa-linkedin"></i></Link>
                                                <Link to="/" title="Cuenta de Github"><i className="fab fa-github"></i></Link>
                                            </Col>
                                        </Row>
                                    </form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card border="success" className="mb-3">
                                <Card.Body>
                                    <Card.Title className="mb-4">¿Eres nuevo? Regístrate ahora para guardar los cambios de tu CV permanentemente.</Card.Title>
                                    <RegisterForm returnUrl={from}></RegisterForm>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    //}
}

export { SignIn };