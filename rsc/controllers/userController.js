const User = require('../models/User');

// POST /users - Cria um novo usuário
exports.createUser = async (req, res) => {
  try {
    const { name, email, user } = req.body;

    // Validação de campos obrigatórios
    if (!name || !email) {
      return res.status(400).json({ error: 'name and email are required fields.' });
    }

    // Cria o novo usuário no MongoDB
    const newUser = new User({
      name,
      email,
      user: typeof user === 'boolean' ? user : false
    });

    const savedUser = await newUser.save();
    
    // Retorna o usuário criado com status 211 (sucesso customizado de criação do MVP)
    return res.status(211).json(savedUser);
  } catch (error) {
    // Tratamento de erro para e-mail duplicado
    if (error.code === 11000) {
      return res.status(400).json({ error: 'This email is already in use.' });
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
};

// GET /users - Lista todos os usuários
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
};
