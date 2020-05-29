import React from 'react';
import { useHistory } from 'react-router-dom';
//import { Alert } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// componentes
//import { authenticationHandler } from './handler';
import { Spinner } from '../Spinner';

const RegisterForm = (props) => {
	let history = useHistory();

    return (
        <Formik
        initialValues={{ email: '', password: '', confirmPassword: '', acceptTerms: false }}
        validationSchema={Yup.object({
            email: Yup.string()
                      .required('Campo requerido.')
                      .email('Correo no válido.')
                      .max(100, 'Máximo 100 caracteres.'),
            password: Yup.string()
                         .required('Campo requerido.')
                         .matches('^[a-zA-Z0-9ñÑ]*$', 'Caracteres especiales no permitidos.')
                         .min(6, 'Mínimo 6 caracteres.')
                         .max(100, 'Máximo 100 caracteres.'),
            confirmPassword: Yup.string()
            					.required('Campo requerido.')
            					.oneOf([Yup.ref('password')], 'Las contraseñas no coinciden.'),
            acceptTerms: Yup.boolean()
            				.oneOf([true], "Debes aceptar los términos para continuar."),
        })}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                //let result = authenticationHandler.login("username", "password");
                //alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                history.replace(props.returnUrl.pathname); // al tocar atrás en el navegador no vuelve a la página de login.
            }, 400);
        }}>
        {({ isSubmitting }) => (
            <Form id="user_register_form">
                <fieldset>
                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <Field type="text" id="email" name="email" className="form-control" placeholder="Correo electrónico..."/>
                        <ErrorMessage name="email" component="div" className="text-danger"></ErrorMessage>
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <Field type="password" id="password" name="password" className="form-control" placeholder="Contraseña..."/>
                        <small className="form-text text-muted">Sólo números y letras, mínimo 6 caracteres.</small>
                        <ErrorMessage name="password" component="div" className="text-danger"></ErrorMessage>
                    </div>
                    <div className="form-group">
                        <label>Confirmar contraseña</label>
                        <Field type="password" id="confirm_password" name="confirmPassword" className="form-control" placeholder="Confirmar contraseña..."/>
                        <ErrorMessage name="confirmPassword" component="div" className="text-danger"></ErrorMessage>
                    </div>
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <Field type="checkbox" id="accept_terms" name="acceptTerms" className="custom-control-input"/>
                            <label className="custom-control-label" htmlFor="accept_terms">He leído y estoy de acuerdo con los <a href="/">términos de servicio</a>.</label>
                            <ErrorMessage name="acceptTerms" component="div" className="text-danger"></ErrorMessage>
                        </div>
                    </div>
                </fieldset>
                <div className="form-group row">
                    <div className="col-lg-6">
                        <button type="submit" className="btn btn-default" disabled={isSubmitting}><Spinner loading={isSubmitting} width="20"></Spinner> Registrarse</button>
                    </div>
                </div>
                {/*<Alert className="mb-0" variant="danger">Usuario y/o contraseña incorrecta.</Alert>*/}
            </Form>
        )}
        </Formik>
    );
}

export default RegisterForm;