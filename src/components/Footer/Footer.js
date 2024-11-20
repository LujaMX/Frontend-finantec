// Importación de React y estilos del componente Footer
import React from 'react'
import './Footer.css'

// Importación de recursos gráficos desde el archivo assets.js
import { assets } from '../../assets/assets'

// Definición del componente funcional Footer
const Footer = () => {
  return (
    // Contenedor principal del componente, con clase 'footer' y un ID 'footer'
    <div className='footer' id='footer'>
      {/* Contenido del pie de página */}
      <div className="footer-content">
        {/* Contenido del lado izquierdo del pie de página */}
        <div className="footer-content-left">
          {/* Logo de la empresa */}
          <img src={assets.logo} alt="" />
          {/* Texto de descripción */}
          <p>fsdfsdfsdfsdfsdfsndfjsndfsjkdfsjhdfsjdhf. sjkdhfsjkdhfskdfhsjdhfsjkdfhsjdfnsdcbsjdbfsj. hdfbsndfbsjdfsd</p>
          {/* Iconos de redes sociales */}
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        {/* Contenido del centro del pie de página */}
        <div className="footer-content-center">
          {/* Título de la sección */}
          <h2>COMPAÑIA</h2>
          {/* Lista de enlaces */}
          <ul>
            <li>Bienvenida</li>
            <li>Nosotros</li>
            <li>Plantillas</li>
            <li>Politicas de privacidad</li>
          </ul>
        </div>
        {/* Contenido del lado derecho del pie de página */}
        <div className="footer-content-right">
          {/* Título de la sección */}
          <h2>CONTACTANOS</h2>
          {/* Lista de información de contacto */}
          <ul>
            <li>+52 800-000-29</li>
            <li>finantec@finanzas.com</li>
          </ul>
        </div>
      </div>
      {/* Línea divisoria */}
      <hr/>
      {/* Derechos de autor del pie de página */}
      <p className="footer-copyright">Copyright 2024 FinanzasTec.com</p>
    </div>
  )
}

// Exportación del componente Footer para su uso en otros archivos
export default Footer
