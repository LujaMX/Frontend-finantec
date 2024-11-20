import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import './style.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        try {
            const response = await apiClient.post('/users/login', {
                email,
                password,
            });

            const data = response.data;

            if (data.message === 'Login successful') {
                console.log(data.isVerified)
                if (!data.isVerified) {
                    alert('Please verify your email before logging in.');
                    return;
                }
                // Almacenar el token JWT en localStorage
                localStorage.setItem('token', data.token);
                // Redirigir a la página de bienvenida
                navigate('/welcome');
            } else {
                alert(data.message); // Mensaje de error del backend
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className='login-template d-flex justify-content-center align-items-center vh-100 bg-custom'>
            <div className='form_container p-5 rounded bg-white w-50'>
                <img src='finantec.png' alt='Logo' className='login-logo mb-4 d-block mx-auto' />
                <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>
                    <h3 className='text-center'>Sign In</h3>
                    <div className='mb-3 w-100'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            name='email'
                            placeholder='Enter Email'
                            className='form-control'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mb-3 w-100'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            placeholder='Enter Password'
                            className='form-control'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mb-3 w-100 d-flex align-items-center'>
                        <input type='checkbox' className='form-check-input' id='check' />
                        <label htmlFor='check' className='form-check-label ms-3 mt-3'>
                            Remember me
                        </label>
                    </div>
                    <div className='d-grid'>
                        <button className='btn btn-primary'>Sign In</button>
                    </div>
                    <p className='text-end mt-2'>
                        Forgot <a href=''>Password?</a>
                        <Link to='/signup' className='ms-2'>
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
