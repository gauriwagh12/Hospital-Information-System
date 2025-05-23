const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');

router.post('/', appointmentController.createAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;