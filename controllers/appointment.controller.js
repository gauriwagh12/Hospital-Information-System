const appointmentService = require('../services/appointment.service');

exports.createAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.createAppointment(req.body);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create appointment', error: err.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const deleted = await appointmentService.deleteAppointment(req.params.id);
    res.status(200).json({ message: 'Appointment deleted', deleted });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete appointment', error: err.message });
  }
};