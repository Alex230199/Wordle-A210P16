import { useEffect, useState } from 'react'
import Casilla from './components/Casilla.jsx'

const filas = 6
const columnas = 5
const palabras = ['PERRO', 'NUBE', 'LUNA', 'ROSA', 'ARCO', 'CIELO','FUEGO','MARCO','SUELO','RIVAL','MUNDO','LLAVE','SOLAR',
  'NIEVE','FLOTA','BRISA','CANTO','HIELO','VIAJE',]
  .filter((palabra) => palabra.length === columnas)

// Aqui empieza la mejora 2
function palabraAleatoria(excepcion = '') {

    const disponibles = palabras.filter((palabra) => palabra !== excepcion)

     const lista = disponibles.length > 0 ? disponibles : palabras

    return lista[Math.floor(Math.random() * lista.length)]

}
// Aqui termina la mejora 2

function tableroVacio() {

  const tablero = []

  for (let f = 0; f < filas; f++) {
    tablero.push(Array(columnas).fill(''))
  }

   return tablero

}

function estadoDe(fila, columna, solucion) {

  const estado = Array(columnas).fill('ausente')

  const faltantes = {}

  for (let i = 0; i < columnas; i++) {

    if (fila[i] === solucion[i]) {
        estado[i] = 'correcta'

    } else {
         faltantes[solucion[i]] = (faltantes[solucion[i]] || 0) + 1
    }

  }

  for (let i = 0; i < columnas; i++) {

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

    const ultimo = filaActual > 0 ? intentos[filaActual - 1].join('') : ''

    const ganada = ultimo === solucion

       const [solucion, setSolucion] = useState(() => palabraAleatoria())

        const [filaActual, setFilaActual] = useState(0)

    const terminada = ganada || filaActual === filas

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


// Aqui empieza la mejora 1
function reiniciarPartida() {

      setIntentos(tableroVacio())

     setFilaActual(0)

    setSolucion((solucionActual) => palabraAleatoria(solucionActual))

  }
// Aqui termina la mejora 1



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
                 onCambio={(evento) => cambiarLetra(f, c, evento)}/>
             )
            )
          }
           </div>
           )
          )
         }
       </div>
    {terminada ? (
         <div>
           <p className="mensaje" role="status">
             {ganada
              ? '¡Enhorabuena, has acertado!'
              : `La palabra era ${solucion}`}
          </p>
           <button className="boton" type="button" onClick={reiniciarPartida}>Jugar otra vez</button>
        </div>
      ) : (
        <button className="boton" type="submit">Comprobar</button>
      )}
    </form>
  )
}

export default App
