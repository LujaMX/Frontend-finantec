import React, { useState } from 'react';
import './MenuForms.css';

const RetireForm = ({ onClose, userId }) => {
    const [submitted, setSubmitted] = useState(false);
    const [formVisible, setFormVisible] = useState(true);
    const [retirementPlan, setRetirementPlan] = useState('');
    const [spenderPerson, setSpenderPerson] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true); // Activa la animación de éxito
        setTimeout(() => {
            setSubmitted(false); // Desactiva la animación después de 2 segundos
            setFormVisible(false); // Oculta el formulario después de la animación de éxito
            onClose(); // Llama a onClose para notificar al componente padre
        }, 2000);

        const retireData = {
            userId,
            retirementPlan,
            spenderPerson
        };

        try {
            const response = await fetch('http://localhost:5001/api/forms/retires', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(retireData)
            });

            if (response.ok) {
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    setFormVisible(false);
                    onClose(); // Llama a onClose para notificar al componente padre
                }, 2000);
            } else {
                console.error('Error saving retire data:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving retire data:', error);
        }
    };

    const handleClose = () => {
        setFormVisible(false);
        onClose(); // Llama a onClose para notificar al componente padre
    };

    return (
        <div className={`form-container ${formVisible ? 'visible' : 'hidden'}`}>
            <span className="close-button" onClick={handleClose}>X</span>
            <h2>Formulario de Plan de Jubilación</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>¿Buscas un plan de ahorro para tu jubilación?</label>
                    <select value={retirementPlan} onChange={(e) => setRetirementPlan(e.target.value)} required>
                        <option value="">Selecciona una opción</option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>¿Te consideras una persona gastadora?</label>
                    <select value={spenderPerson} onChange={(e) => setSpenderPerson(e.target.value)} required>
                        <option value="">Selecciona una opción</option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="submit" value="Enviar" />
                </div>
            </form>
            {submitted && (
                <div className="success-animation">
                    <div className="success-check">✓</div>
                </div>
            )}
        </div>
    );
};

export default RetireForm;
