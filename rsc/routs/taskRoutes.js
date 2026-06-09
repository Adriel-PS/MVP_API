const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// A) Criar Task (POST /tasks)
router.post('/', taskController.criarTask);

// B) Listar Tasks de um Usuário (GET /tasks/user/:userId)
router.get('/user/:userId', taskController.listarTasksUsuario);

module.exports = router;
