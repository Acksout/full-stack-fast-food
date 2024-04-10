import mongoose from "mongoose";

// Define user schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} }
}, { minimize: false }); // Set minimize to false to preserve empty objects

// Check if user model already exists, otherwise create a new one
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
