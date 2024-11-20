import React, { useState } from 'react';
import './MenuForms.css';

const SaveForm = ({ onClose, userId }) => {  // Recibir userId como prop
    const [submitted, setSubmitted] = useState(false);
    const [formVisible, setFormVisible] = useState(true);
    const [hasSpecificGoal, setHasSpecificGoal] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [weeklySavings, setWeeklySavings] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormVisible(false);
            onClose(); // Llama a onClose para notificar al componente padre
        }, 2000);

        const saveData = {
            userId,  // Incluir userId en los datos enviados
            hasSpecificGoal,
            targetAmount,
            weeklySavings
        };

        try {
            const response = await fetch('http://localhost:5001/api/forms/Save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(saveData)
            });

            if (response.ok) {
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    setFormVisible(false);
                    onClose();
                }, 2000);
            } else {
                console.error('Error saving save data:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving save data:', error);
        }
    };

    const handleClose = () => {
        setFormVisible(false);
        onClose();
    };

    return (
        <div className={`form-container ${formVisible ? 'visible' : 'hidden'}`}>
            <span className="close-button" onClick={handleClose}>X</span>
            <h2>Formulario de Generar Ahorro</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>¿Te gustaría un plan para generar ahorro?</label>
                    <select value={hasSpecificGoal} onChange={(e) => setHasSpecificGoal(e.target.value)} required>
                        <option value="">Selecciona una opción</option>
                        <option value="yes">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>¿Qué monto deseas alcanzar?</label>
                    <input type="number" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} placeholder="$" required />
                </div>
                <div className="form-group">
                    <label>¿Qué cantidad semanal deseas ahorrar?</label>
                    <input type="number" value={weeklySavings} onChange={(e) => setWeeklySavings(e.target.value)} placeholder="$" required />
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

export default SaveForm;
