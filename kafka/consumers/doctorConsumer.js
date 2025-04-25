const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'hospital-app',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'doctor-group' });

const startDoctorConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'doctor-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value.toString();
      console.log('📩 Received on doctor-events:', value);
    }
  });
};

module.exports = startDoctorConsumer;
