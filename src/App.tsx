import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import CherryworksButton from './cljstest/cherry.jsx'
import Header from "./frontend/header"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header></Header>
      <CherryworksButton x={count}></CherryworksButton>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

export default App
