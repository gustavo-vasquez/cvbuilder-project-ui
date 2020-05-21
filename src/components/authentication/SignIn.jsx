import React from 'react'

class SignIn extends React.Component {
    render() {
        return (
            <section class="sign-in-account">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="card border-success mb-3">
                                <div class="card-body">
                                    <h4 class="card-title mb-4">Accede a tu cuenta.</h4>
                                    <form action="Account/Login" method="Post" id = "user_login_form">
                                        <fieldset>
                                            <div class="form-group">
                                                <label>Correo electrónico</label>
                                                <input type="text" class="form-control" placeholder="Correo electrónico"/>
                                            </div>
                                            <div class="form-group">
                                                <label>Contraseña</label>
                                                <input type="password" class="form-control" placeholder="Contraseña"/>
                                            </div>
                                            <div class="form-group">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" id="LoginModel_RememberMe" class="custom-control-input"/>
                                                    <label class="custom-control-label" for="LoginModel_RememberMe">Recordarme</label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <div class="form-group row">
                                            <div class="col-lg-4">
                                                <button type="submit" class="btn btn-default">Ingresar</button>
                                            </div>
                                            <div class="col-lg-8 text-right">
                                                <a href="/">¿Has olvidado tu contraseña?</a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="card border-success mb-3">
                                <div class="card-body">
                                    <form action="Account/ExternalLogin?returnUrl=hola">
                                        <div class="connect-with row">
                                            <div class="col-lg-5">
                                                <p class="mt-2">Conéctate con:</p>
                                            </div>
                                            <div class="col-lg-7">
                                                <a href="/" title="Cuenta de Google"><i class="fab fa-google"></i></a>
                                                <a href="/" title="Cuenta Microsoft"><i class="fab fa-windows"></i></a>
                                                <a href="/" title="Cuenta de LinkedIn"><i class="fab fa-linkedin"></i></a>
                                                <a href="/" title="Cuenta de Github"><i class="fab fa-github"></i></a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="card border-success mb-3">
                                <div class="card-body">
                                    <h4 class="card-title mb-4">¿Eres nuevo? Regístrate ahora para guardar los cambios de tu CV permanentemente.</h4>
                                    <form action="Account/Register" method="Post" id="user_register_form">
                                        <fieldset>
                                            <div class="form-group">
                                                <label>Correo electrónico</label>
                                                <input type="text" class="form-control" placeholder="Correo electrónico"/>
                                            </div>
                                            <div class="form-group">
                                                <label>Contraseña</label>
                                                <input type="password" class="form-control" placeholder="Contraseña"/>
                                                <small class="form-text text-muted">Sólo números y letras, mínimo 6 caracteres.</small>
                                            </div>
                                            <div class="form-group">
                                                <label>Confirmar contraseña</label>
                                                <input type="password" class="form-control" placeholder="Confirmar contraseña"/>
                                            </div>
                                            <div class="form-group">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" id="RegisterModel_TermsAndServices" class="custom-control-input"/>
                                                    <label class="custom-control-label" for="RegisterModel_TermsAndServices">He leído y estoy de acuerdo con los <a href="/">términos de servicio</a>.</label>
                                                </div>
                                            </div>
                                        </fieldset>
                                        <div class="form-group row">
                                            <div class="col-lg-4">
                                                <button type="submit" class="btn btn-default">Registrarse</button>
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