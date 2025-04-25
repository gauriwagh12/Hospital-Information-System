const BillingService = require('../services/billing.service');

exports.generateBilling = async (req, res) => {
  try {
    const billingData = req.body; // Get the input from the request body
    const newBilling = await BillingService.generateBill(billingData); // Call the service to create a billing
    res.status(201).json(newBilling); // Return the created billing
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
