// controllers/medicalRecord.controller.js

const {
    addMedicalRecordService,
    getMedicalRecordsByPatientService,
  } = require('../services/medicalRecord.service');
  
  // Add a new medical record
  const addMedicalRecord = async (req, res) => {
    try {
      const record = await addMedicalRecordService(req.body);
      res.status(201).json(record);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get all records for a patient
  const getMedicalRecordsByPatient = async (req, res) => {
    try {
      const records = await getMedicalRecordsByPatientService(req.params.patientId);
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    addMedicalRecord,
    getMedicalRecordsByPatient,
  };
  