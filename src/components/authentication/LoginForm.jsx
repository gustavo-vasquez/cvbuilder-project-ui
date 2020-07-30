import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// componentes
import { authenticationHandler } from '../helpers';
import validationMessages from '../helpers/validationMessages';
import { CircleSpinner } from '../Spinners';

const LoginForm = (props) => {
    let history = useHistory();

    return (
        <Formik
        initialValues={{ loginEmail: '', loginPassword: '' }}
        validationSchema={Yup.object({
            loginEmail: Yup.string()
                           .required(validationMessages.REQUIRED),
            loginPassword: Yup.string()
                              .required(validationMessages.REQUIRED)
        })}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(async () => {
                var result = await authenticationHandler.login(values.loginEmail,values.loginPassword);
                setSubmitting(false);

                if(result)
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
                            <label className="custom-control-label" htmlFor="login_remember_me">Mantener conectado</label>
                        </div>
                    </div>
                </fieldset>
                <Row className="form-group">
                    <Col md="5">
                        <Button type="submit" variant="default" disabled={isSubmitting}>Ingresar</Button>
                    </Col>
                    <Col md="7" className="text-right">
                        <a href="/">¿Has olvidado tu contraseña?</a>
                    </Col>
                </Row>
                <CircleSpinner loading={isSubmitting}></CircleSpinner>
            </Form>
        )}
        </Formik>
    );
}

export default LoginForm;