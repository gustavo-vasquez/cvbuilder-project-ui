import React from 'react';
import { useLocation } from 'react-router-dom';

// componentes
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const SignIn = (props) => {
    //render() {
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

        return (
            <section className="sign-in-account">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card border-success mb-3">
                                <div className="card-body">
                                    <h4 className="card-title mb-4">Accede a tu cuenta.</h4>
                                    <LoginForm returnUrl={from} userLogged={props.userLogged}></LoginForm>
                                </div>
                            </div>
                            <div className="card border-success mb-3">
                                <div className="card-body">
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
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card border-success mb-3">
                                <div className="card-body">
                                    <h4 className="card-title mb-4">¿Eres nuevo? Regístrate ahora para guardar los cambios de tu CV permanentemente.</h4>
                                    <RegisterForm returnUrl={from}></RegisterForm>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    //}
}

export { SignIn };