"use server"
import Razorpay from "razorpay"
import Payment from "@/models/payment"
import connectDB from "@/db/connectDB"

export const initiate = async (amount, to_username, paymentform) => {

    try{
        await connectDB();
        var instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET })
    
        let options = {
            amount: Number.parseInt(amount),
            currency: "INR",
        }
        let x = await instance.orders.create(options)
    
        //create payment object which shows a pending payment in the database'
        await Payment.create({oid: x.id, amount: amount, to_username: to_username, name: paymentform.name, message: paymentform.message })
        return x;
    } catch(error){
        console.error('Payment initiation failed:', error);
        throw error; //Re-thrown to handle in component
    }


}