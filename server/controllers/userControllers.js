// Importar el módulo User
const User = require('../modules/user');

// Array para almacenar los usuarios registrados
const users = [];

// Registro de usuario
const registerUser = (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new User(email, password);

        users.push(user);

        res.status(200).json({ msg: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.log(error)
    }
};

// Inicio de sesión
const loginUser = (req, res) => {
    const { email, password } = req.body;

    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
        res.status(200).json({ msg: 'Usuario ha iniciado sesión' });
    } else {
        res.status(401).send({ msg: 'Credenciales inválidas' });
    }
};

// Obtener todos los usuarios
const getAllUsers = (req, res) => {
    res.send(users);
};

// Obtener un usuario por su ID
const getUserById = (req, res) => {
    const userId = req.params.id;

    const user = users.find((user) => user.id === userId);

    if (user) {
        res.send(user);
    } else {
        res.status(404).send('Usuario no encontrado');
    }
};

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
};
