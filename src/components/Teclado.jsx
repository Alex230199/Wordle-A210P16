// tarea 7 inicia
function Teclado({ letras, estados, desactivado, onLetra }) {

  return (

    <div className="teclado" aria-label="Teclado en pantalla">

      {letras.map

      ((letra) => (

        <button

          className={`tecla ${estados[letra] || ''}`} type="button" key={letra}

          
          aria-label={`Letra ${letra}${estados[letra] ? `, ${estados[letra]}` : ''}`}

          disabled={desactivado}onClick={() => onLetra(letra)}>

          {letra}

        </button>
        )
       )
       }
 </div>
  )
}

// tarea 7 finalizada

export default Teclado