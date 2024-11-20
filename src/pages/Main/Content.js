import React, { useState, useEffect } from 'react';
import './Content.css';

const Content = ({ user = {} }) => {
    const [activeTab, setActiveTab] = useState('inicio');
    const [initialForm, setInitialForm] = useState({});
    const [goalForm, setGoalForm] = useState({});
    const [saveForm, setSaveForm] = useState({});
    const [retireForm, setRetireForm] = useState({});

    useEffect(() => {
        if (user.id) {
            fetchFormData('initial', setInitialForm);
            fetchFormData('goals', setGoalForm);
            fetchFormData('save', setSaveForm);
            fetchFormData('retires', setRetireForm);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.id]);

    const fetchFormData = async (formType, setFormState) => {
        try {
            const response = await fetch(`http://localhost:5001/api/forms/${formType}/get${capitalize(formType)}/${user.id}`);
            const result = await response.json();
            setFormState(result);
        } catch (error) {
            console.error(`Error fetching ${formType} form data:`, error);
        }
    };

    const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    return (
        <div className="content-container">
            <div className="user-info">
                <h2>{user.Nombres ? `${user.Nombres} ${user.Apellidos}` : 'Nombre del Usuario'}</h2>
                <p>Correo Electrónico: {user.Correo || 'No disponible'}</p>
            </div>

            <div className="tabs">
                <button
                    className={`tab-button ${activeTab === 'inicio' ? 'active' : ''}`}
                    onClick={() => setActiveTab('inicio')}
                >
                    Inicio
                </button>
                <button
                    className={`tab-button ${activeTab === 'generarAhorro' ? 'active' : ''}`}
                    onClick={() => setActiveTab('generarAhorro')}
                >
                    Generar Ahorro
                </button>
                <button
                    className={`tab-button ${activeTab === 'planJubilacion' ? 'active' : ''}`}
                    onClick={() => setActiveTab('planJubilacion')}
                >
                    Plan de Jubilación
                </button>
                <button
                    className={`tab-button ${activeTab === 'metas' ? 'active' : ''}`}
                    onClick={() => setActiveTab('metas')}
                >
                    Metas Largo/Corto Plazo
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'inicio' && (
                    <div className="tab-section">
                        <h3>Formulario Inicial</h3>
                        <p>Salario: {initialForm.salary}</p>
                        <p>Paga Servicios: {initialForm.paysServices ? 'Sí' : 'No'}</p>
                        <p>Gastos Mensuales: {initialForm.monthlyExpenses}</p>
                    </div>
                )}
                {activeTab === 'generarAhorro' && (
                    <div className="tab-section">
                        <h3>Datos Ahorro</h3>
                        <p>Tiene Meta Específica: {saveForm.hasSpecificGoal ? 'Sí' : 'No'}</p>
                        <p>Monto Objetivo: {saveForm.targetAmount}</p>
                        <p>Ahorros Semanales: {saveForm.weeklySavings}</p>
                    </div>
                )}
                {activeTab === 'planJubilacion' && (
                    <div className="tab-section">
                        <h3>Plan de Jubilación</h3>
                        <p>Plan de Jubilación: {retireForm.retirementPlan ? 'Sí' : 'No'}</p>
                        <p>Persona Gastadora: {retireForm.spenderPerson ? 'Sí' : 'No'}</p>
                    </div>
                )}
                {activeTab === 'metas' && (
                    <div className="tab-section">
                        <h3>Metas Largo/Corto Plazo</h3>
                        <p>Meta a Corto Plazo: {goalForm.shortTerm ? 'Sí' : 'No'}</p>
                        <p>Meta a Mediano Plazo: {goalForm.mediumTerm ? 'Sí' : 'No'}</p>
                        <p>Meta a Largo Plazo: {goalForm.longTerm ? 'Sí' : 'No'}</p>
                        <p>Presupuesto Mensual: {goalForm.monthlyBudget ? 'Sí' : 'No'}</p>
                        <p>Tipo de Meta: {goalForm.goalType}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Content;
