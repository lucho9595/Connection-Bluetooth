import React, { useState } from 'react';

const Home = () => {
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [connectedDevices, setConnectedDevices] = useState([]);
    const [connecting, setConnecting] = useState(false);

    const handleSearchDevices = () => {
        if ('bluetooth' in navigator) {
            setConnecting(true);
            navigator.bluetooth
                .requestDevice({ acceptAllDevices: true })
                .then((device) => {
                    const newDevice = {
                        id: device.id,
                        name: device.name,
                    };

                    setSelectedDevice(device);
                    setDevices((prevDevices) => [...prevDevices, newDevice]);

                    device.addEventListener('gattserverdisconnected', handleDisconnect);

                    return device.gatt.connect();
                })
                .then(() => {
                    console.log('Conectado al dispositivo:', selectedDevice.name);
                    setConnectedDevices((prevDevices) => [...prevDevices, selectedDevice]);
                    setConnecting(false);
                })
                .catch((error) => {
                    console.error('Error al buscar dispositivos Bluetooth:', error);
                    setConnecting(false);
                });
        } else {
            console.error('El navegador no admite la Web Bluetooth API');
        }
    };

    const handleDisconnect = (event) => {
        const disconnectedDevice = event.target;
        console.log('Se ha desconectado del dispositivo:', disconnectedDevice.name);
        setConnectedDevices((prevDevices) =>
            prevDevices.filter((device) => device.id !== disconnectedDevice.id)
        );
    };

    return (
        <div className="container text-center">
            <h1>Home</h1>
            <button
                className="btn btn-primary mb-3"
                onClick={handleSearchDevices}
                disabled={connecting}
            >
                {connecting ? 'Se está conectando...' : 'Buscar dispositivos Bluetooth'}
            </button>
            <div>
                {connectedDevices.map((device) => (
                    <div key={device.id}>
                        <h2>Conectado con: {device.name}</h2>
                    </div>
                ))}
            </div>
            {devices.length > 0 && (
                <div>
                    <h2>Dispositivos Bluetooth encontrados:</h2>
                    {devices.map((device) => (
                        <div key={device.id}>
                            <p>ID: {device.id}</p>
                            <p>Nombre: {device.name}</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => setSelectedDevice(device)}
                                disabled={connecting}
                            >
                                Conectar
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
