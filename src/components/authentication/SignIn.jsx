import React from 'react'

class SignIn extends React.Component {
    componentDidMount() {
        window.scroll(0,0);
    }

    render() {
        return (
            <section className="sign-in-account">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card border-success mb-3">
                                <div className="card-body">
                                    <h4 className="card-title mb-4">Accede a tu cuenta.</h4>
                                    <form action="Account/Login" method="Post" id = "user_login_form">
                                        <fieldset>
                                            <div className="form-group">
                                                <label>Correo electrónico</label>
                                                <input type="text" className="form-control" placeholder="Correo electrónico" autoFocus/>
                                            </div>
                                            <div className="form-group">
                                                <label>Contraseña</label>
                                                <input type="password" className="form-control" placeholder="Contraseña"/>
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" id="LoginModel_RememberMe" className="custom-control-input"/>
                                                    <label className="custom-control-label" htmlFor="LoginModel_RememberMe">Recordarme</label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <div className="form-group row">
                                            <div className="col-lg-4">
                                                <button type="submit" className="btn btn-default">Ingresar</button>
                                            </div>
                                            <div className="col-lg-8 text-right">
                                                <a href="/">¿Has olvidado tu contraseña?</a>
                                            </div>
                                        </div>
                                    </form>
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
                                    <form action="Account/Register" method="Post" id="user_register_form">
                                        <fieldset>
                                            <div className="form-group">
                                                <label>Correo electrónico</label>
                                                <input type="text" className="form-control" placeholder="Correo electrónico"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Contraseña</label>
                                                <input type="password" className="form-control" placeholder="Contraseña"/>
                                                <small className="form-text text-muted">Sólo números y letras, mínimo 6 caracteres.</small>
                                            </div>
                                            <div className="form-group">
                                                <label>Confirmar contraseña</label>
                                                <input type="password" className="form-control" placeholder="Confirmar contraseña"/>
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" id="RegisterModel_TermsAndServices" className="custom-control-input"/>
                                                    <label className="custom-control-label" htmlFor="RegisterModel_TermsAndServices">He leído y estoy de acuerdo con los <a href="/">términos de servicio</a>.</label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <div className="form-group row">
                                            <div className="col-lg-4">
                                                <button type="submit" className="btn btn-default">Registrarse</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default SignIn;