import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { setAxiosAuth, setBrowserCookie } from '../../utils/axiosConfig';
import Button from '../common/Button';
import FormLayout, {
  FormMessage,
  FormInputError,
  FormRow,
  FormRowButton,
} from '../layouts/FormLayout';

const validate = ({ username, password }) => {
  const errors = {};

  if (!username) {
    errors.username = 'Required';
  }

  if (!password) {
    errors.password = 'Required';
  }

  return errors;
};

export default function LoginForm({ className }) {
  const [loginError, setLoginError] = useState();

  async function handleSubmit(values, { setSubmitting }) {
    setLoginError('');

    await axios
      .post('/api/user/login', values)
      .then((res) => {
        setLoginError('');

        const token = res.headers['auth-token'];

        setAxiosAuth(token);
        setBrowserCookie(token);
      })
      .catch((e) => {
        if (e?.response?.status === 400) {
          setLoginError('Incorrect username or password.');
        } else {
          setLoginError('Something went wrong!');
        }
      });

    setSubmitting(false);
  }

  return (
    <FormLayout className={className}>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            {loginError && (
              <FormMessage block onDismiss={() => setLoginError('')}>
                {loginError}
              </FormMessage>
            )}
            <FormRow block>
              <label htmlFor="username">Login</label>
              <Field name="username" type="text" />
              <FormInputError name="username" component="div" />
            </FormRow>
            <FormRow block>
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <FormInputError name="password" component="div" />
            </FormRow>
            <FormRowButton block>
              <Button type="submit">Login</Button>
            </FormRowButton>
          </Form>
        )}
      </Formik>
    </FormLayout>
  );
}
