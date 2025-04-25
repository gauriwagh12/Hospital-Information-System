const doctorService = require('../services/doctor.service');

exports.createDoctor = async (req, res) => {
  try {
    const doctor = await doctorService.createDoctor(req.body);
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create doctor', error: err.message });
  }
};

// ✅ Add this function for handling delete requests
exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    await doctorService.deleteDoctor(id);
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete doctor', error: err.message });
  }
};
