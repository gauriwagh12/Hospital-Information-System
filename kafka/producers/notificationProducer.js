const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'hospital-app',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const sendNotification = async (message) => {
  await producer.connect();
  await producer.send({
    topic: 'notification-events',
    messages: [
      {
        key: 'notify',
        value: JSON.stringify(message),
      },
    ],
  });
  await producer.disconnect();
};

module.exports = { sendNotification };
