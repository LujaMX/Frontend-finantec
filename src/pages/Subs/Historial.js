import React, { useState, useEffect } from "react";
import "./Historial.css";

const Historial = ({ userId }) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState("gastos");
  const [data, setData] = useState([]); // Estado para los datos obtenidos del backend

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://44.201.13.61:5003/api/expenses/showExpenses?userId=${userId}`
        );
        const expenses = await response.json();
        const responseServices = await fetch(
          `http://44.201.13.61:5003/api/expenses/showServices?userId=${userId}`
        );
        const services = await responseServices.json();
        const combinedData = [
          ...expenses.map((expense) => ({ ...expense, category: "gastos" })),
          ...services.map((service) => ({ ...service, category: "pagos" })),
        ];
        setData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleFilter = () => {
    const filtered = data.filter((item) => {
      const nameMatch =
        selectedFilter !== "Nombre" ||
        (item.name &&
          item.name.toLowerCase().includes(filterValue.toLowerCase()));
      const typeMatch =
        selectedFilter !== "Tipo" ||
        (item.type &&
          item.type.toLowerCase().includes(filterValue.toLowerCase()));
      const dateMatch =
        selectedFilter !== "Fecha" ||
        (item.created_at && item.created_at.includes(filterValue)); // Cambiado a created_at
      const frequencyMatch =
        selectedFilter !== "Frecuencia" ||
        (item.frequency &&
          item.frequency.toLowerCase().includes(filterValue.toLowerCase()));

      return (
        nameMatch &&
        typeMatch &&
        dateMatch &&
        frequencyMatch &&
        item.category === activeTab
      );
    });

    setFilteredData(filtered);
  };

  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFilteredData(data.filter((item) => item.category === tab));
    if (tab === "pagos") {
      setSelectedFilter("");
    }
  };

  const calculateTotal = () => {
    return (
      (filteredData.length > 0
        ? filteredData
        : data.filter((item) => item.category === activeTab)
      )
        .reduce((acc, item) => acc + parseFloat(item.cost), 0)
        .toFixed(2)
    );
  };

  // Función para descargar el archivo CSV
  const handleDownloadCSV = () => {
    if (activeTab === "gastos") {
      window.location.href = `http://44.201.13.61:5003/api/expenses/exportExpenses?userId=${userId}`;
    } else {
      window.location.href = `http://44.201.13.61:5003/api/expenses/exportServices?userId=${userId}`;
    }
  };

  return (
    <div className="historial-container">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "gastos" ? "active" : ""}`}
          onClick={() => handleTabChange("gastos")}
        >
          Historial Gastos
        </button>
        <button
          className={`tab-button ${activeTab === "pagos" ? "active" : ""}`}
          onClick={() => handleTabChange("pagos")}
        >
          Historial Pagos Servicio
        </button>
        <button className="filter-btn" onClick={toggleFilterVisibility}>
          <i className="bi bi-sliders"></i>
        </button>
      </div>

      {filterVisible && (
        <div className="filter-options">
          {activeTab === "gastos" && !selectedFilter && (
            <>
              <button onClick={() => setSelectedFilter("Nombre")}>
                Filtrar por Nombre
              </button>
              <button onClick={() => setSelectedFilter("Tipo")}>
                Filtrar por Tipo
              </button>
              <button onClick={() => setSelectedFilter("Fecha")}>
                Filtrar por Fecha
              </button>
            </>
          )}
          {activeTab === "pagos" && !selectedFilter && (
            <>
              <button onClick={() => setSelectedFilter("Tipo")}>
                Filtrar por Tipo
              </button>
              <button onClick={() => setSelectedFilter("Frecuencia")}>
                Filtrar por Frecuencia
              </button>
            </>
          )}
          {selectedFilter && (
            <>
              <input
                type="text"
                placeholder={`Ingrese ${selectedFilter}`}
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
              <button onClick={handleFilter}>Aplicar Filtro</button>
              <button onClick={() => setSelectedFilter("")}>Cancelar</button>
            </>
          )}
        </div>
      )}

      <table className="historial-table">
        <thead>
          <tr>
            <th>Fecha/Hora</th>
            {activeTab === "pagos" ? (
              <>
                <th>Tipo</th>
                <th>Frecuencia</th>
              </>
            ) : (
              <>
                <th>Nombre</th>
                <th>Tipo</th>
              </>
            )}
            <th>Costo</th>
          </tr>
        </thead>
        <tbody>
          {(filteredData.length > 0
            ? filteredData
            : data.filter((item) => item.category === activeTab)
          ).map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.created_at).toLocaleString()}</td> {/* Asegúrate de usar created_at */}
              {activeTab === "pagos" ? (
                <>
                  <td>{item.type}</td>
                  <td>{item.frequency}</td>
                </>
              ) : (
                <>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                </>
              )}
              <td>{item.cost}</td>
            </tr>
          ))}
          <tr className="total-row">
            <td colSpan={activeTab === "pagos" ? "4" : "3"}>Total</td>
            <td>${calculateTotal()}</td>
          </tr>
        </tbody>
      </table>

      {/* Botón para descargar CSV */}
      <button onClick={handleDownloadCSV} className="download-btn">
        Descargar CSV de {activeTab === "gastos" ? "Gastos" : "Pagos"}
      </button>
    </div>
  );
};

export default Historial;
