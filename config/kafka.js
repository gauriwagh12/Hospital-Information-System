const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'hospital-app',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'hospital-group' });

module.exports = { kafka, producer, consumer };