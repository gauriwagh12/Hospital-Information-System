const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');

// Create patient
router.post('/', patientController.createPatient);

// Delete patient
router.delete('/:id', patientController.deletePatient); // ✅ Ensure this line is present

module.exports = router;
