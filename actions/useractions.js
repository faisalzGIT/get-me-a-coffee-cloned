"use server"
import Razorpay from "razorpay"
import Payment from "@/models/payment"
import User from "@/models/user"
import connectDB from "@/db/connectDB"

export const initiate = async (amount, to_username, paymentform) => {
    try {
        await connectDB();

        // fetch the secret key of the user who is getting the payment
        let user = await User.findOne({ username: to_username });
        
        const userKeyId = user.razorpayid;
        const userSecretKey = user.razorpaysecret;
        if(!userKeyId || !userSecretKey) throw new Error('Recipient has not set up Razorpay');
        

        // Validate inputs
        if (!amount || !to_username || !paymentform.name) {
            throw new Error('Missing required fields');
        }

        const instance = new Razorpay({
            key_id: userKeyId,
            key_secret: userSecretKey
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
        return userData;
    } catch (error) {
        console.error('Fetch user error:', error);
        throw new Error('Fetch user failed: ' + (error.message || 'Unknown error'));
    }
}

export const fetchPayments = async (username) => {
    try {
        await connectDB();
        //find all payments sorted by decreasing order of amount and convert to plain objects
        let payments = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean();

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

export const updateProfile = async (data, oldusername) => {
    try {
        await connectDB();
        const ndata = Object.fromEntries(data);
        console.log('Updating profile with data:', ndata); // Debug log

        // Find the user first
        const existingUser = await User.findOne({ username: oldusername });
        if (!existingUser) {
            return { error: "User not found" };
        }

        // If username is being updated, check availability
        if (oldusername !== ndata.username) {
            const usernameExists = await User.findOne({ username: ndata.username });
            if (usernameExists) {
                return { error: "Username already exists" };
            }
        }

        // Update the user by username
        const result = await User.findOneAndUpdate(
            { username: oldusername },
            { 
                $set: {
                    name: ndata.name || existingUser.name,
                    username: ndata.username || existingUser.username,
                    profilepic: ndata.profilepic || existingUser.profilepic,
                    coverpic: ndata.coverpic || existingUser.coverpic,
                    razorpayid: ndata.razorpayid || existingUser.razorpayid,
                    razorpaysecret: ndata.razorpaysecret || existingUser.razorpaysecret
                }
            },
            { new: true, lean: true } // Return the updated document as a plain JS object
        );

        //Now update all payments to reflect new username if it was changed
        if (oldusername !== ndata.username) {
            await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username });
        }

        if (!result) {
            return { error: "Failed to update profile" };
        }

        // Return a plain object with only the needed fields
        return {
            success: true,
            user: {
                name: result.name,
                username: result.username,
                profilepic: result.profilepic,
                coverpic: result.coverpic,
                razorpayid: result.razorpayid,
                razorpaysecret: result.razorpaysecret
            }
        };
    } catch (error) {
        console.error('Update profile error:', error);
        return { error: error.message || "Failed to update profile" };
    }
};