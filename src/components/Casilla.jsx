function Casilla({ letra, estado = '', activa, onCambio }) {
  const etiqueta = letra ? `Letra ${letra}` : 'Casilla vacía'

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