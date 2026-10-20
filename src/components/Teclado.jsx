// tarea 7 inicia
function Teclado({ letras, estados, desactivado, onLetra }) { // Define el teclado en pantalla y recibe sus datos y acciones.

  return ( // Devuelve el marcado del teclado.

    <div className="teclado" aria-label="Teclado en pantalla"> {/* Agrupa las teclas y nombra el teclado para accesibilidad. */}

      {letras.map((letra) => ( // Recorre las letras y crea un boton para cada una.

        <button className={`tecla ${estados[letra] || ''}` /* Aplica el estilo base y el estado de la letra. */}
          type={'button' /* Evita que la tecla envie un formulario. */}
          key={letra /* Identifica de forma unica el boton en la lista. */}

          aria-label={`Letra ${letra}${estados[letra] ? `, ${estados[letra]}` : ''}` /* Anuncia la letra y su estado accesible. */}

          disabled={desactivado /* Desactiva el boton cuando termina la partida. */}
          onClick={() => onLetra(letra) /* Envia la letra pulsada al componente padre. */}>

          {letra} {/* Muestra el caracter de esta tecla. */}

          {/* Cierra el contenido visual de la tecla antes de cerrar su boton. */}
        </button>
      ))} {/* Cierra la expresion que genera todos los botones. */}
 </div> // Cierra el contenedor JSX del teclado.
  ) // Cierra el marcado devuelto por el componente.
} // Cierra el componente Teclado.

// tarea 7 finalizada

export default Teclado // Permite importar el componente desde otros archivos.