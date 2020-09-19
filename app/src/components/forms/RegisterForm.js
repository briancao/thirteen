import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import Button from '../common/Button';
import FormLayout, {
  FormMessage,
  FormInputError,
  FormRow,
  FormRowButton,
} from '../layouts/FormLayout';

const validate = ({ username, email, password }) => {
  const errors = {};

  if (!username) {
    errors.username = 'Required';
  }

  if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }

  if (!password) {
    errors.password = 'Required';
  }

  return errors;
};

function RegisterForm({ onRegister, className }) {
  const [registerError, setRegisterError] = useState();
  const [registerSuccess, setRegisterSuccess] = useState(false);

  async function handleSubmit(values, { setSubmitting }) {
    setRegisterError(null);

    await axios
      .post('/api/user/register', values)
      .then((res) => {
        setRegisterSuccess('Account created successfully!');
        onRegister(true);
      })
      .catch((e) => {
        setRegisterError(e.response.data);
      });

    setSubmitting(false);
  }

  return (
    <FormLayout className={className}>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
        }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <fieldset disabled={registerSuccess}>
              {registerSuccess && (
                <FormMessage block variant="success" disableDismiss>
                  {registerSuccess}
                </FormMessage>
              )}
              {registerError && (
                <FormMessage block onDismiss={() => setRegisterError('')}>
                  {registerError}
                </FormMessage>
              )}
              <FormRow block>
                <label htmlFor="username">Username</label>
                <Field name="username" type="text" disabled={registerSuccess} />
                <FormInputError name="username" component="div" />
              </FormRow>
              <FormRow block>
                <label htmlFor="email">
                  Email <span className="style.small-label">(optional)</span>
                </label>
                <Field name="email" type="email" />
                <FormInputError name="email" component="div" />
              </FormRow>
              <FormRow block>
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" />
                <FormInputError name="password" component="div" />
              </FormRow>
              <FormRowButton block>
                <Button type="submit">Register</Button>
              </FormRowButton>
            </fieldset>
          </Form>
        )}
      </Formik>
    </FormLayout>
  );
}

export default RegisterForm;
