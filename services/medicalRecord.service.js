// services/medicalRecord.service.js

const MedicalRecord = require('../models/medicalRecord.model');

// Add a new medical record
const addMedicalRecordService = async (data) => {
  const newRecord = new MedicalRecord(data);
  return await newRecord.save();
};

// Get all medical records for a patient
const getMedicalRecordsByPatientService = async (patientId) => {
  return await MedicalRecord.find({ patientId });
};

module.exports = {
  addMedicalRecordService,
  getMedicalRecordsByPatientService
};
