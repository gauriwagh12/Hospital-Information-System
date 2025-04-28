const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescription.controller');

// Add new prescription
router.post('/add', prescriptionController.createPrescription);

// Get all prescriptions
router.get('/', prescriptionController.getAllPrescriptions);

// Get prescription by ID
router.get('/:id', prescriptionController.getPrescriptionById);

module.exports = router;
