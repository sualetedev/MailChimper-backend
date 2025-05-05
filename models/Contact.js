const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  tags: [String],
  location: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = model('Contact', contactSchema);
