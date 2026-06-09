const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;

        const conn = await mongoose.connect(mongoURI, {
            dbName: 'MVP'
        });

        console.log(`MongoDB Conectado: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Erro de conexão com o MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
