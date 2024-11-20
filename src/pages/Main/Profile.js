import React, { useState } from 'react';
import { FaUserCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Profile.css';

const Profile = ({ user, title }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const maskPassword = (password) => {
        const maxLength = 10;
        return '*'.repeat(Math.min(password.length, maxLength));
    };

    return (
        <div className="profile-container">
            <div className="profile-photo">
                <FaUserCircle className="profile-icon" />
            </div>
            <h1 className="profile-header">Perfil</h1>
            <h2 className="profile-name">{user.Nombres} {user.Apellidos}</h2>
            <div className="profile-details">
                <p><strong>Email:</strong> {user.Correo}</p>
                <p>
                    <strong>Password:</strong> 
                    <span className="password-field">
                        {showPassword ? user.Password : maskPassword(user.Password)}
                        <button className="toggle-password" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </span>
                </p>

                <button className="guardar-profile">
                    Guardar
                </button>
                {/* Aquí puedes añadir más detalles del perfil si es necesario */}
            </div>
        </div>
    );
};

export default Profile;
