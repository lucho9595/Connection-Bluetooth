import React, { useState } from 'react';

const Home = () => {
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [connectedDevice, setConnectedDevice] = useState(null);
    const [receivedData, setReceivedData] = useState('');

    const handleSearchDevices = () => {
        if ('bluetooth' in navigator) {
            navigator.bluetooth
                .requestDevice()
                .then((device) => {
                    const newDevice = {
                        id: device.id,
                        name: device.name,
                    };
                    setSelectedDevice(device);
                    setDevices([newDevice]);
                    setReceivedData('');

                    device.addEventListener('gattserverdisconnected', handleDisconnect);

                    return device.gatt.connect();
                })
                .then((gattServer) => {
                    console.log('Conectado al dispositivo:', selectedDevice.name);
                    setConnectedDevice(selectedDevice);

                    // Realiza cualquier acción adicional necesaria en la conexión, como leer/escribir características o servicios

                    // Ejemplo de lectura de una característica
                    return gattServer.getPrimaryService('servicio_uuid')
                        .then((service) => service.getCharacteristic('caracteristica_uuid'))
                        .then((characteristic) => characteristic.readValue());
                })
                .then((value) => {
                    console.log('Datos recibidos:', value);
                    setReceivedData(value);
                })
                .catch((error) => {
                    console.error('Error al buscar dispositivos Bluetooth:', error);
                });
        } else {
            console.error('El navegador no admite la Web Bluetooth API');
        }
    };

    const handleDisconnect = () => {
        console.log('Se ha desconectado del dispositivo:', connectedDevice.name);
        setConnectedDevice(null);
        setReceivedData('');
    };

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleSearchDevices}>Buscar dispositivos Bluetooth</button>
            {devices.length > 0 && (
                <div>
                    <h2>Dispositivos Bluetooth encontrados:</h2>
                    {devices.map((device) => (
                        <div key={device.id}>
                            <p>ID: {device.id}</p>
                            <p>Nombre: {device.name}</p>
                            <button onClick={() => setSelectedDevice(device)}>Conectar</button>
                        </div>
                    ))}
                </div>
            )}
            {connectedDevice && (
                <div>
                    <h2>Conectado con: {connectedDevice.name}</h2>
                    <button onClick={handleDisconnect}>Desconectar</button>
                    <h3>Datos recibidos:</h3>
                    <p>{receivedData}</p>
                </div>
            )}
        </div>
    );
};

export default Home;