import { useEffect, useState } from 'react'
import Casilla from './components/Casilla.jsx'

const FILAS = 6
const COLUMNAS = 5
const PALABRAS = [
  'PERRO',
  'NUBE',
  'LUNA',
  'ROSA',
  'ARCO',
  'CIELO',
  'FUEGO',
  'MARCO',
  'SUELO',
  'RIVAL',
  'MUNDO',
  'LLAVE',
  'SOLAR',
  'NIEVE',
  'FLOTA',
  'BRISA',
  'CANTO',
  'HIELO',
  'VIAJE',
].filter((palabra) => palabra.length === COLUMNAS)

function palabraAleatoria(excepcion = '') {
  const disponibles = PALABRAS.filter((palabra) => palabra !== excepcion)
  const lista = disponibles.length > 0 ? disponibles : PALABRAS
  return lista[Math.floor(Math.random() * lista.length)]
}

function tableroVacio() {
  const tablero = []

  for (let f = 0; f < FILAS; f++) {
    tablero.push(Array(COLUMNAS).fill(''))
  }

  return tablero
}

function estadoDe(fila, columna, solucion) {
  const estado = Array(COLUMNAS).fill('ausente')
  const faltantes = {}

  for (let i = 0; i < COLUMNAS; i++) {
    if (fila[i] === solucion[i]) {
      estado[i] = 'correcta'
    } else {
      faltantes[solucion[i]] = (faltantes[solucion[i]] || 0) + 1
    }
  }

  for (let i = 0; i < COLUMNAS; i++) {
    if (estado[i] === 'correcta') continue

    const letra = fila[i]
    if (faltantes[letra] > 0) {
      estado[i] = 'presente'
      faltantes[letra] -= 1
    }
  }

  return estado[columna]
}

function App() {
  const [intentos, setIntentos] = useState(tableroVacio())
  const [filaActual, setFilaActual] = useState(0)
  const [solucion, setSolucion] = useState(() => palabraAleatoria())

  const ultimo = filaActual > 0 ? intentos[filaActual - 1].join('') : ''
  const ganada = ultimo === solucion
  const terminada = ganada || filaActual === FILAS
  

  useEffect(() => {
    document.querySelector('.casilla:enabled')?.focus()
  }, [filaActual])

  function cambiarLetra(f, c, evento) {
    const letra = evento.target.value.toUpperCase()

    if (!/^[A-ZÑ]?$/.test(letra)) return

    const copia = intentos.map((fila) => [...fila])
    copia[f][c] = letra
    setIntentos(copia)

    if (letra !== '') evento.target.nextElementSibling?.focus()
  }

  function comprobar(evento) {
    evento.preventDefault()
    if (terminada) return
    if (intentos[filaActual].includes('')) return

    setFilaActual(filaActual + 1)
  }

  function reiniciarPartida() {
    setIntentos(tableroVacio())
    setFilaActual(0)
    setSolucion((solucionActual) => palabraAleatoria(solucionActual))
  }

  return (
    <form className="juego" onSubmit={comprobar}>
      <h1>Wordle</h1>
      <div className="tablero">
        {intentos.map((fila, f) => (
          <div className="fila" key={f}>
            {fila.map((letra, c) => (
              <Casilla
                key={c}
                letra={letra}
                estado={f < filaActual ? estadoDe(fila, c, solucion) : ''}
                activa={f === filaActual && !terminada}
                onCambio={(evento) => cambiarLetra(f, c, evento)}
              />
            ))}
          </div>
        ))}
      </div>
      {terminada ? (
        <div>
          <p className="mensaje" role="status">
            {ganada
              ? '¡Enhorabuena, has acertado!'
              : `La palabra era ${solucion}`}
          </p>
          <button className="boton" type="button" onClick={reiniciarPartida}>
            Jugar otra vez
          </button>
        </div>
      ) : (
        <button className="boton" type="submit">
          Comprobar
        </button>
      )}
    </form>
  )
}

export default App
