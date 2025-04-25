const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'hospital-app',
  brokers: ['localhost:9092']
});

exports.producer = kafka.producer();
