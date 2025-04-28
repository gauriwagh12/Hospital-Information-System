const { producer } = require('../../config/kafka');

const sendPrescriptionEvent = async (prescription) => {
  await producer.connect();
  await producer.send({
    topic: 'prescription-events',
    messages: [
      { value: JSON.stringify(prescription) }
    ],
  });
  await producer.disconnect();
};

module.exports = { sendPrescriptionEvent };
