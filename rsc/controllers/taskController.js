const Task = require('../models/Task');

// POST /tasks - Cria uma nova task
exports.criarTask = async (req, res) => {
  try {
    const { userId, title, dueDate, status } = req.body;

    // Validação de dados obrigatórios
    if (!userId || !title || !dueDate) {
      return res.status(400).json({
        error: 'userId, title, and dueDate are required fields.'
      });
    }

    // Cria a task no banco de dados
    const novaTask = new Task({
      userId,
      title,
      dueDate,
      status: status || 'scheduled'
    });

    const taskSalva = await novaTask.save();

    // Retorna com o status 211 (sucesso customizado de criação do MVP)
    return res.status(211).json(taskSalva);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
};

// GET /tasks/user/:userId - Lista todas as tasks de um usuário específico
exports.listarTasksUsuario = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'userId parameter is required.' });
    }

    // Busca todas as tasks do usuário
    const tasks = await Task.find({ userId });

    const agora = new Date();

    // Adiciona a propriedade 'prazoStatus' dinamicamente em tempo de execução
    const tasksComStatus = tasks.map(task => {
      const taskObj = task.toObject();

      if (taskObj.status === 'completed' || taskObj.status === 'cancelled') {
        taskObj.prazoStatus = 'concluido/encerrado';
      } else if (taskObj.status === 'scheduled') {
        const dataLimite = new Date(taskObj.dueDate);
        if (dataLimite < agora) {
          taskObj.prazoStatus = 'atrasada';
        } else {
          taskObj.prazoStatus = 'no prazo';
        }
      } else {
        taskObj.prazoStatus = 'indefinido';
      }

      return taskObj;
    });

    return res.status(200).json(tasksComStatus);
  } catch (error) {
    return res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
};
