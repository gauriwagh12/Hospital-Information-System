const { producer } = require('../../config/kafka');


const produceMedicalRecordEvent = async (event) => {
  try {
    await producer.connect();
    await producer.send({
      topic: 'medical-records-topic',
      messages: [
        {
          value: JSON.stringify(event),
        },
      ],
    });
    console.log('Medical record event sent:', event);
  } catch (error) {
    console.error('Error producing medical record event:', error);
  }
};

module.exports = { produceMedicalRecordEvent };
