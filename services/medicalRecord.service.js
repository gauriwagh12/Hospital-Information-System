const { produceMedicalRecordEvent } = require('../kafka/producers/medicalRecordProducer');
const MedicalRecord = require('../models/medicalRecord.model');

// Add a new medical record
const addMedicalRecordService = async (data) => {
  const newRecord = new MedicalRecord(data);
  const savedRecord = await newRecord.save();

  // Trigger Kafka event after saving the record
  await produceMedicalRecordEvent({ action: 'create', data: savedRecord });

  return savedRecord;
};

// Get all medical records for a patient
const getMedicalRecordsByPatientService = async (patientId) => {
  return await MedicalRecord.find({ patientId });
};

module.exports = {
  addMedicalRecordService,
  getMedicalRecordsByPatientService
};
