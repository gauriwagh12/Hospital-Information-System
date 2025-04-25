const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller');

router.post('/', doctorController.createDoctor);

// ✅ Delete route
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;
