require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const startPatientConsumer = require('./kafka/consumers/patientEventConsumer');
const startDoctorConsumer = require('./kafka/consumers/doctorConsumer');
const startAppointmentConsumer = require('./kafka/consumers/appointmentEventConsumer');
const startMedicalRecordConsumer = require('./kafka/consumers/medicalRecordConsumer');

 // Add this line

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  startPatientConsumer();
  startDoctorConsumer();
  startAppointmentConsumer();
  startMedicalRecordConsumer();  // Add this line to start the medical record consumer
});
