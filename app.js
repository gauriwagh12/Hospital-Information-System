const express = require('express');
const app = express();

const patientRoutes = require('./routes/patient.routes');
const doctorRoutes = require('./routes/doctor.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const billingRoutes = require('./routes/billing.routes');  
const medicalRecordRoutes = require('./routes/medicalRecord.routes');

app.use(express.json());
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/billing', billingRoutes); 
app.use('/api/medical-records', medicalRecordRoutes);

module.exports = app;
