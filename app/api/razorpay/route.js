import Payment from "@/models/payment";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import connectDb from "@/db/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        console.log('Starting payment verification...');
        await connectDb();
        console.log('Database connected');

        let body = await req.formData();
        body = Object.fromEntries(body);
        console.log('Payment callback data received:', {
            order_id: body.razorpay_order_id,
            payment_id: body.razorpay_payment_id,
            has_signature: !!body.razorpay_signature
        });

        // Check if razorpayOrderId is present on the server
        let payment = await Payment.findOne({oid: body.razorpay_order_id});
        console.log('Database query result:', {
            orderIdSearched: body.razorpay_order_id,
            paymentFound: !!payment,
            paymentDetails: payment
        });
        
        if(!payment){
            console.error('Order ID not found:', body.razorpay_order_id);
            return NextResponse.json({ 
                success: false, 
                message: "Order ID not found",
                orderId: body.razorpay_order_id 
            }, { status: 404 });
        }

        // Verify the payment
        const isValid = validatePaymentVerification(
            {
                "order_id": body.razorpay_order_id, 
                "payment_id": body.razorpay_payment_id
            }, 
            body.razorpay_signature, 
            process.env.RAZORPAY_KEY_SECRET  // Using the correct env variable
        );

        if(isValid){
            // Update payment status
            const updatedPayment = await Payment.findOneAndUpdate(
                { oid: body.razorpay_order_id }, 
                { done: true, status: 'completed' }, 
                { new: true }
            );

            if (!updatedPayment) {
                console.error('Failed to update payment');
                return NextResponse.json({ 
                    success: false, 
                    message: "Failed to update payment status" 
                }, { status: 500 });
            }

            console.log('Payment completed successfully:', updatedPayment);
            const redirectUrl = new URL(`/${updatedPayment.to_user}`, process.env.MAIN_URL || 'http://localhost:3000');
            redirectUrl.searchParams.set('paymentdone', 'true');
            
            return NextResponse.redirect(redirectUrl.toString());
        } else {
            console.error('Payment verification failed');
            return NextResponse.json({ 
                success: false, 
                message: 'Payment verification failed' 
            }, { status: 400 });
        }
    } catch (error) {
        console.error('Payment processing error:', error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || 'Internal server error' 
        }, { status: 500 });
    }
}
