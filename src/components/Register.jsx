import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase/firebase'

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

// Components
import Navi from "./Navi";

function Register() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [photoURL, setphotoURL] = useState("https://fakeimg.pl/150x150?text=User");

    const onSubmit = async (e) => {
        e.preventDefault();

        await createUserWithEmailAndPassword(auth, email, password)
             .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                  displayName: displayName,
                  photoURL: photoURL
                })
                console.log(user);
                navigate('/login')
             })
             .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
             })
    }

  return (
    <>
      <Navi />
      <Container>
        <Form className="mt-3">
            <h3>Register Page</h3>
            <hr />

            <Form.Group className="mb-3" controlId="displayname">
              <Form.Label>Display Name</Form.Label>
              <Form.Control type="text" required value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Enter display name" />
            </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </Form.Group>

          <Button variant="success" type="submit" onClick={onSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Register;
