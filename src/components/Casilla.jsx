function Casilla({ letra, estado = '', activa, fila, columna, onCambio }) {
  // Aqui empieza el ejercicio 6
  const etiqueta = letra
    ? `Fila ${fila + 1}, columna ${columna + 1}, letra ${letra}${estado ? `, estado ${estado}` : ''}`
    : `Fila ${fila + 1}, columna ${columna + 1}, casilla vacía${estado ? `, estado ${estado}` : ''}`
  // Aqui termina el ejercicio 6

  return (
    <input
      className={`casilla ${estado}`}
      aria-label={etiqueta}
      value={letra}
      maxLength={1}
      disabled={!activa}
      onChange={onCambio}
    />
  )
}

export default Casilla