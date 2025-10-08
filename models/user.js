import mongoose from "mongoose";
const { Schema, model} = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true,},  
    name: { type: String },
    username: { type: String, required: true, unique: true, lowercase: true,},
    profilepic: { type: String, default: "/default-avatar.gif" },
    coverpic: { type: String, default: "/default-cover.jpg" }
}, { timestamps: true });

// In dev (with hot reloading) this file may be evaluated multiple times.
// Use the already-compiled model if present to avoid 'Cannot overwrite' errors.
const User = mongoose.models.User || model("User", userSchema);
export default User;