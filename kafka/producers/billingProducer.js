// billingProducer.js
const { producer } = require('../../config/kafka');


// Send billing notification to Kafka
const sendBillingNotification = async (billingData) => {
  await producer.connect();
  await producer.send({
    topic: 'billing-topic',
    messages: [
      {
        value: JSON.stringify(billingData)
      }
    ]
  });
  console.log('📤 Billing event sent to Kafka:', billingData);
};

module.exports = { sendBillingNotification };