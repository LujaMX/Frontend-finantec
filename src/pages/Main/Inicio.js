import React, { useState } from 'react';
import './Inicio.css';

const Inicio = ({ onClose, user }) => {
    const [salary, setSalary] = useState('');
    const [paysServices, setPaysServices] = useState('');
    const [monthlyExpenses, setMonthlyExpenses] = useState('');

    const handleSalaryChange = (e) => setSalary(e.target.value);
    const handlePaysServicesChange = (e) => setPaysServices(e.target.value);
    const handleMonthlyExpensesChange = (e) => setMonthlyExpenses(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = {
                userId: user.id,
                salary,
                paysServices,
                monthlyExpenses
            };

            const response = await fetch('http://localhost:5001/api/forms/initial', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                onClose(); // Close the form after successful submission
            } else {
                const errorData = await response.json();
                console.error('Error submitting form:', errorData);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="inicio-container">
            <svg className="inicio-background" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <filter id="bbblurry-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feGaussianBlur stdDeviation="34" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
                    </filter>
                </defs>
                <g filter="url(#bbblurry-filter)">
                    <rect x="0" y="0" width="400" height="400" fill="white" />
                    <ellipse rx="137.5" ry="174.5" cx="197.5" cy="100" fill="hsl(37, 99%, 67%)"></ellipse>
                    <ellipse rx="137.5" ry="174.5" cx="118.4" cy="242.4" fill="hsl(316, 73%, 52%)"></ellipse>
                    <ellipse rx="137.5" ry="174.5" cx="144.6" cy="134.2" fill="hsl(185, 100%, 57%)"></ellipse>
                    <ellipse rx="137.5" ry="174.5" cx="205.3" cy="308.5" fill="hsla(89, 73%, 48%, 1.00)"></ellipse>
                    <ellipse rx="137.5" ry="174.5" cx="283.8" cy="215.1" fill="hsla(353, 98%, 41%, 0.75)"></ellipse>
                </g>
            </svg>
            <div className="inicio-box">
                <h1>Un gusto, {user.Nombres} {user.Apellidos}</h1>
                <p>FinanTec te saluda! Y queremos brindarte una gran experiencia, por lo que nos interesa conocerte mejor.</p>
                <form onSubmit={handleSubmit}>
                    <label>
                        ¿Cuál es tu salario mensual?
                        <input 
                            type="number" 
                            value={salary} 
                            onChange={handleSalaryChange} 
                            placeholder="$"
                        />
                    </label>
                    <label>
                        ¿Pagas servicios como Luz, Agua, Internet, Gas, etc.?
                        <select value={paysServices} onChange={handlePaysServicesChange}>
                            <option value="">Seleccione</option>
                            <option value="si">Si</option>
                            <option value="no">No</option>
                        </select>
                    </label>
                    <label>
                        ¿A cuánto ascienden tus gastos mensuales aproximadamente?
                        <input 
                            type="number" 
                            value={monthlyExpenses} 
                            onChange={handleMonthlyExpensesChange} 
                            placeholder="$"
                        />
                    </label>
                    <button type="submit" className="close-button">Comenzar</button>
                </form>
            </div>
        </div>
    );
}

export default Inicio;
