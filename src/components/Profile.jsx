import React from 'react'
import { useUserAuth } from '../context/AuthContext'
import Navi from './Navi';
import { Container } from 'react-bootstrap'

function Profile() {

    const { user } = useUserAuth();

  return (
    <>
        <Navi />
        <Container>
            <h3>Profile</h3>
            <hr />
            <p>Email : {user.email}</p>
            <p>UID : {user.uid}</p>
        </Container>
    </>
  )
}

export default Profile