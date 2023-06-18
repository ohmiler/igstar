import React, { useState } from 'react'
import { Button, Form, Container, Alert } from "react-bootstrap";
import Navi from './Navi'
import { useUserAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch(err) {
      setError(err.message);
    }
  }

  return (
    <>
        <Navi />
        <Container>
          {error && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={handleSubmit} className="mt-3">
            <h3>Login Page</h3>
            <hr />
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}  placeholder="Password" />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default Login