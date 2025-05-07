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
} 
},
 {
     timestamps: true 
    });

module.exports = mongoose.model('Template', templateSchema);
