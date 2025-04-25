const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  experience: Number,
  contact: String,
  bookedSlots: [Date] // to track appointment times
});

module.exports = mongoose.model('Doctor', doctorSchema);
