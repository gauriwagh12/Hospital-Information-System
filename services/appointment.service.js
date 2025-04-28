const Appointment = require('../models/appointment.model');
const Doctor = require('../models/doctor.model');
const { producer } = require('../kafka/producers/appointmentProducer');

/**
 * Create a new appointment
 * - Prevents double booking by checking doctor's booked slots
 * - Produces notification event for patient
 */
exports.createAppointment = async (data) => {
  const { doctorId, appointmentDate, emergency } = data;

  // ✅ Step 1: Check if the doctor exists
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    throw new Error('Doctor not found');
  }

  // ✅ Step 2: Check if the appointment slot is already booked
  const isAlreadyBooked = doctor.bookedSlots.some(
    slot => new Date(slot).getTime() === new Date(appointmentDate).getTime()
  );

  // ❌ Prevent booking if slot is taken and not an emergency
  if (isAlreadyBooked && !emergency) {
    throw new Error('This time slot is already booked for the doctor.');
  }

  // ✅ Step 3: Create and save the appointment
  const appointment = new Appointment(data);
  await appointment.save();

  // ✅ Step 4: Update the doctor’s bookedSlots array
  doctor.bookedSlots.push(new Date(appointmentDate));
  await doctor.save();

  // ✅ Step 5: Connect to Kafka producer
  await producer.connect();

  // ✅ Step 6: Send notification message to the `notification-events` topic
  const notificationPayload = {
    type: 'appointment-booked',
    patientId: appointment.patientId.toString(), // ensure it's a string
    message: `Your appointment with  ${doctor.name} is confirmed for ${new Date(appointment.appointmentDate).toLocaleString()}.`
  };

  console.log('🚀 Sending appointment notification to Kafka...');
  console.log('📦 Payload:', notificationPayload);

  await producer.send({
    topic: 'notification-events',
    messages: [
      {
        key: 'appointment-notification',
        value: JSON.stringify(notificationPayload)
      }
    ]
  });

  console.log('✅ Notification sent to Kafka successfully!');
  
  // Log the appointment details in the terminal as requested
  console.log(`📅 Appointment Booked:`);
  console.log(`- Patient ID: ${appointment.patientId}`);
  console.log(`- Doctor ID: ${doctor._id}`);
  console.log(`- Appointment Date: ${new Date(appointment.appointmentDate).toLocaleString()}`);
  console.log(`- Message: ${notificationPayload.message}`);

  // ✅ Step 7: Disconnect the producer
  await producer.disconnect();

  // ✅ Step 8: Return the saved appointment
  return appointment;
};

/**
 * Delete an appointment by ID
 * - Sends Kafka event to free up doctor's slot
 */
exports.deleteAppointment = async (id) => {
  // ✅ Find and delete the appointment
  const deleted = await Appointment.findByIdAndDelete(id);
  if (!deleted) throw new Error('Appointment not found');

  // ✅ Remove the deleted slot from the doctor's bookedSlots array
  const doctor = await Doctor.findById(deleted.doctorId);
  if (doctor) {
    doctor.bookedSlots = doctor.bookedSlots.filter(
      slot => new Date(slot).getTime() !== new Date(deleted.appointmentDate).getTime()
    );
    await doctor.save();
  }

  // ✅ Send Kafka message to indicate appointment deletion
  await producer.connect();
  await producer.send({
    topic: 'appointment-events',
    messages: [
      {
        key: 'appointment-deleted',
        value: JSON.stringify({
          doctorId: deleted.doctorId,
          appointmentDate: deleted.appointmentDate
        })
      }
    ]
  });
  await producer.disconnect();

  return deleted;
};