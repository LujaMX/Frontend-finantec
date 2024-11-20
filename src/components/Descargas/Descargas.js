// Importación de React y estilos del componente Descargas
import React from 'react'
import './Descargas.css'

// Importación de recursos gráficos desde el archivo assets.js
import { assets } from '../../assets/assets'

// Definición del componente funcional Descargas
const Descargas = () => {
  return (
    // Contenedor principal del componente, con clase 'app-download' y un ID 'app-download'
    <div className='app-download' id='app-dpwnload'>
      {/* Párrafo con texto indicando la recomendación de descargar la aplicación FinanTec */}
      <p>Para una mejor experiencia <br />FinanTec App</p>
      
      {/* Contenedor de imágenes de las plataformas de descarga */}
      <div className="app-download-plataforms">
        {/* Imagen de la tienda de aplicaciones Google Play Store */}
        <img src={assets.play_store} alt="" />
        
        {/* Imagen de la tienda de aplicaciones Apple App Store */}
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

// Exportación del componente Descargas para su uso en otros archivos
export default Descargas
