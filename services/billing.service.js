const Billing = require('../models/billing.model');
const { sendBillingNotification } = require('../kafka/producers/billingProducer');

exports.generateBill = async (data) => {
  const { patientId, services } = data;

  const totalAmount = services.reduce((sum, s) => sum + s.cost, 0);

  const bill = new Billing({
    patientId,
    services,
    totalAmount
  });

  await bill.save();

  // 🔔 Send billing event to Kafka
  await sendBillingNotification({
    type: 'bill-generated',
    patientId,
    totalAmount,
    services,
    billingDate: bill.billingDate
  });

  console.log(`💳 Bill generated for patient: ${patientId}, amount: ₹${totalAmount}`);

  return bill;
};
