const {Schema, model} = require('mongoose');

const contactSchema = new Schema({
  name: { 
    type: String
   },
  email: { 
    type: String,
     required: true
     },
  tags: [String],
  location: String
});


module.exports = model('Contact', contactSchema);