const columnas = 5

// Activiad 8 inicia
export function estadoDe(fila, columna, solucion) {


  const faltantes = {}

const estado = Array(columnas).fill('ausente')

  for (let indice = 0; indice < columnas; indice++) {

    if (fila[indice] === solucion[indice]) {
    
        estado[indice] = 'correcta';

         } else {

      faltantes[solucion[indice]] = (faltantes[solucion[indice]] || 0) + 1;

      }

  }

    for (let indice = 0; indice < columnas; indice++) {

       if (estado[indice] === 'correcta') continue

        const letra = fila[indice]

    if  (faltantes[letra] >   0)  {

      estado[indice] = 'presente';

      faltantes[letra] -= 1;

      }

    }

        return estado[columna]

}
// Actividad 8 finalizada