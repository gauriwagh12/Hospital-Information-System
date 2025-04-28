const Prescription = require('../models/prescription.model');
const { sendPrescriptionEvent } = require('../kafka/producers/prescriptionProducer');

// Create a new prescription
const createPrescription = async (prescriptionData) => {
  const prescription = new Prescription(prescriptionData);
  await prescription.save();

  // Produce event to Kafka
  await sendPrescriptionEvent('PrescriptionCreated', prescription);

  return prescription;
};

// Get all prescriptions
const getAllPrescriptions = async () => {
  return await Prescription.find();
};

// Get a prescription by ID
const getPrescriptionById = async (id) => {
  return await Prescription.findById(id);
};

module.exports = {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
};
