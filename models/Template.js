const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', required: true
},
  name: { 
    type: String,
     required: true 
    },
  content: { 
    type: Object, 
    required: true 
} // Guarda el JSON del editor drag-and-drop
},
 {
     timestamps: true 
    });

module.exports = mongoose.model('Template', templateSchema);
