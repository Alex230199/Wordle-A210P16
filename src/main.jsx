import { StrictMode } from 'react' // Importa el modo estricto de React para detectar problemas durante el desarrollo.
import { createRoot } from 'react-dom/client' // Importa la funcion que monta React en el documento.
import './index.css' // Carga los estilos globales de la aplicacion.
import App from './App.jsx' // Importa el componente principal del juego.

createRoot(document.getElementById('root')).render( // Busca el elemento root y renderiza la aplicacion dentro de el.
  <StrictMode> {/* Activa comprobaciones adicionales de React durante el desarrollo. */}
    <App /> {/* Muestra el componente principal del juego. */}
  </StrictMode>, // Cierra el modo estricto.
) // Cierra la llamada que renderiza la aplicacion.
