const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'O nome é obrigatório'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'O e-mail é obrigatório'],
      unique: true,
      trim: true,
      lowercase: true
    },
    user: {
      type: Boolean, // true = adm, false = padrão
      default: false
    }
  },
  {
    timestamps: true, // Cria e atualiza automaticamente createdAt e updatedAt (data de criação e última modificação)
    collection: 'user' // Define o nome exato da coleção como 'user' dentro do banco de dados MVP
  }
);

module.exports = mongoose.model('User', UserSchema);
