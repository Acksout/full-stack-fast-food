import userModel from "../models/userModel.js";

// Add to user cart
const addToCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).json({success: false, message: "User not found"});
        }

        let cartData = userData.cartData || {}; // Initialize cartData if it doesn't exist
        cartData[req.body.itemId] = (cartData[req.body.itemId] || 0) + 1;

        await userModel.findByIdAndUpdate(req.body.userId, {cartData});

        res.json({success: true, message: "Added to cart"});
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
};

// Remove food from user cart
const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).json({success: false, message: "User not found"});
        }

        let cartData = userData.cartData || {}; // Initialize cartData if it doesn't exist
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, {cartData});

        res.json({success: true, message: "Removed from cart"});
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
};

// Get user cart
const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).json({success: false, message: "User not found"});
        }

        const cartData = userData.cartData || {}; // Initialize cartData if it doesn't exist

        res.json({success: true, cartData});
    } catch (error) {
        console.error("Error getting cart:", error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
};

export { addToCart, removeFromCart, getCart };
