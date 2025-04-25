const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  services: [{
    name: String,
    cost: Number
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  billingDate: {
    type: Date,
    default: Date.now
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  }
});

module.exports = mongoose.model('Billing', billingSchema);
