const mongoose = require('mongoose');

const connection = async () => {
    try {
        await mongoose.connect('mongodb://mongo:27017/mailchimper' || 'mongodb://localhost:27017/mailchimper')
    } catch ( error ) {
        console.log("Error al conectar a la base de datos:", error);
    }
}



module.exports = {
    connection
};