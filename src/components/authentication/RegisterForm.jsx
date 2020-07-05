import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// componentes
import { authenticationHandler } from '../helpers';
import validationMessages from '../helpers/validationMessages';
import { Spinner } from '../Spinner';

const RegisterForm = (props) => {
	let history = useHistory();

    return (
        <Formik
        initialValues={{ email: '', password: '', confirmPassword: '', termsAndConditions: false }}
        validationSchema={Yup.object({
            email: Yup.string()
                      .required(validationMessages.REQUIRED)
                      .email(validationMessages.EMAIL_NOT_VALID)
                      .max(100, validationMessages.MAX_LENGTH_100),
            password: Yup.string()
                         .required(validationMessages.REQUIRED)
                         .matches('^[a-zA-Z0-9ñÑ]*$', validationMessages.PASSWORD_NOT_VALID)
                         .min(6, validationMessages.MIN_LENGTH_6)
                         .max(100, validationMessages.MAX_LENGTH_100),
            confirmPassword: Yup.string()
            					.required(validationMessages.REQUIRED)
            					.oneOf([Yup.ref('password')], validationMessages.COMPARE_PASSWORD),
            termsAndConditions: Yup.boolean()
            				       .oneOf([true], validationMessages.TERMS_AND_CONDITIONS)
        })}
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(async () => {
                var result = await authenticationHandler.register(values.email, values.password, values.confirmPassword, values.termsAndConditions);
                //alert(JSON.stringify(values, null, 2));
                setSubmitting(false);

                if(result)
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
                            <Field type="checkbox" id="terms_and_conditions" name="termsAndConditions" className="custom-control-input"/>
                            <label className="custom-control-label" htmlFor="terms_and_conditions">He leído y estoy de acuerdo con los <a href="/">términos de servicio</a>.</label>
                            <ErrorMessage name="termsAndConditions" component="div" className="text-danger"></ErrorMessage>
                        </div>
                    </div>
                </fieldset>
                <Row className="form-group">
                    <Col md="6">
                        <Button type="submit" variant="default" disabled={isSubmitting}>Registrarse</Button>
                    </Col>
                </Row>
                <Spinner loading={isSubmitting}></Spinner>
            </Form>
        )}
        </Formik>
    );
}

export default RegisterForm;