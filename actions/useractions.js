"use server"
import Razorpay from "razorpay"
import Payment from "@/models/payment"
import User from "@/models/user"
import connectDB from "@/db/connectDB"

export const initiate = async (amount, to_username, paymentform) => {
    try {
        await connectDB();
        
        // Validate inputs
        if (!amount || !to_username || !paymentform.name) {
            throw new Error('Missing required fields');
        }

        const instance = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const options = {
            amount: Number(amount) * 100, // convert to paise
            currency: "INR",
        };

        const order = await instance.orders.create(options);
        console.log('Razorpay order created:', order);

        // Create payment record
        const payment = await Payment.create({
            oid: order.id,
            amount: Number(amount),
            to_user: to_username,
            name: paymentform.name,
            message: paymentform.message || '',
            status: 'pending'
        });
        console.log('Payment record created:', payment);

        return order;
    } catch (error) {
        console.error('Payment initiation error:', error);
        throw new Error('Payment initiation failed: ' + (error.message || 'Unknown error'));
    }
}

export const fetchuser = async (username) => {
    try {
        await connectDB();
        let user = await User.findOne({ username: username }).select('-email -__v -createdAt -updatedAt').lean();
        if (!user) {
            throw new Error('User not found');
        }
        // Convert MongoDB document to plain object
        const userData = {
            ...user,
            _id: user._id.toString()
        };
    } catch (error) {
        console.error('Fetch user error:', error);
        throw new Error('Fetch user failed: ' + (error.message || 'Unknown error'));
    }
}  

export const fetchPayments = async (username) => {
    try {
        await connectDB();
        //find all payments sorted by decreasing order of amount and convert to plain objects
        let payments = await Payment.find({to_user:username}).sort({amount:-1}).lean();
        
        // Convert MongoDB documents to plain objects and ensure proper date serialization
        const plainPayments = payments.map(payment => ({
            ...payment,
            _id: payment._id.toString(),
            createdAt: payment.createdAt ? payment.createdAt.toISOString() : null,
            updatedAt: payment.updatedAt ? payment.updatedAt.toISOString() : null
        }));
        
        return plainPayments;
    } catch (error) {
        console.error('Fetch payments error:', error);
        throw new Error('Fetch payments failed: ' + (error.message || 'Unknown error'));
    }
}