import mongoose from "mongoose";

// Define order schema
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Food Processing" },
    date: { type: Date, default: Date.now },
    payment: { type: Boolean, default: false }
});

// Check if order model already exists, otherwise create a new one
const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
