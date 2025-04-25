const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  admittedDate: Date,
  disease: String
});

module.exports = mongoose.model('Patient', patientSchema);
