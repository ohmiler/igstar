import React from 'react'
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/AuthContext';

function Navi() {

    const navigate = useNavigate();
    const { user, logOut } = useUserAuth();

    const gotoHome = () => {
        navigate('/')
    }

    const gotoLogin = () => {
        navigate('/login')
    }

    const gotoRegister = () => {
        navigate('/register')
    }

    const gotoProfile = () => {
      navigate('/profile')
    }
    
    const gotoUpload = () => {
      navigate('/upload')
    }

    const handleLogout = async () => {
      try {
        await logOut();
        navigate("/");
      } catch(err) {
        console.log(err.message);
      }
    }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand onClick={gotoHome}>IGStar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                <Button onClick={gotoProfile} variant='secondary' className='m-1'>Profile</Button>
                <Button onClick={gotoUpload} variant='success' className='m-1'>Upload</Button>
                <Button onClick={handleLogout} variant='danger' className='m-1'>Logout</Button>
              </>
            ) : (
              <>
                <Button onClick={gotoLogin} variant='outline-secondary' className='m-1'>Login</Button>
                <Button onClick={gotoRegister} variant='success' className='m-1'>Register</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navi