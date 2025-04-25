const { producer } = require('../../config/kafka');

exports.sendPatientCreatedEvent = async (patient) => {
  await producer.connect();
  await producer.send({
    topic: 'patient-events',
    messages: [
      { key: 'patient-created', value: JSON.stringify(patient) }
    ]
  });
  await producer.disconnect();
};
