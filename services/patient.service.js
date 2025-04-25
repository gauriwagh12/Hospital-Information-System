const Patient = require('../models/patient.model');
const { producer } = require('../config/kafka');

exports.createPatient = async (data) => {
  const patient = new Patient(data);
  await patient.save();

  await producer.connect();
  await producer.send({
    topic: 'patient-events',
    messages: [
      { key: 'patient-created', value: JSON.stringify(patient) }
    ]
  });
  await producer.disconnect();

  return patient;
};

exports.deletePatient = async (id) => {
  const deletedPatient = await Patient.findByIdAndDelete(id);

  if (deletedPatient) {
    await producer.connect();
    await producer.send({
      topic: 'patient-events',
      messages: [
        { key: 'patient-deleted', value: JSON.stringify({ id }) }
      ]
    });
    await producer.disconnect();
  }

  return deletedPatient;
};
