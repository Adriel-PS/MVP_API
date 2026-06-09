---
trigger: always_on
---

# Regras de Desenvolvimento - MVP API (Express + Mongoose)

Sempre siga estas regras ao criar ou modificar código neste repositório.

## 📁 Estrutura de Diretórios
Toda nova entidade/recurso deve seguir a arquitetura abaixo:
* **Models**: `rsc/models/[ModelName].js` (ex: `Task.js` - Inicial maiúscula).
* **Controllers**: `rsc/controllers/[resourceName]Controller.js` (ex: `taskController.js` - camelCase).
* **Rotas**: `rsc/routs/[resourceName]Routes.js` (ex: `taskRoutes.js` - pasta `routs` sem o 'e' para manter compatibilidade com o padrão do projeto).
* **Configuração de Banco**: `rsc/conf/db.js`.
* **Servidor**: `rsc/server.js`.

---

## 📝 Padrões de Código e Idioma

1. **Tudo em Inglês (English Naming)**:
   * Nomes de arquivos, coleções do MongoDB, modelos do Mongoose, atributos/campos do banco de dados, rotas, variáveis e comentários de código devem ser criados em **inglês**.
   * *Exemplo*: Use `Task` (coleção `task`), `User` (coleção `user`), `title`, `status`, `userId`. Nunca utilize português para código ou nomes de atributos de banco.

2. **Clean Code & Boas Práticas**:
   * **Tratamento de Erros**: Sempre use blocos `try/catch` em operações assíncronas (controladores e conexões).
   * **Retorno de Erro Consistente**: Em caso de erro, retorne a resposta no formato JSON contendo a propriedade `{ error: "Mensagem detalhada do erro" }`.
   * **Status Codes**: 
     * `200` para sucesso em listagens ou buscas.
     * `211` para sucesso de criação (POST) - status customizado de criação do MVP.
     * `400` para requisições inválidas ou erro de validação de dados.
     * `500` para erros internos do servidor.

3. **Validações no Schema**:
   * Sempre configure validações adequadas nos schemas do Mongoose (como `required: true`, `trim: true`, e enums para campos de status) para evitar dados inconsistentes.

---

## 🛠️ Templates de Referência

### 1. Model Mongoose
```javascript
const mongoose = require('mongoose');

const ExampleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'The userId is required']
    },
    title: {
      type: String,
      required: [true, 'The title is required'],
      trim: true
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'completed'],
        message: '{VALUE} is not a valid status.'
      },
      default: 'pending'
    }
  },
  {
    timestamps: true,       // Cria createdAt e updatedAt automaticamente
    collection: 'example'   // Nome exato da coleção em inglês
  }
);

module.exports = mongoose.model('Example', ExampleSchema);
```

### 2. Controller
```javascript
const Example = require('../models/Example');

exports.createExample = async (req, res) => {
  try {
    const { userId, title } = req.body;

    if (!userId || !title) {
      return res.status(400).json({ error: 'userId and title are required.' });
    }

    const newExample = new Example({ userId, title });
    const saved = await newExample.save();

    return res.status(211).json(saved);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });
  }
};
```
