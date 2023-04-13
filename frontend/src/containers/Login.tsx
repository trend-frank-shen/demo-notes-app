import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Auth } from 'aws-amplify';
import './Login.css';
import { useAppContext } from '../lib/contextLib';
import { useNavigate } from 'react-router-dom';
import LoaderButton from '../components/LoaderButton';
import { onError } from '../lib/errorLib';
import { useFormFields } from '../lib/hooksLib';
import { Link } from 'react-router-dom';

export default function Login() {
  const nav = useNavigate();
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: '',
  });
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const result = await Auth.signIn(fields.email, fields.password);
      console.log('result :>> ', result);
      userHasAuthenticated(true);
      nav('/');
    } catch (e: any) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <div className="d-grid gap-2">
        <Link to="/login/reset">Forgot password?</Link>
          <LoaderButton
            block="true"
            size="lg"
            type="submit"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Login
          </LoaderButton>
        </div>
      </Form>
    </div>
  );
}
