const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');

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
  contacts: [{type: mongoose.Schema.Types.ObjectId, ref:'Contact'}]
}, { timestamps: true });

module.exports = model('Audience', audienceSchema);
