import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Centi</h1>
      <p className="read-the-docs">
        All in one financial solutions
      </p>
    </>
  )
}

export default App
