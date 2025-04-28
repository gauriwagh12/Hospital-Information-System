
const { consumer } = require('../../config/kafka');

const startPatientConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'patient-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      console.log(`📩 Received on ${topic}:`, message.value.toString());
    }
  });
};

module.exports = startPatientConsumer;
