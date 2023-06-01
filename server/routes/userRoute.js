const express = require('express');
const userControllers = require('../controllers/userControllers');

const router = express.Router();

//post del user register
router.post('/register', userControllers.registerUser);
//post del user login
router.post('/login', userControllers.loginUser);
//obtener todos lo usuarios:
router.get('/', userControllers.getAllUsers);
//obtener un usuario en especifico:
router.get('/:id', userControllers.getUserById);

module.exports = router;