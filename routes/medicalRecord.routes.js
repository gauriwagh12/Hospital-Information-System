// routes/medicalRecord.routes.js

const express = require('express');
const router = express.Router();
const {
  addMedicalRecord,
  getMedicalRecordsByPatient
} = require('../controllers/medicalRecord.controller');

router.post('/add', addMedicalRecord);
router.get('/patient/:patientId', getMedicalRecordsByPatient);

module.exports = router;
