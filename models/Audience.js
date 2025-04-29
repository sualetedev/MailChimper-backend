const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');
const contactSchema = require('./Contact').schema; // Importar el esquema de Contact.js

const audienceSchema = new mongoose.Schema({
  userId: { 
    type: Schema.Types.ObjectId,
     ref: 'User', 
     required: true
     },
  name: { 
    type: String,
     required: true 
    },
  contacts: [contactSchema]
}, { timestamps: true });

module.exports = model('Audience', audienceSchema);
