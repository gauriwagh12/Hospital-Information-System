const { consumer } = require('../../config/kafka');

const startConsumer = async () => {
  // ✅ Connect to Kafka broker
  await consumer.connect();

  // ✅ Subscribe to the topic where notifications are published
  await consumer.subscribe({ topic: 'notification-events', fromBeginning: true });

  // ✅ Start listening for messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        // ✅ Parse the incoming message from Kafka
        const parsed = JSON.parse(message.value.toString());

        // ✅ Check if the necessary fields are present in the message
        if (!parsed.patientId || !parsed.message) {
          console.error('❌ Invalid appointment event payload: Missing patientId or message');
          return; // Exit early if the payload is invalid
        }

        // ✅ Log the notification details in a friendly format
        console.log('📩 Notification received:');
        console.log(`- Type: ${parsed.type || 'N/A'}`);
        console.log(`- To (Patient ID): ${parsed.patientId || parsed.to}`);
        console.log(`- Message: ${parsed.message}`);
        console.log('-----------------------------------\n');
      } 
      catch (error) {
        // ✅ Log any error encountered during the processing of the message
        // console.error('❌ Failed to process notification message:', error.message);
      }
    }
  });
};

module.exports = startConsumer;
