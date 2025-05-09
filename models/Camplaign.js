const mongoose = require("mongoose");


const campaignSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
    },
    subject: {
      type: String,
      required: true,
    },
    audienceIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Audience",
      required: true,
    }],
    sendDate: {
      type: Date,
    },
   clickRate: {
    type: Number,
    default: 0,
   },
   html: {
    type: String,
   }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", campaignSchema);
