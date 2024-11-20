import React, { useState, useEffect } from 'react';
import './Jubilacion.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Jubilacion = () => {
    const [prophetData, setProphetData] = useState([]);
    const [armaData, setArmaData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showProphetPrediction, setShowProphetPrediction] = useState(false);
    const [showArmaPrediction, setShowArmaPrediction] = useState(false);
    const [selectedMonths, setSelectedMonths] = useState(3); // Estado para los meses seleccionados

    // Función para obtener los datos y predicciones de Prophet del backend
    const fetchProphetData = async (days) => {
        try {
            const response = await fetch(`http://3.93.25.11:8001/prophet-predictions?days=${days}`);
            const result = await response.json();

            const chartData = result.dates.map((date, index) => ({
                date: date,
                value: result.values[index] || null,
                prediction: null
            }));

            const predictionsData = result.predictions.map((prediction, index) => ({
                date: result.predicted_dates[index],
                value: null,
                prediction: prediction
            }));

            setProphetData([...chartData, ...predictionsData]);
        } catch (error) {
            console.error('Error fetching Prophet data:', error);
        }
    };

    const fetchArmaData = async (days) => {
        try {
            const response = await fetch('http://54.210.220.53:8000/arma-predictions');
            const result = await response.json();

            const chartData = result.dates.map((date, index) => ({
                date: date,
                value: result.values[index] || null,
                prediction: null
            }));

            const predictionsData = result.predictions.map((prediction, index) => ({
                date: new Date(chartData[chartData.length - 1].date).setDate(new Date(chartData[chartData.length - 1].date).getDate() + index + 1),
                value: null,
                prediction: prediction
            })).map(item => ({
                ...item,
                date: new Date(item.date).toISOString().split('T')[0]
            }));

            setArmaData([...chartData, ...predictionsData]);
        } catch (error) {
            console.error('Error fetching ARMA data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProphetData(selectedMonths * 30);  // Asumiendo 30 días por mes
        fetchArmaData(selectedMonths * 30);
    }, [selectedMonths]); // Ejecutar nuevamente si cambia el número de meses

    // Función para alternar la visibilidad de las predicciones de Prophet
    const toggleProphetPrediction = () => {
        setShowProphetPrediction(!showProphetPrediction);
    };

    // Función para alternar la visibilidad de las predicciones de ARMA
    const toggleArmaPrediction = () => {
        setShowArmaPrediction(!showArmaPrediction);
    };

    // Función para manejar el cálculo de la predicción
    const handleCalculate = async () => {
        console.log(`Calculando predicciones para ${selectedMonths} meses (${selectedMonths * 30} días)`);
        setLoading(true); // Establecer loading en true antes de las solicitudes
        await Promise.all([fetchProphetData(selectedMonths * 30), fetchArmaData(selectedMonths * 30)]); // Esperar ambas solicitudes
    };

    return (
        <div className="jubilacion-container">
            <h1 className="jubilacion-title">Predicción de Moneda</h1>
            <div className="jubilacion-content">
                <p>Este gráfico muestra el precio del dólar frente al peso mexicano (MXN) y las predicciones de los modelos Prophet y ARMA.</p>

                {loading ? (
                    <p>Cargando datos...</p>
                ) : (
                    <>
                        <div className="button-container">
                            <button className="btn btn-primary" onClick={toggleProphetPrediction}>
                                <i className={`bi bi-${showProphetPrediction ? 'eye-slash' : 'eye'}`}></i>
                                {showProphetPrediction ? ' Ocultar predicción de Prophet' : ' Mostrar predicción de Prophet'}
                            </button>
                            <div className="calculo-controls">
                                <label htmlFor="calcular">Calcular A:</label>
                                <select id="calcular" value={selectedMonths} onChange={(e) => setSelectedMonths(Number(e.target.value))}>
                                    <option value="1">1 Mes</option>
                                    <option value="2">2 Meses</option>
                                    <option value="3">3 Meses</option>
                                    <option value="4">4 Meses</option>
                                    <option value="5">5 Meses</option>
                                    <option value="6">6 Meses</option>
                                </select>
                                <button className="btn btn-secondary" onClick={handleCalculate}>
                                    <i className="bi bi-calculator"></i>
                                    Aplicar
                                </button>
                            </div>
                        </div>

                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={prophetData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="value" stroke="#007bff" />
                                    {showProphetPrediction && (
                                        <Line type="monotone" dataKey="prediction" stroke="#ff0000" />
                                    )}
                                </LineChart>
                            </ResponsiveContainer>

                            <button className="btn btn-success" onClick={toggleArmaPrediction}>
                                <i className={`bi bi-${showArmaPrediction ? 'eye-slash' : 'eye'}`}></i>
                                {showArmaPrediction ? ' Ocultar predicción de ARMA' : ' Mostrar predicción de ARMA'}
                            </button>

                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={armaData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="value" stroke="#28a745" />
                                    {showArmaPrediction && (
                                        <Line type="monotone" dataKey="prediction" stroke="#ff8000" />
                                    )}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Jubilacion;
