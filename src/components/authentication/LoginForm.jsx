import React from 'react';
import { useHistory } from 'react-router-dom';
//import { Alert } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// componentes
//import { authenticationHandler } from './handler';
import { Spinner } from '../Spinner';

const LoginForm = (props) => {
    let history = useHistory();

    return (
        <Formik
        initialValues={{ loginEmail: '', loginPassword: '' }}
        validationSchema={Yup.object({
            loginEmail: Yup.string()
                           .required('Campo obligatorio.'),
            loginPassword: Yup.string()
                              .required('Campo obligatorio.')
        })}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                //let result = authenticationHandler.login("username", "password");
                //alert(JSON.stringify(values, null, 2));
                let dateNow = new Date();
                let formattedDate = dateNow.getDate() + "/" + (dateNow.getMonth() + 1) + "/" + dateNow.getFullYear() + " " + checkZero(dateNow.getHours()) + ":" + checkZero(dateNow.getMinutes()) + ":" + checkZero(dateNow.getSeconds());
                var loginData = { email: 'cosme.fulanito@gmail.com', loginAt: formattedDate };
                props.userLogged(loginData);
                setSubmitting(false);
                history.replace(props.returnUrl.pathname); // al tocar atrás en el navegador no vuelve a la página de login.
            }, 400);
        }}>
        {({ isSubmitting }) => (
            <Form id="user_login_form">
                <fieldset>
                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <Field type="text" id="login_email" name="loginEmail" className="form-control" placeholder="Correo electrónico..."/>
                        <ErrorMessage name="loginEmail" component="div" className="text-danger"></ErrorMessage>
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <Field type="password" id="login_password" name="loginPassword" className="form-control" placeholder="Contraseña..."/>
                        <ErrorMessage name="loginPassword" component="div" className="text-danger"></ErrorMessage>
                    </div>
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" id="login_remember_me" className="custom-control-input"/>
                            <label className="custom-control-label" htmlFor="login_remember_me">Recordarme</label>
                        </div>
                    </div>
                </fieldset>
                <div className="form-group row">
                    <div className="col-lg-5">
                        <button type="submit" className="btn btn-default" disabled={isSubmitting}><Spinner loading={isSubmitting} width="20"></Spinner> Ingresar</button>
                    </div>
                    <div className="col-lg-7 text-right">
                        <a href="/">¿Has olvidado tu contraseña?</a>
                    </div>
                </div>
                {/*<Alert className="mb-0" variant="danger">Usuario y/o contraseña incorrecta.</Alert>*/}
            </Form>
        )}
        </Formik>
    );
}

export default LoginForm;

function checkZero(data) {
    if(data < 10) {
        data = "0" + data;
    }

    return data;
}