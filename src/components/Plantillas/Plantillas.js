import React from 'react';
import './Plantillas.css';
import { food_list } from '../../assets/assets';

const Plantillas = ({ category }) => {
  // Filtrar la lista de comidas según la categoría seleccionada
  const plantillasFiltradas = food_list.filter(item => item.category === category);

  return (
    <div className='plantillas'>
      <h2>Plantillas disponibles:</h2>
      <div className='plantillas-list'>
        {plantillasFiltradas.map(plantilla => (
          <div key={plantilla.id} className='plantilla-item'>
            <img src={plantilla.image} alt={plantilla.name} />
            <p>{plantilla.description}</p>
            {/* Agregar el botón de descarga solo si la propiedad templateDownload es true */}
            {plantilla.category === 'Ahorro' && plantilla.templateDownload && (
              <a
                href='/Plantilla Ahorro.pdf'
                className='descarga-button'
                download="Plantilla Ahorro.pdf"
              >
                Descarga Plantilla
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plantillas;
