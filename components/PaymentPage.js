// Client Component
'use client'
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import Image from 'next/image'
import { initiate, fetchuser, fetchPayments } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'


const PaymentPage = ({ username }) => {

    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData();
    }, [username]); // Re-fetch when username changes

    useEffect(() => {

        if(searchParams.get("paymentdone") == "true")
        toast.success('Payment Successfull!', {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        router.push(`/${username}`)

    }, [])

    //Code for listing the supporters starts here
    const [currentUser, setCurrentUser] = useState({});
    const [payments, setPayments] = useState([]);

    const getData = async () => {
        try {
            // Add a small delay to ensure database is updated
            await new Promise(resolve => setTimeout(resolve, 100));

            const u = await fetchuser(username);
            if (u) {
                // Make sure we're getting the correct field values
                console.log('Fetched user data:', {
                    profilepic: u.profilepic,
                    coverpic: u.coverpic
                });

                // Ensure fields are properly set
                const userData = {
                    ...u,
                    profilepic: u.profilepic,
                    coverpic: u.coverpic
                };
                setCurrentUser(userData);
            }

            const dbpayments = await fetchPayments(username);
            if (dbpayments) {
                setPayments(dbpayments);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    } //Code for listing the supporters ends here



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


    // Update handleSubmit to handle errors better
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!paymentform.amount || !paymentform.name) {
                throw new Error('Please fill in all required fields');
            }
            const response = await initiate(paymentform.amount, username, paymentform);
            console.log('Payment initiation response:', response);

            if (!response || !response.id) {
                throw new Error('Invalid response from payment initiation');
            }

            const orderId = response.id;
            setOrderId(orderId);
            console.log('Setting order ID:', orderId);
            pay(Number(paymentform.amount), orderId);
        } catch (error) {
            console.error('Payment initiation failed:', error);
            alert(error.message || 'Payment initiation failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    const pay = (amount, orderIdToUse) => {
        console.log('Initiating payment with:', { amount, orderIdToUse });
        const options = {
            "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            "amount": amount * 100,
            "currency": "INR",
            "name": "Get me a Coffee",
            "description": "Support Payment",
            "image": "/coin.gif",
            "order_id": orderIdToUse,
            "handler": function (response) {
                console.log('Payment successful, response:', response);
                const formData = new FormData();
                formData.append('razorpay_payment_id', response.razorpay_payment_id);
                formData.append('razorpay_order_id', orderIdToUse); // Use the order ID we created
                formData.append('razorpay_signature', response.razorpay_signature);

                fetch('/api/razorpay', {
                    method: 'POST',
                    body: formData
                })
                    .then(response => {
                        if (response.ok) {
                            window.location.href = `/${username}?paymentdone=true`;
                        } else {
                            throw new Error('Payment verification failed');
                        }
                    })
                    .catch(error => {
                        console.error('Payment verification error:', error);
                        alert('Payment verification failed. Please contact support.');
                    });
            },
            "prefill": {
                "name": paymentform.name,
                "email": "sample@example.com",
                "contact": "+919876543210"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const razorpayInstance = new Razorpay(options);
        razorpayInstance.open();
    }
    // In the form, update the submit handler

    return <>
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

        <ToastContainer />

        <div className="firstSec">
            <Image
                className="h-[70vh] w-full object-cover"
                src={currentUser?.coverpic || "https://marketplace.canva.com/EAE0b4yHuM0/1/0/1600w/canva-purple-and-pink-abstract-linkedin-banner-j3pCRhiuM_Y.jpg"}
                alt="Profile Banner"
                width={1920}
                height={1080}
                priority
                unoptimized
                loader={({ src }) => src}
            />
        </div>
        <div className="secondSec mb-[10vh]">
            <div className="profileImg rounded-full w-full flex justify-center -mt-100">
                <Image
                    src={currentUser?.profilepic || "https://i.pinimg.com/736x/db/3a/62/db3a623acc8396fb285ec899ad01cd10.jpg"}
                    alt="Profile"
                    width={160}
                    height={160}
                    unoptimized
                    loader={({ src }) => src}
                    className="shadow-lg shadow-white rounded-full w-40 h-40 object-cover"
                />
            </div>
            <div className="username">
                <h1 className='text-3xl text-white font-semibold text-center mt-4'>@{username}</h1>
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
            <div className="bg-[#161b22] rounded-xl p-8 flex-1 min-w-[300px] h-[58vh] shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Supporters</h2>
                <ul className="space-y-4 overflow-scroll overflow-x-hidden h-[40vh]">
                    {payments.length === 0 && <p className="text-gray-400">No supporters yet. Be the first to support!</p>}
                    {payments.map((p, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <span className=" inline-block w-8 h-8 bg-gray-700 rounded-full items-center justify-center">
                                <Image src="https://i.pinimg.com/736x/db/3a/62/db3a623acc8396fb285ec899ad01cd10.jpg" alt="avatar" className='rounded-full' unoptimized width={30} height={30} />
                            </span>
                            <span className="text-base">
                                <span className="font-semibold">{p.name}</span> donated <span className="font-bold text-green-400">₹{p.amount}</span> with a message <span className="text-pink-400">"{p.message}"</span>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Payment Form */}
            <div className="bg-[#161b22] rounded-xl p-8 flex-1 min-w-[300px] h-[58vh] shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Make a Payment</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input type="text" name='name' onChange={handleChange} placeholder="Enter Name" value={paymentform.name} className="bg-[#222] text-white px-4 py-2 rounded-md outline-none" />
                    <input type="text" name='message' onChange={handleChange} placeholder="Enter Message" value={paymentform.message} className="bg-[#222] text-white px-4 py-2 rounded-md outline-none" />
                    <input type="number" name='amount' onChange={handleChange} placeholder="Enter Amount" value={paymentform.amount} className="bg-[#222] text-white px-4 py-2 rounded-md outline-none" />
                    <button type="submit" className="bg-gradient-to-r from-purple-700 to-pink-600 text-white font-bold py-2 rounded-md mt-2 transition-all">Pay</button>
                    <div className="flex gap-2 mt-2">
                        <button type="button" onClick={() => setPaymentform({ ...paymentform, amount: '10' })} className="bg-[#222] text-white px-4 py-2 rounded-md">
                            Pay ₹10
                        </button>
                        <button type="button" onClick={() => setPaymentform({ ...paymentform, amount: '20' })} className="bg-[#222] text-white px-4 py-2 rounded-md">
                            Pay ₹20
                        </button>
                        <button type="button" onClick={() => setPaymentform({ ...paymentform, amount: '30' })} className="bg-[#222] text-white px-4 py-2 rounded-md">
                            Pay ₹30
                        </button>
                    </div>
                </form>
            </div>
        </div>

    </>
}

export default PaymentPage