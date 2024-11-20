import React, { useState, useEffect } from 'react';
import './Metas.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const Metas = () => {
  const [cetesData, setCetesData] = useState([]);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [calculatedReturn, setCalculatedReturn] = useState(null);
  const [investmentDuration, setInvestmentDuration] = useState('12'); // Valor por defecto: 12 meses (1 año)
  const [predictions, setPredictions] = useState([]);
  const [cetesPredictions, setCetesPredictions] = useState([]); // Nuevo estado para predicciones de CETES

  // Función para obtener el historial de rendimientos de CETES desde la API
  const fetchCetesData = async () => {
    try {
      const response = await fetch('http://54.174.8.90:8002/historial-rendimientos'); 
      const data = await response.json();
      setCetesData(data);
    } catch (error) {
      console.error("Error fetching CETES data:", error);
    }
  };

  // Nueva función para obtener predicciones de CETES
  const fetchCetesPredictions = async () => {
    try {
      const response = await fetch('http://54.174.8.90:8002/cetes-predictions');
      const data = await response.json();
      setCetesPredictions(data.predictions);
    } catch (error) {
      console.error("Error fetching CETES predictions:", error);
    }
  };

  useEffect(() => {
    fetchCetesData();
    fetchCetesPredictions(); // Llamar a la nueva función
  }, []);

  const calculateReturn = () => {
    if (investmentAmount && cetesData.length > 0) {
      const latestYield = parseFloat(cetesData[cetesData.length - 1].rendimiento) / 100; // Obtener el último rendimiento

      // Convertir duración a años
      const durationInYears = parseInt(investmentDuration) / 12;

      // Cálculo de interés compuesto
      const totalAmount = investmentAmount * Math.pow(1 + latestYield, durationInYears);
      setCalculatedReturn(totalAmount.toFixed(2)); // Muestra el resultado con dos decimales
    }
  };

  return (
    <div className="metas-container">
      <h1>Metas de Inversión en CETES</h1>

      {cetesData.length > 0 ? (
        <>
          <section className="investment-calculator">
            <h2>Último Rendimiento de CETES</h2>
            <p>
              Tasa de Interés: {cetesData[cetesData.length - 1].rendimiento}% 
              (Fecha: {cetesData[cetesData.length - 1].fecha})
            </p>

            <div className="input-group">
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                placeholder="Monto a invertir"
                min="0"
                step="0.01"
              />
            </div>

            <div className="input-group">
              <label htmlFor="duration">Duración de la inversión:</label>
              <select
                id="duration"
                value={investmentDuration}
                onChange={(e) => setInvestmentDuration(e.target.value)}
              >
                <option value="1">1 mes</option>
                <option value="3">3 meses</option>
                <option value="6">6 meses</option>
                <option value="12">1 año</option>
              </select>
            </div>

            <button onClick={calculateReturn} disabled={!investmentAmount || investmentAmount <= 0}>
              Calcular Rendimiento
            </button>

            {calculatedReturn && (
              <p>
                El rendimiento esperado de su inversión en 
                {investmentDuration <= 12 
                  ? `${investmentDuration} mes(es)` 
                  : `${investmentDuration / 12} año(s)`} 
                es: ${calculatedReturn}
              </p>
            )}
          </section>

          {/* Gráfica de Rendimientos */}
          <section className="cetes-chart">
            <h2>Historial de Rendimientos de CETES</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cetesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="rendimiento" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </section>

          {/* Opcional: Gráfica de Predicciones de CETES */}
          <section className="cetes-predictions-chart">
            <h2>Gráfica de Predicciones Futuras de Rendimiento de CETES</h2>
            {cetesPredictions.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cetesPredictions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="fecha" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="rendimiento_predicho" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p>Cargando predicciones de CETES...</p>
            )}
          </section>
        </>
      ) : (
        <p>Cargando datos de CETES...</p>
      )}
    </div>
  );
};

export default Metas;
