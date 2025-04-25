const Doctor = require('../models/doctor.model');
const { producer } = require('../config/kafka');

exports.createDoctor = async (data) => {
    // Save doctor in MongoDB
  const doctor = new Doctor(data);
  await doctor.save();

  await producer.connect();

  // Send doctor data as Kafka event
  await producer.send({
    topic: 'doctor-events',
    messages: [
      { key: 'doctor-created', value: JSON.stringify(doctor) }
    ]
  });
  await producer.disconnect();

  return doctor;
};

// ✅ Add this function for deleting a doctor
exports.deleteDoctor = async (id) => {
  const deleted = await Doctor.findByIdAndDelete(id);

  await producer.connect();
  await producer.send({
    topic: 'doctor-events',
    messages: [
      { key: 'doctor-deleted', value: JSON.stringify({ id }) }
    ]
  });
  await producer.disconnect();

  return deleted;
};
