import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Grafico from './components/Grafico/Grafico'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Grafico/>
    </>
  )
}

export default App
