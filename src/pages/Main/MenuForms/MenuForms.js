import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './MenuForms.css';

const MenuForms = () => {
    const [info, setInfo] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate

    const scrollToInfo = () => {
        const infoSection = document.getElementById('info-section');
        if (infoSection) {
            infoSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleAhorroClick = () => {
        setInfo('Generar Ahorro');
        scrollToInfo();
    };

    const handleJubilacionClick = () => {
        setInfo('Predicción de Moneda');
        scrollToInfo();
    };

    const handleMetasClick = () => {
        setInfo('Tasas de interés');
        scrollToInfo();
    };

    const handleNavigateAhorro = () => {
        navigate('/ahorro'); // Redirige a la ruta del componente Ahorro
    };

    return (
        <div className="menu-form">
            <h2>¿En qué puede ayudarte FinanTec?</h2>
            <div className="menu-options">
                <div className="saving-box green" onClick={handleAhorroClick}>
                    <div className="icon">💰</div>
                    <span>Generar Ahorro</span>
                </div>
                <div className="saving-box blue" onClick={handleJubilacionClick}>
                    <div className="icon">🏦</div>
                    <span>Predicción de Moneda</span>
                </div>
                <div className="saving-box pink" onClick={handleMetasClick}>
                    <div className="icon">🎯</div>
                    <span>Tasas de interés</span>
                </div>
            </div>

            {/* Sección de información */}
            <div id="info-section" className="info-section">
                <h3>Información sobre {info || 'FinanTec'}</h3>
                <p>
                    {info === 'Generar Ahorro' && (
                        'FinanTec es tu aliado en el camino hacia una mejor salud financiera. Aquí te proporcionamos herramientas y recursos para ayudarte a establecer metas de ahorro realistas, crear un presupuesto efectivo que se ajuste a tus necesidades, y planificar tu futuro.'
                    )}
                    {info === 'Predicción de Moneda' && (
                        'En este apartado buscamos que el usuario pueda tener de manera simple la noción del valor del dolar contra el peso mexicano, y de esta manera pueda planear inversiones futuras, o de lo contrario hacer deserciones de inversiones.'
                    )}
                    {info === 'Tasas de interés' && (
                        'Finantec busca brindar la herramienta de evaluar tasas de intereses sen la plataforma de tu preferencia, y de esta manera brindarte cálculos aproximados de tus ganancias a los años que deseas.'
                    )}
                </p>
            </div>
        </div>
    );
};

export default MenuForms;
