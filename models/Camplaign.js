const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
  openRate: { type: Number, default: 0 },
  clickRate: { type: Number, default: 0 }
});

const campaignSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', required: true },
  templateId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template'
 }, // puede ser NULL
  manualContent: { type: 
    String
 }, // HTML o texto puro manual
  subject: { type: 
    String, 
    required: true
 },
  audienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Audience',
     required: true
     },
  sendDate: {
     type: Date
     },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'sent'],
    default: 'draft' },
  statistics: {
    type: statisticsSchema,
    default: () => ({})
}
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);
