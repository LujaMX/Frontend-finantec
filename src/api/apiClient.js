// src/api/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://44.201.13.61:5000/api', // Puerto en el que se ejecuta microservicio de usuarios
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token JWT a las solicitudes
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;
