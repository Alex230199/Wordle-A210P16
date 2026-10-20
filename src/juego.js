const columnas = 5 // Define el numero de letras que tiene cada palabra.

// Activiad 8 inicia
export function estadoDe(fila, columna, solucion) { // Calcula el estado de la letra indicada en una fila.


  const faltantes = {} // Cuenta las letras de la solucion que aun pueden marcarse como presentes.

const estado = Array(columnas).fill('ausente') // Inicializa todas las posiciones como letras ausentes.

  for (let indice = 0; indice < columnas; indice++) { // Revisa cada posicion para encontrar aciertos exactos.

    if (fila[indice] === solucion[indice]) { // Comprueba si la letra esta en la posicion correcta.
    
        estado[indice] = 'correcta'; // Marca como correcta la letra que coincide en posicion.

         } else { // Si no coincide, registra la letra secreta para compararla despues.

      faltantes[solucion[indice]] = (faltantes[solucion[indice]] || 0) + 1; // Cuenta esa letra disponible en la solucion.

      } // Cierra la comparacion de aciertos exactos.

  } // Cierra el primer recorrido de posiciones.

    for (let indice = 0; indice < columnas; indice++) { // Revisa las letras que todavia no son aciertos exactos.

       if (estado[indice] === 'correcta') continue // Omite las posiciones que ya fueron marcadas como correctas.

        const letra = fila[indice] // Obtiene la letra del intento en esta posicion.

    if  (faltantes[letra] >   0)  { // Comprueba si esa letra aparece aun en posiciones no emparejadas.

      estado[indice] = 'presente'; // Marca la letra como presente en otra posicion.

      faltantes[letra] -= 1; // Consume una coincidencia para no contar la misma letra dos veces.

      } // Cierra la comprobacion de letras presentes.

    } // Cierra el segundo recorrido de posiciones.

        return estado[columna] // Devuelve el estado de la columna solicitada.

} // Cierra la funcion que calcula el estado.
// Actividad 8 finalizada