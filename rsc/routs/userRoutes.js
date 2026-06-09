const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /users - Cria um novo usuário
router.post('/', async (req, res) => {
  try {
    const { name, email, user } = req.body;

    // Validação de campos obrigatórios
    if (!name || !email) {
      return res.status(400).json({ error: 'Os campos "name" e "email" são obrigatórios.' });
    }

    // Cria o novo usuário no MongoDB
    const newUser = new User({
      name,
      email,
      user: typeof user === 'boolean' ? user : false
    });

    const savedUser = await newUser.save();
    
    // Retorna o usuário criado com _id, createdAt e updatedAt gerados automaticamente
    res.status(201).json(savedUser);
  } catch (error) {
    // Tratamento de erro para e-mail duplicado
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
    }
    
    res.status(500).json({ error: `Erro ao salvar usuário: ${error.message}` });
  }
});

// GET /users - Rota auxiliar para listar todos os usuários e facilitar os testes
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: `Erro ao buscar usuários: ${error.message}` });
  }
});

module.exports = router;
