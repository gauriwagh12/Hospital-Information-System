const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'hospital-app',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const sendDoctorEvent = async (doctorData) => {
  await producer.connect();
  await producer.send({
    topic: 'doctor-events',
    messages: [
      { value: JSON.stringify(doctorData) }
    ]
  });
  console.log('📤 Kafka doctor event sent:', doctorData);
  await producer.disconnect();
};

module.exports = { sendDoctorEvent };