import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Welcome.css';
import MenuForms from './MenuForms/MenuForms';
import Inicio from './Inicio';
import Ahorro from '../Subs/Ahorro';
import Jubilacion from '../Subs/Jubilacion';
import Metas from '../Subs/Metas';
import Gastos from '../Subs/Gastos';
import Historial from '../Subs/Historial';
import Profile from './Profile';
import Content from './Content';
import Dolar from '../Subs/Dolar';

const Welcome = () => {
    const [user, setUser] = useState({ Nombres: 'Usuario', Apellidos: '', _id: ''});
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [showInicio, setShowInicio] = useState(true);
    const [selectedForm, setSelectedForm] = useState(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const navigate = useNavigate(); // Hook para navegación

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
                console.log(decodedUser)
/*
                const checkInitialForm = async () => {
                    try {
                        const userId = decodedUser.id;
                        console.log('ID de usuario antes de la solicitud:', userId);
                
                        if (!userId) {
                            console.error('ID de usuario no está definido');
                            return;
                        }
                
                        const response = await fetch(`http://localhost:5001/api/forms/initial/check/${userId}`);
                        const result = await response.json();
                
                        if (result.hasInitial) {
                            setShowInicio(false);
                        }
                    } catch (error) {
                        console.error('Error checking initial form:', error);
                        alert('Error al verificar el formulario inicial. Por favor, inténtelo de nuevo.');
                    }
                };
                
                checkInitialForm();   */
            } catch (error) {
                console.error('Token inválido:', error);
                navigate('/login'); // Usar navigate para redirigir
            }
        } else {
            navigate('/login'); // Usar navigate para redirigir
        }

        const timer = setTimeout(() => {
            setShowContent(true);
        }, 500);

        return () => clearTimeout(timer);
    }, [navigate]);

    // Funciones para manejar el menú y el contenido
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleCloseInicio = () => {
        setShowInicio(false);
    };

    const selectForm = (formType) => {
        setSelectedForm(formType);
    };

    const handleCloseSidebar = () => {
        setSelectedForm(null);
        setSidebarOpen(false);
    };

    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen);
    };

    const handleProfileClick = () => {
        setSelectedForm('profile');
        toggleUserMenu();
    };

    const handleContentClick = () => {
        setSelectedForm('content');
        toggleUserMenu();
    };

    const handleLogout = () => {
        // Eliminar el token de localStorage
        localStorage.removeItem('token');
        // Redirigir al usuario a la página de inicio de sesión
        navigate('/');
    };

    const isFormSelected = selectedForm !== null;

    return (
        <div className={`welcome template d-flex justify-content-center align-items-center vh-100`}>
            <div className={`black-bar ${isFormSelected ? 'hidden' : ''}`}>
                <div className="menu-icon" onClick={toggleSidebar}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <i className="bi bi-person user-icon" onClick={toggleUserMenu}></i>
                {userMenuOpen && (
                    <div className="user-menu">
                        <div className="user-menu-item" onClick={handleContentClick}>
                            <i className="bi bi-house-door"></i> My Content
                        </div>
                        <div className="user-menu-item" onClick={handleProfileClick}>
                            <i className="bi bi-person-circle"></i> Profile
                        </div>
                        <div className="user-menu-item" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right"></i> Log Out
                        </div>
                    </div>
                )}
            </div>
            <div className={`blue-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-options">
                    <div className="sidebar-item" onClick={() => selectForm('save')} aria-label="Generar Ahorro">
                        <i className="bi bi-piggy-bank icon" aria-hidden="true"></i>
                        Generar Ahorro
                    </div>
                    <div className="sidebar-item" onClick={() => selectForm('retirement')} aria-label="Plan de Jubilación">
                        <i className="bi bi-currency-dollar icon" aria-hidden="true"></i>
                        Predicción Moneda
                    </div>
                    <div className="sidebar-item" onClick={() => selectForm('goal')} aria-label="Metas Largo/Corto Plazo">
                        <i className="bi bi-target icon" aria-hidden="true"></i>
                        Tasas de interés
                    </div>
                    <div className="sidebar-item" onClick={() => selectForm('dolar')} aria-label="Dolar">
                        <i className="bi bi-wallet icon" aria-hidden="true"></i>
                        Precio Dolar
                    </div>
                    <div className="sidebar-item" onClick={() => selectForm('gastos')} aria-label="Gastos">
                        <i className="bi bi-wallet icon" aria-hidden="true"></i>
                        Gastos
                    </div>
                    <div className="sidebar-item" onClick={() => selectForm('historial')} aria-label="Historial">
                        <i className="bi bi-wallet icon" aria-hidden="true"></i>
                        Historial
                    </div>
                    <div className={`sidebar-item close-sidebar ${isFormSelected ? '' : 'hidden'}`} onClick={handleCloseSidebar} aria-label="Cerrar">
                        <i className="bi bi-arrow-left-circle icon" aria-hidden="true"></i>
                        Volver
                    </div>
                </div>
            </div>
            <div className={`welcome-message ${showContent && !isFormSelected ? 'show' : ''}`}>
                <h1>Bienvenido, {user.Nombres} {user.Apellidos}</h1>
            </div>
            <div className={`menu-form-container ${showContent ? 'show' : ''}`}>
                {!isFormSelected && <MenuForms userId={user.id} selectedForm={selectedForm} />}
                {selectedForm === 'save' && <Ahorro userId={user.id}/>}
                {selectedForm === 'retirement' && <Jubilacion />}
                {selectedForm === 'goal' && <Metas />}
                {selectedForm === 'dolar' && <Dolar userId={user.id} />}
                {selectedForm === 'gastos' && <Gastos userId={user.id} />}
                {selectedForm === 'historial' && <Historial userId={user.id} />}
                {selectedForm === 'profile' && <Profile user={user} title="Perfil" />}
                {selectedForm === 'content' && <Content user={user} />}
            </div>
            <div className="message-icon">
                <i className="fas fa-comments"></i> {/* Ícono de chat */}
            </div>
        </div>
    );
};

export default Welcome;
