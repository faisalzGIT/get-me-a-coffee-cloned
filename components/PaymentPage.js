"use client"
import React, { useState } from 'react'
import Script from 'next/script'
import Image from 'next/image'
import { initiate } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import Username from '@/app/[username]/page'


const PaymentPage =  ({ username }) => {

    const [paymentform, setPaymentform] = useState({
        name: '',
        message: '',
        amount: ''
    })

    const [orderId, setOrderId] = useState(null)

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const [isLoading, setIsLoading] = useState(false)


    // Move the initiate call into a handler
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            //Get order ID
            const response = await initiate(paymentform.amount, username, paymentform)
            setOrderId(response.id)
            pay(paymentform.amount)
        } catch (error) {
            console.error('Payment initiation failed:', error)
        } finally {
            setIsLoading(false);
        }
    }

    const pay = (amount) => {
        var options = {
            "key": process.env.KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. 
            "currency": "INR",
            "name": "Get me a Coffee", //your business name
            "description": "Support Payment",
            "image": "https://example.com/your_logo",
            "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": paymentform.name, //your customer's name
                "email": "sample@example.com",
                "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }

    // In the form, update the submit handler
    return <>
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

        <div className="firstSec">
            <img className='h-[50vh] w-full' src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/18.gif?token-hash=-am0VJ05gvbRaquqGKRaeH0UdwgTlQg-E6Bqu6ub0wI%3D&token-time=1759536000" alt="" />
        </div>
        <div className="secondSec mb-[10vh]">
            <div className="profileImg rounded-full w-full flex justify-center -mt-20">
                <Image
                    src="/pp.jpg"
                    alt="Profile"
                    width={160}
                    height={160}
                    className="shadow-lg shadow-white rounded-full w-40 h-40 object-cover"
                />
            </div>
            <div className="username">
                <h1 className='text-3xl text-white font-semibold text-center mt-4'>@{username}JB2A</h1>
            </div>
            <div className="desc text-sm">
                <p className='text-center text-white mt-2'>Creating and sharing content that inspires and entertains. Join me on this journey!</p>
            </div>
            <div className="membersPostsAmnt h-[5vh]  text-gray-400 members text-center mt-1 flex justify-center gap-4 items-center">
                <p className='text-sm'>
                    20,150 <span className=''>Members</span>
                </p>
                :
                <p className='text-sm'>
                    150 <span className=''>Posts</span>
                </p>
                :
                <p className='text-sm'>
                    $5,000 <span className=''>per month</span>
                </p>
            </div>
            <div className="joinBtn&memOptsBtn text-center flex flex-col gap-2 mx-auto w-[15vw] mt-4">
                <button className='JoinBTN bg-white hover:bg-grey-100  text-black hover:scale-110 font-bold py-2 px-4 rounded-lg transition-all duration-400'>Join for free</button>
                <button className='moreMembshipOpts bg-red-900 hover:bg-pink-800 text-white hover:scale-110 font-bold py-2 px-4 rounded-lg transition-all duration-400'>Join for free</button>
            </div>
        </div>
        <div className="thirdSec max-w-5xl mb-15 mx-auto text-white flex flex-col md:flex-row items-start justify-center gap-8 w-full px-4">
            {/* Supporters List */}
            <div className="bg-[#161b22] rounded-xl p-8 flex-1 min-w-[300px] shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Supporters</h2>
                <ul className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <li key={i} className="flex items-center gap-3">
                            <span className="inline-block w-11 h-8 p-[1px] bg-gray-700 rounded-full items-center justify-center">
                                <Image src="/avatar.gif" alt="avatar" width={30} height={30} />
                            </span>
                            <span className="text-base">
                                <span className="font-semibold">Shubham</span> donated <span className="font-bold text-green-400">$30</span> with a message <span className="text-pink-400">"I support you bro. Lots of <span className='inline-block'>❤️</span>"</span>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Payment Form */}
            <div className="bg-[#161b22] rounded-xl p-8 flex-1 min-w-[300px] h-fit shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Make a Payment</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input type="text" name='name' onChange={handleChange} placeholder="Enter Name" value={paymentform.name} className="bg-[#222] text-white px-4 py-2 rounded-md outline-none" />
                    <input type="text" name='message' onChange={handleChange} placeholder="Enter Message" value={paymentform.message} className="bg-[#222] text-white px-4 py-2 rounded-md outline-none" />
                    <input type="number" name='amount' onChange={handleChange} placeholder="Enter Amount" value={paymentform.amount} className="bg-[#222] text-white px-4 py-2 rounded-md outline-none" />
                    <button type="submit" className="bg-gradient-to-r from-purple-700 to-pink-600 text-white font-bold py-2 rounded-md mt-2 transition-all">Pay</button>
                    <div className="flex gap-2 mt-2">
                        <button type="button" onClick={() => setPaymentform({ ...paymentform, amount: '10' })}  className="bg-[#222] text-white px-4 py-2 rounded-md">
                            Pay ₹10
                        </button>                        
                        <button type="button" onClick={() => setPaymentform({ ...paymentform, amount: '20' })}  className="bg-[#222] text-white px-4 py-2 rounded-md">
                            Pay ₹20
                        </button>                        
                        <button type="button" onClick={() => setPaymentform({ ...paymentform, amount: '30' })}  className="bg-[#222] text-white px-4 py-2 rounded-md">
                            Pay ₹30
                        </button>  
                    </div>
                </form>
            </div>
        </div>

    </>
}

export default PaymentPage