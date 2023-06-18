import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Alert } from 'react-bootstrap';
import { Container } from 'react-bootstrap'

// Components
import Navi from './components/Navi'
import Posts from './components/Posts'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navi />
      <Container>
        <Posts />
      </Container>
    </>
  )
}

export default App
