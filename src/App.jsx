import { useEffect, useState } from 'react' // Importa hooks para manejar estado y efectos en React.
import Casilla from './components/Casilla.jsx' // Importa el componente que representa cada casilla.
import Teclado from './components/Teclado.jsx' // Importa el teclado en pantalla.
import { estadoDe } from './juego.js' // Importa la funcion que determina el estado de una letra.

const filas = 6 // Establece la cantidad maxima de intentos.
const columnas = 5 // Establece la cantidad de letras por palabra.
const letrasTeclado = 'QWERTYUIOPASDFGHJKLÑZXCVBNM'.split('') // Crea un arreglo de letras para el teclado en pantalla.
const palabras = ['PERRO', 'NUBE', 'LUNA', 'ROSA', 'ARCO', 'CIELO','FUEGO','MARCO','SUELO','RIVAL','MUNDO','LLAVE','SOLAR', // Inicia el arreglo con las palabras candidatas.
	'NIEVE','FLOTA','BRISA','CANTO','HIELO','VIAJE',] // Anade el resto de las palabras candidatas.
	.filter((palabra) => palabra.length === columnas) // Descarta las palabras que no tienen cinco letras.

// Aqui empieza la mejora 2
function palabraAleatoria(excepcion = '') { // Declara la funcion que elige una palabra al azar.

		const disponibles = palabras.filter((palabra) => palabra !== excepcion) // Excluye la palabra indicada, normalmente la anterior.

		 const lista = disponibles.length > 0 ? disponibles : palabras // Usa las palabras restantes o toda la lista si no quedan.

		return lista[Math.floor(Math.random() * lista.length)] // Devuelve una palabra elegida aleatoriamente.

} // Cierra la funcion que selecciona la palabra aleatoria.
// Aqui termina la mejora 2

function tableroVacio() { // Declara la funcion que prepara un tablero limpio.

	const tablero = [] // Crea el arreglo donde se guardaran las filas.

	for (let f = 0; f < filas; f++) { // Repite la creacion de filas hasta alcanzar el limite de intentos.
		tablero.push(Array(columnas).fill('')) // Agrega una fila con todas sus casillas vacias.
	} // Cierra el bucle que crea las filas.

	 return tablero // Devuelve el tablero vacio.

} // Cierra la funcion que crea el tablero.

function App() { // Declara el componente principal del juego.

			const [intentos, setIntentos] = useState(tableroVacio()) // Guarda las letras escritas en el tablero.
			const [solucion, setSolucion] = useState(() => palabraAleatoria()) // Selecciona y guarda la palabra secreta.
			const [filaActual, setFilaActual] = useState(0) // Guarda el indice de la fila que se esta completando.

		 const ultimo = filaActual > 0 ? intentos[filaActual - 1].join('') : '' // Forma la ultima palabra enviada o devuelve una cadena vacia.

		 const ganada = ultimo === solucion // Comprueba si la ultima palabra coincide con la solucion.

		// Aqui empieza la tarea 3
		const [aviso, setAviso] = useState('') // Guarda el mensaje que se muestra cuando falta completar el intento.
		// Aqui termina la tarea 3

		const terminada = ganada || filaActual === filas // Indica si el jugador gano o se quedo sin intentos.
		const estadosTeclado = {} // Prepara el objeto que almacenara los estados de las letras.
		const prioridadEstado = { ausente: 0, presente: 1, correcta: 2 } // Da mayor prioridad a las letras acertadas.

		intentos.slice(0, filaActual).forEach((fila) => { // Recorre las filas que ya se han intentado.
			fila.forEach((letra, columna) => { // Recorre cada letra de la fila y su columna.
				const estado = estadoDe(fila, columna, solucion) // Calcula el resultado de esa letra comparada con la solucion.

				if (!estadosTeclado[letra] || prioridadEstado[estado] > prioridadEstado[estadosTeclado[letra]]) { // Actualiza la letra si no tenia estado o el nuevo es mejor.
					estadosTeclado[letra] = estado // Guarda el estado mas relevante de la letra.
				} // Cierra la condicion que compara la prioridad.
			}) // Cierra el recorrido de las letras de esta fila.
		}) // Cierra el recorrido de las filas intentadas.

			useEffect(() => { // Ejecuta el efecto despues de cambiar la fila actual.

			 document.querySelector('.casilla:enabled')?.focus() // Enfoca la primera casilla habilitada.
		}, [filaActual]) // Vuelve a ejecutar el efecto cuando cambia la fila.

// tarea 4 inicia
// Si esta vacia y pulso retroceso, vuelvo a la casilla anterior.
function borrarConRetroceso(fila, columna, evento) { // Define el comportamiento de retroceso para la tarea 4.

	if (evento.key !== 'Backspace') // Comprueba si la tecla pulsada es retroceso.
		return // Ignora cualquier otra tecla.


	if (intentos[fila] // Accede a la fila que contiene la casilla activa.
		[columna] !== '') return // No cambia el foco si la casilla actual no esta vacia.

	const casillaAnterior = evento.target.previousElementSibling // Obtiene la casilla anterior en el orden del documento.

	casillaAnterior?.focus() // Enfoca la casilla anterior si existe.

} // Cierra el manejador de la tecla de retroceso.
// tarea 4 finalizada

// tarea 7 inicia
function introducirLetra(letra) { // Define la entrada de letras desde el teclado en pantalla.
	if (terminada) return // Impide escribir si la partida ya termino.

	const columna = intentos[filaActual].findIndex((casilla) => casilla === '') // Busca la primera casilla vacia de la fila activa.
	if (columna === -1) return // Sale si ya no hay casillas disponibles.

	const copia = intentos.map((fila) => [...fila]) // Copia el tablero para actualizarlo sin mutar el estado original.
	copia[filaActual][columna] = letra // Coloca la letra en la casilla vacia encontrada.
	setIntentos(copia) // Guarda el tablero modificado en el estado de React.
	setAviso('') // Limpia el mensaje de aviso.

	const casillas = document.querySelectorAll('.fila')[filaActual]?.querySelectorAll('.casilla') // Obtiene las casillas visibles de la fila actual.
	casillas?.[columna + 1]?.focus() // Enfoca la casilla siguiente si existe.
} // Cierra la funcion de entrada desde el teclado en pantalla.
// tarea 7 finalizada

function cambiarLetra(f, c, evento) { // Gestiona la escritura de una letra en una casilla.
		const letra = evento.target.value.toUpperCase() // Convierte el valor introducido a mayuscula.


		if (!/^[A-ZÑ]?$/.test(letra)) return // Rechaza caracteres que no sean letras permitidas o vacio.

			const copia = intentos.map((fila) => [...fila]) // Copia las filas para preservar el estado anterior.

			copia[f][c] = letra // Actualiza la casilla indicada por fila y columna.

				setIntentos(copia) // Guarda la copia modificada como nuevo estado.

				 if (letra !== '') evento.target.nextElementSibling?.focus() // Avanza el foco si se ingreso una letra.

	} // Cierra la funcion que actualiza una casilla.


// Aqui empieza el ejercicio 3
function comprobar(evento) { // Aqui empieza el ejercicio 3: valida y envia el intento actual.

			evento.preventDefault() // Evita que el formulario recargue la pagina.

			if (terminada) return // No hace nada si la partida ya finalizo.

			 if (intentos[filaActual].includes('')) { // Comprueba si quedan casillas vacias en la fila.
				 setAviso('Faltan letras') // Muestra un mensaje si la palabra esta incompleta.
				 return // Detiene el envio sin avanzar a otra fila.
			 } // Cierra la comprobacion de casillas vacias.

			setAviso('') // Borra el mensaje cuando el intento esta completo.
			setFilaActual(filaActual + 1) // Avanza a la fila del siguiente intento.

	} // Aqui termina el ejercicio 3 y se cierra la funcion de comprobacion.
// Aqui termina el ejercicio 3


// Aqui empieza la mejora 1
function reiniciarPartida() { // Aqui empieza la mejora 1: reinicia la partida.

			setIntentos(tableroVacio()) // Limpia las letras del tablero.

		 setFilaActual(0) // Vuelve a la primera fila de intentos.

		setSolucion((solucionActual) => palabraAleatoria(solucionActual)) // Elige una solucion nueva distinta de la anterior.

	} // Aqui termina la mejora 1 y se cierra la funcion de reinicio.
// Aqui termina la mejora 1



	return ( // Devuelve la interfaz visual del juego.
		<form className="juego" onSubmit={comprobar}> {/* Crea el formulario y ejecuta la comprobacion al enviarlo. */}
			<h1>Wordle</h1> {/* Muestra el nombre del juego. */}
			<div className="tablero"> {/* Agrupa las filas del tablero. */}
				{intentos.map((fila, f) => ( // Recorre los intentos para construir las filas visuales.
					<div className="fila" key={f}> {/* Renderiza una fila y la identifica con su indice. */}
						{fila.map((letra, c) => ( // Recorre las letras para construir cada casilla.
							<Casilla key={c /* Identifica esta casilla dentro de su fila. */}
								 fila={f /* Pasa el numero de fila a la casilla. */}
								 columna={c /* Pasa el numero de columna a la casilla. */}
								 letra={letra /* Pasa la letra que contiene la casilla. */}
								 estado={f < filaActual ? estadoDe(fila, c, solucion) : '' /* Calcula el color solo para filas ya enviadas. */}
								 activa={f === filaActual && !terminada /* Activa solo las casillas de la fila actual. */}
								 onCambio={(evento) => cambiarLetra(f, c, evento) /* Actualiza la casilla al cambiar su contenido. */}
								onKeyDown={(evento) => borrarConRetroceso(f, c, evento) /* Gestiona la tecla de retroceso. */}
							/> // Cierra el componente que dibuja una casilla.
						))} {/* Cierra el recorrido que construye las casillas de esta fila. */}
					</div> // Cierra el contenedor visual de la fila.
				))} {/* Cierra el recorrido que construye todas las filas. */}
			 </div> {/* Cierra el tablero. */}
		{terminada ? ( // Elige que controles mostrar si la partida termino.
				 <div> {/* Agrupa el resultado y la opcion de reinicio. */}
					 <p className="mensaje" role="status"> {/* Muestra el resultado y lo anuncia a tecnologias de asistencia. */}
						 {ganada // Comprueba si se adivino la palabra.
							? '¡Enhorabuena, has acertado!' // Muestra un mensaje de victoria si se acerto.
							: `La palabra era ${solucion}`} {/* Revela la solucion si no se acerto. */}
					</p> {/* Cierra el mensaje del resultado. */}
					 <button className="boton" type="button" onClick={reiniciarPartida}>Jugar otra vez</button> {/* Permite iniciar una nueva partida. */}
				</div> // Cierra el grupo del resultado final.
			) : ( // Si la partida sigue, muestra avisos y el boton de comprobacion.
				<div> {/* Agrupa el aviso y el boton para comprobar. */}
					{aviso ? <p className="mensaje" role="alert">{aviso}</p> : null} {/* Muestra el aviso si hay texto que comunicar. */}
					<button className="boton" type="submit">Comprobar</button> {/* Envia el intento actual. */}
				</div> // Cierra el grupo de controles de la partida activa.
			)} {/* Cierra la expresion condicional de los controles. */}
			<Teclado letras={letrasTeclado /* Pasa al teclado las letras que debe mostrar. */}
				estados={estadosTeclado /* Pasa el estado de cada letra ya utilizada. */}
				desactivado={terminada /* Desactiva el teclado cuando finaliza la partida. */}
				onLetra={introducirLetra /* Conecta las teclas con la funcion que introduce letras. */}
			/> {/* Cierra el teclado en pantalla. */}
		</form> // Cierra el formulario del juego.
	) // Cierra la expresion JSX devuelta por el componente.
} // Cierra el componente principal.

export default App // Permite importar el componente desde el punto de entrada.
