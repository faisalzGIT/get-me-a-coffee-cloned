import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const paymentSchema = new Schema({
    name: { type: String, required: true },
    to_user: { type: String, required: true },  
    oid: { type: String, required: true },
    message: { type: String },
    amount: { type: Number, required: true },
    done: { type: Boolean, default: false }
}, { timestamps: true });

export default models.Payment || model("Payment", paymentSchema);      