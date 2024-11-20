import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, Select, Modal, message } from 'antd';
import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons';  // Importa el icono de eliminar
import './Ahorro.css';

const { Option } = Select;

const Ahorro = ({ userId }) => {
  const [objectives, setObjectives] = useState([]);
  const [formData, setFormData] = useState({
    goal: '',
    amount: '',
    frequency: 'mensual',
  });
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para el modal
  const [abonoAmount, setAbonoAmount] = useState(''); // Estado para la cantidad a abonar
  const [currentGoalId, setCurrentGoalId] = useState(null); // Para saber a qué objetivo se le está abonando

  useEffect(() => {
    // Fetch user savings goals from backend
    axios.get(`http://44.201.13.61:5002/api/ahorro/objetivos/${userId}`)
      .then(response => {
        setObjectives(response.data);
      })
      .catch(err => console.error(err));
  }, [userId]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    axios.post(`http://44.201.13.61:5002/api/ahorro/objetivos/${userId}`, formData)
      .then(response => {
        setObjectives([...objectives, response.data]);
        setFormData({
          goal: '',
          amount: '',
          frequency: 'mensual',
        });
      })
      .catch(err => console.error(err));
  };

  // Abre el modal y asigna el ID del objetivo
  const handleAbono = (goalId) => {
    setCurrentGoalId(goalId);
    setIsModalVisible(true);
  };

  // Maneja el cambio de la cantidad a abonar
  const handleAbonoAmountChange = (e) => {
    setAbonoAmount(e.target.value);
  };

  // Cierra el modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setAbonoAmount(''); // Limpiar la cantidad
  };

  // Confirma el abono y envía la solicitud al backend
  const handleOk = () => {
    if (abonoAmount) {
      axios.post(`http://44.201.13.61:5002/api/ahorro/abonar/${currentGoalId}`, { amount: abonoAmount })
        .then(response => {
          setObjectives(objectives.map(obj => 
            obj._id === currentGoalId ? { ...obj, savedAmount: response.data.savedAmount } : obj
          ));
          handleCancel(); // Cierra el modal
        })
        .catch(err => {
          // Verificamos el error desde el backend
          if (err.response && err.response.data === 'El abono supera la cantidad de la meta') {
            message.error('Ese abono supera la cantidad de meta, ingresa otra');
          } else {
            console.error(err);
            message.error('Ocurrió un error al intentar realizar el abono');
          }
        });
    } else {
      alert("Por favor ingresa una cantidad válida.");
    }
  };

  // Eliminar un objetivo
  const handleDelete = (goalId) => {
    axios.delete(`http://44.201.13.61:5002/api/ahorro/objetivos/${goalId}`)
      .then(() => {
        setObjectives(objectives.filter(obj => obj._id !== goalId));
        message.success('Objetivo eliminado exitosamente');
      })
      .catch(err => {
        console.error(err);
        message.error('Ocurrió un error al eliminar el objetivo');
      });
  };

  const columns = [
    {
      title: 'Meta',
      dataIndex: 'goal',
      key: 'goal',
    },
    {
      title: 'Cantidad de Meta',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => `$${text}`,
    },
    {
      title: 'Abonado',
      dataIndex: 'savedAmount',
      key: 'savedAmount',
      render: (text) => `$${text}`,
    },
    {
      title: 'Frecuencia de Abono',
      dataIndex: 'frequency',
      key: 'frequency',
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, record) => (
        <>
          <Button onClick={() => handleAbono(record._id)} type="primary" style={{ marginRight: '8px' }}>
            Abonar
          </Button>
          <Button 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record._id)} 
            type="danger" 
          />
        </>
      ),
    },
  ];

  return (
    <div className="ahorro-container">
      <h2 className="titulo-ahorro">Mis Objetivos de Ahorro</h2>
      <Form className="ahorro-form" onSubmitCapture={handleSubmit}>
        <Form.Item label="Objetivo de Ahorro">
          <Input
            name="goal"
            value={formData.goal}
            onChange={handleInputChange}
            placeholder="Ej. Carro, Casa, Vacaciones..."
          />
        </Form.Item>
        <Form.Item label="Cantidad de Meta">
          <Input
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            type="number"
            placeholder="Monto total"
          />
        </Form.Item>
        <Form.Item label="Frecuencia de Abono">
          <Select
            name="frequency"
            value={formData.frequency}
            onChange={(value) => setFormData({ ...formData, frequency: value })}
          >
            <Option value="mensual">Mensual</Option>
            <Option value="semanal">Semanal</Option>
            <Option value="diario">Diario</Option>
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">Registrar Meta</Button>
      </Form>

      <Table
        columns={columns}
        dataSource={objectives}
        rowKey="_id"
        pagination={false}
        className="ahorro-table"
      />

      {/* Modal para abonar */}
      <Modal
        title="Registrar Abono"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Abonar"
        cancelText="Cancelar"
      >
        <Form>
          <Form.Item label="Cantidad a abonar">
            <Input
              type="number"
              value={abonoAmount}
              onChange={handleAbonoAmountChange}
              placeholder="Monto a abonar"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Ahorro;
