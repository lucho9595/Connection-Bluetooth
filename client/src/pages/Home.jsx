import React, { useState } from 'react';

const Home = () => {
    const [devices, setDevices] = useState([]);

    const handleSearchDevices = () => {
        if ('bluetooth' in navigator) {
            navigator.bluetooth
                .requestDevice({ acceptAllDevices: true })
                .then((device) => {
                    const newDevice = {
                        id: device.id,
                        name: device.name,
                    };

                    setDevices([newDevice]);
                })
                .catch((error) => {
                    console.error('Error al buscar dispositivos Bluetooth:', error);
                });
        } else {
            console.error('El navegador no admite la Web Bluetooth API');
        }
    };

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleSearchDevices}>Buscar dispositivos Bluetooth</button>
            <h2>Dispositivos Bluetooth encontrados:</h2>
            {devices.map((device) => (
                <div key={device.id}>
                    <p>ID: {device.id}</p>
                    <p>Nombre: {device.name}</p>
                </div>
            ))}
        </div>
    );
};

export default Home;