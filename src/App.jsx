import { useState } from 'react'
import Saludo from './Saludo.jsx'
import './App.css'

function App() {
  return (
    <main className="lesson">
      <h1>Propiedades (props)</h1>
      <div className="saludo-list">
        <Saludo nombre="Ana" />
        <Saludo nombre="Luis" />
      </div>
      <Contador />
    </main>
  )
}

export default App

function Contador() {
  const [cuenta, setCuenta] = useState(0)

  return (
    <button
      className="counter"
      type="button"
      onClick={() => setCuenta(cuenta + 1)}
    >
      Has pulsado {cuenta} veces
    </button>
  )
}

export { Contador }

/*

function Saludo({ nombre }) {
  return <h2 className="saludo">Hola, {nombre}</h2>
}
 
function App() {
  return (
    <>
      <Saludo nombre="Ana" />
      <Saludo nombre="Luis" />
      <Saludo nombre="Belén" />
    </>
  )
}
 
export default App

 
import { useState } from 'react'
 
function Contador() {
  const [cuenta, setCuenta] = useState(0)
 
  return (
    <button onClick={() => setCuenta(cuenta + 1)}>
      Has pulsado {cuenta} veces
    </button>
  )
}
 
export default Contador
*/