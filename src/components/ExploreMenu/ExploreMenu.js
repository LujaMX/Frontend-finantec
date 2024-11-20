// Importación de React y estilos del componente ExploreMenu
import React from 'react'
import './ExploreMenu.css'

// Importación de la lista de menús desde el archivo assets.js
import { menu_list } from '../../assets/assets'

// Definición del componente funcional ExploreMenu
const ExploreMenu = ({category, setCategory}) => {
  return (
    // Contenedor principal del componente, con clase 'explore-menu' y un ID 'explore-menu'
    <div className='explore-menu' id='explore-menu'>
      {/* Título del menú de exploración */}
      <h1>Recursos Ofrecidos</h1>
      {/* Descripción del menú de exploración */}
      <p className='explore-menu-text'>Estas son algunas de las cualidades y funciones con estructura clara y organizada que ofrecemos, permitiendo a los usuarios encontrar fácilmente las plantillas de Excel que necesitan</p>
      {/* Contenedor de la lista de elementos del menú */}
      <div className='explore-menu-list'>
        {/* Mapeo de la lista de menús para generar elementos de lista */}
        {menu_list.map((item, index) => {
          return (
            // Elemento de lista con un manejador de clic que actualiza la categoría seleccionada
            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className='explore-menu-list-item'>
              {/* Imagen del menú con una clase 'active' si coincide con la categoría seleccionada */}
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt=""/>
              {/* Nombre del menú */}
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      {/* Línea divisoria */}
      <hr/>
    </div>
  )
}

// Exportación del componente ExploreMenu para su uso en otros archivos
export default ExploreMenu
