import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

// componentes
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const SignIn = (props) => {
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
                                    <LoginForm returnUrl={from} userLogged={props.userLogged}></LoginForm>
                                </Card.Body>
                            </Card>
                            <Card border="success" className="mb-3">
                                <Card.Body>
                                    <form action="Account/ExternalLogin?returnUrl=hola">
                                        <div className="connect-with row">
                                            <div className="col-lg-5">
                                                <p className="mt-2">Conéctate con:</p>
                                            </div>
                                            <div className="col-lg-7">
                                                <a href="/" title="Cuenta de Google"><i className="fab fa-google"></i></a>
                                                <a href="/" title="Cuenta Microsoft"><i className="fab fa-windows"></i></a>
                                                <a href="/" title="Cuenta de LinkedIn"><i className="fab fa-linkedin"></i></a>
                                                <a href="/" title="Cuenta de Github"><i className="fab fa-github"></i></a>
                                            </div>
                                        </div>
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