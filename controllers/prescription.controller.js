const prescriptionService = require('../services/prescription.service');

// Controller to create a prescription
const createPrescription = async (req, res) => {
  try {
    const prescription = await prescriptionService.createPrescription(req.body);
    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get all prescriptions
const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await prescriptionService.getAllPrescriptions();
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a prescription by ID
const getPrescriptionById = async (req, res) => {
  try {
    const prescription = await prescriptionService.getPrescriptionById(req.params.id);
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
};
