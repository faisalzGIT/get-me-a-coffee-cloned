import mongoose from "mongoose";
const { Schema, model} = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true,},  
    name: { type: String },
    username: { type: String, required: true, unique: true, lowercase: true,},
    profilepic: { type: String, default: "https://i.pinimg.com/736x/db/3a/62/db3a623acc8396fb285ec899ad01cd10.jpg" },
    coverpic: { type: String, default: "https://marketplace.canva.com/EAE0b4yHuM0/1/0/1600w/canva-purple-and-pink-abstract-linkedin-banner-j3pCRhiuM_Y.jpg" },
    razorpayid: { type: String, default: "" },
    razorpaysecret: { type: String, default: "" }
}, { timestamps: true });

// In dev (with hot reloading) this file may be evaluated multiple times.
// Use the already-compiled model if present to avoid 'Cannot overwrite' errors.
const User = mongoose.models.User || model("User", userSchema);
export default User;