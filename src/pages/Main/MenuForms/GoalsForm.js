import React, { useState } from 'react';
import './MenuForms.css';

const GoalsForm = ({ onClose, userId }) => {
    const [submitted, setSubmitted] = useState(false);
    const [formVisible, setFormVisible] = useState(true); // Estado para controlar la visibilidad del formulario

    const [shortTerm, setShortTerm] = useState('');
    const [mediumTerm, setMediumTerm] = useState('');
    const [longTerm, setLongTerm] = useState('');
    const [monthlyBudget, setMonthlyBudget] = useState('');
    const [goalType, setGoalType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true); // Activa la animación de éxito
        setTimeout(() => {
            setSubmitted(false); // Desactiva la animación después de 2 segundos
            setFormVisible(false); // Oculta el formulario después de la animación de éxito
            onClose(); // Llama a onClose para notificar al componente padre
        }, 2000);

        const goalData = {
            userId,
            shortTerm: shortTerm === 'yes',
            mediumTerm: mediumTerm === 'yes',
            longTerm: longTerm === 'yes',
            monthlyBudget: monthlyBudget === 'yes',
            goalType
        };

        try {
            const response = await fetch('http://localhost:5001/api/forms/goals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(goalData),
            });

            if (response.ok) {
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    setFormVisible(false);
                    onClose();
                }, 2000);
            } else {
                console.error('Error al guardar la meta');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    const handleClose = () => {
        setFormVisible(false);
        onClose(); // Llama a onClose para notificar al componente padre
    };

    return (
        <div className={`form-container ${formVisible ? 'visible' : 'hidden'}`}>
            <span className="close-button" onClick={handleClose}>X</span>
            <h2>Formulario de Metas Largo/Corto Plazo</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tu meta financiera es de corto plazo? (menos de un año)</label>
                    <select required value={shortTerm} onChange={(e) => setShortTerm(e.target.value)}>
                        <option value="">Selecciona una opción</option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Tu meta financiera es de mediano plazo? (de 1 a 4 años)</label>
                    <select required value={mediumTerm} onChange={(e) => setMediumTerm(e.target.value)}>
                        <option value="">Selecciona una opción</option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Tu meta financiera es de Largo plazo? (más de 4 años)</label>
                    <select required value={longTerm} onChange={(e) => setLongTerm(e.target.value)}>
                        <option value="">Selecciona una opción</option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Quieres llevar un presupuesto mensual?</label>
                    <select required value={monthlyBudget} onChange={(e) => setMonthlyBudget(e.target.value)}>
                        <option value="">Selecciona una opción</option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Cual es tu objetivo?</label>
                    <select required value={goalType} onChange={(e) => setGoalType(e.target.value)}>
                        <option value="">Selecciona una opción</option>
                        <option value="house">Casa</option>
                        <option value="car">Carro</option>
                        <option value="phone">Teléfono nuevo</option>
                        <option value="wedding">Boda</option>
                        <option value="clothes">Ropa</option>
                        <option value="other">Otros</option>
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

export default GoalsForm;