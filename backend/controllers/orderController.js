import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place User Order for Frontend
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charge"
                },
                unit_amount: 60 * 100
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${process.env.BASE_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${process.env.BASE_URL}/verify?success=false&orderId=${newOrder._id}`,
            line_items: line_items,
            mode: 'payment',
            billing_address_collection: 'required',
        });

        res.json({success: true, session_url: session.url});

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
};

// List Orders for Admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success: true, data: orders});
    } catch (error) {
        console.error("Error listing orders:", error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
};

// User Orders for Frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({success: true, data: orders});
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
};

// Update Order Status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({success: true, message: "Status updated"});
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
};

// Verify Order Payment
const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            res.json({success: true, message: "Order paid"});
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false, message: "Order not paid"});
        }
    } catch (error) {
        console.error("Error verifying order payment:", error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
};

export { placeOrder, listOrders, userOrders, updateStatus, verifyOrder };
