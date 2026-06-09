const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST /users - Cria um novo usuário
router.post('/', userController.createUser);

// GET /users - Lista todos os usuários
router.get('/', userController.getUsers);

module.exports = router;
