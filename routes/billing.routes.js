// routes/billing.routes.js
const express = require('express');
const router = express.Router();
const BillingController = require('../controllers/billing.controller');

// Define the route for generating billing
router.post('/generate', BillingController.generateBilling);


module.exports = router;
