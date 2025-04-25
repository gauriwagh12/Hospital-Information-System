// appointmentEventConsumer.js
const { Kafka } = require('kafkajs');
const Doctor = require('../../models/doctor.model'); // Ensure the path is correct
const Appointment = require('../../models/appointment.model'); // If needed for cross-check

const kafka = new Kafka({
  clientId: 'hospital-app',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'appointment-events-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'appointment-events', fromBeginning: false });  // Use correct topic name here

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());
      console.log('🔔 Appointment Event Received:', event);

      const { type, data } = event;

      if (!data || !data.doctorId || !data.slot) {
        console.error('❌ Invalid appointment event payload');
        return;
      }

      const { doctorId, slot } = data;

      try {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
          console.error('❌ Doctor not found for ID:', doctorId);
          return;
        }

        if (type === 'appointment-created') {
          // Add slot to bookedSlots (only if not already there)
          if (!doctor.bookedSlots.includes(slot)) {
            doctor.bookedSlots.push(slot);
          }
        } else if (type === 'appointment-deleted') {
          // Remove slot from bookedSlots
          doctor.bookedSlots = doctor.bookedSlots.filter(s => s !== slot);
        }

        await doctor.save();
        console.log(`✅ Doctor ${doctorId} slots updated for event: ${type}`);
      } catch (error) {
        console.error('🔥 Error updating doctor availability:', error);
      }
    },
  });
};

// Ensure you're exporting the function properly
module.exports = run;
