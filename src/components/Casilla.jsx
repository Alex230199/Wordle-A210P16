function Casilla({ letra, estado = '', activa, fila, columna, onCambio, onKeyDown }) { // Declara el componente de una casilla del tablero.
  // Aqui empieza el ejercicio 6
  const etiqueta = letra // Empieza a construir la etiqueta accesible segun haya una letra.
    ? `Fila ${fila + 1}, columna ${columna + 1}, letra ${letra}${estado ? `, estado ${estado}` : ''}` // Describe la ubicacion, letra y estado cuando la casilla tiene contenido.
    : `Fila ${fila + 1}, columna ${columna + 1}, casilla vacía${estado ? `, estado ${estado}` : ''}` // Describe la ubicacion y el estado cuando esta vacia.
  // Aqui termina el ejercicio 6

  return ( // Devuelve el campo editable de la casilla.
    <input className={`casilla ${estado}` /* Aplica los estilos de casilla y su estado. */}
      aria-label={etiqueta /* Proporciona una descripcion accesible. */}
      value={letra /* Muestra la letra actual de la casilla. */}
      maxLength={1 /* Limita la entrada a un caracter. */}
      disabled={!activa /* Desactiva la casilla si no pertenece a la fila activa. */}
      onChange={onCambio /* Notifica cuando cambia la letra. */}
      onKeyDown={onKeyDown /* Notifica las teclas pulsadas en la casilla. */}
    /> // Cierra el campo de entrada.
  ) // Cierra el marcado devuelto.
} // Cierra el componente Casilla.

export default Casilla // Permite importar la casilla en el tablero.