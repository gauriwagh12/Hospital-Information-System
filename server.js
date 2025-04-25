// server.js
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const startPatientConsumer = require('./kafka/consumers/patientEventConsumer');
const startDoctorConsumer = require('./kafka/consumers/doctorConsumer'); 
const startAppointmentConsumer = require('./kafka/consumers/appointmentEventConsumer');  // Correct path

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  startPatientConsumer(); // Start Kafka consumer
  startDoctorConsumer();   
  startAppointmentConsumer();   // ✅ new
});
