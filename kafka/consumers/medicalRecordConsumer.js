// kafka/consumers/medicalRecordConsumer.js

const { consumer } = require('../../config/kafka');

const startMedicalRecordConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'medical-records-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());
      console.log('📥 Consumed medical record event:', event);
      // You can add custom logic here to process the event
    },
  });

  console.log('✅ Medical Record Consumer is running...');
};

module.exports = startMedicalRecordConsumer;
