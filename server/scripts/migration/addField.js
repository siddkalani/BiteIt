const mongoose = require("mongoose");
const OrderHistory = require("../../models/orderHistory"); // Adjust the path as necessary
const dotenv = require("dotenv").config(); // Load environment variables

const uri = process.env.CONNECTION_STRING;

const addPaymentField = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    // Set payment field to 0 (Pending) for all documents that don't have it
    const result = await OrderHistory.updateMany({}, { $set: { payment: 0 } });

    console.log(`${result.modifiedCount} order history records updated with payment field.`);
  } catch (error) {
    console.error("Error updating order history records:", error);
  } finally {
    await mongoose.disconnect();
  }
};

addPaymentField();
