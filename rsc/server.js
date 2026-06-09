require('dotenv').config();
const express = require('express');
const connectDB = require('./conf/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao Banco de Dados
connectDB();

// Middlewares
app.use(express.json());

// Importar Rotas
const userRoutes = require('./routs/userRoutes');

// Rota de Teste
app.get('/', (req, res) => {
  res.json({ message: "API está rodando e conectada ao MongoDB com sucesso!" });
});

// Registrar Rotas
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
