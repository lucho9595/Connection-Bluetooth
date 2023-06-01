import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from '../firebaseConfig';
import axios from 'axios';

firebase.initializeApp(firebaseConfig);

const RegisterForm = () => {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleRegister = async () => {
        if (password.length < 6) {
            setPasswordError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        try {
            // Usuario registrado correctamente
            await firebase.auth().createUserWithEmailAndPassword(email, password);

            // Enviar datos del usuario al servidor backend
            const payload = {
                email: email,
                password: password
            };
            const response = await axios.post('http://localhost:4000/register', payload);

            // Verificar la respuesta del servidor
            if (response.status === 200) {
                // Registro exitoso en el servidor
                alert('Registro exitoso');
                history('/');
            } else {
                // Registro fallido en el servidor
                alert('Error en el registro');
            }
        } catch (error) {
            // Manejo de errores de registro
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h2>Registro</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <p className="text-danger">{passwordError}</p>}
                </div>
                <button type="button" className="btn btn-primary" onClick={handleRegister}>Registrarse</button>
            </form>
        </div>
    );
};

export default RegisterForm;