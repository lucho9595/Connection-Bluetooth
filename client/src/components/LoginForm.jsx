import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleLogin = async () => {
        try {
            // Usuario ha iniciado sesión correctamente
            await firebase.auth().signInWithEmailAndPassword(email, password);
            alert("Sección Iniciada");
            onLogin(); // Actualizar el estado de autenticación en App
            history('/home');
        } catch (error) {
            // Manejo de errores de inicio de sesión
            console.error(error);
        }
    };

    const handleRegister = () => {
        history('/register');
    };

    const handleSignInWithGoogle = async () => {
        try {
            // Usuario ha iniciado sesión con Google correctamente
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider);
            alert("Sección Iniciada");
            onLogin(); // Actualizar el estado de autenticación en App
            history('/home');
        } catch (error) {
            // Manejo de errores de inicio de sesión con Google
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">Login</h2>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="buttons">
                <button className="btn btn-primary" onClick={handleLogin}>Iniciar sesión</button>
                <button className="btn btn-secondary" onClick={handleRegister}>Registrarse</button>
                <button className="btn btn-danger" onClick={handleSignInWithGoogle}>Iniciar sesión con Google</button>
            </div>
        </div>
    );
};

export default Login;