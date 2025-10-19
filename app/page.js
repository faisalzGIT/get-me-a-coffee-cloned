"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";
import { useState, useEffect } from 'react';
import { fetchuser } from '@/actions/useractions';
// import {notFound} from 'next/navigation';

export default function Home() {
        const { data } = useSession();
        const [userData, setUserData] = useState(null);

        useEffect(() => {
          const getUserData = async () => {
            if (data?.user?.name) {
              const userInfo = await fetchuser(data.user.name);
              setUserData(userInfo);
            }
          };
          getUserData();
        }, [data]);

    const items = [
    {
      img: "/coin.gif", // replace with your icon path
      title: "Fans want to help",
      desc: "Your fans are available to support you",
    },
    {
      img: "/group.gif", // replace with your icon path
      title: "Fans want to contribute",
      desc: "Your fans are willing to contribute financially",
    },
    {
      img: "/default-avatar.gif", // replace with your icon path
      title: "Fans want to collaborate",
      desc: "Your fans are ready to collaborate with you",
    },
  ];


  return <>
        {data && (
                <div className="mt-16 sm:mt-20 -mb-15 w-full flex justify-center items-center">
                        <img 
                            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2" 
                            src={userData?.profilepic || data.user.image} 
                            alt="User Image" 
                        />
                </div>
            )}
    <div className="min-h-[60vh] w-full max-w-[100vw] flex flex-col items-center justify-center text-center  md:mb-25 -mb-5 px-2 sm:px-4 text-white relative overflow-x-hidden"> 
        <div><img className="w-24 h-24 sm:w-32 sm:h-32" src="/tea.gif" alt="Coffee Cup" /></div>
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-4 bg-gradient-to-bl from-pink-500 to-yellow-500 bg-clip-text text-transparent px-2">Get Me a Coffee!</h1>
        <p className="text-base sm:text-lg md:text-xl px-4">Your support helps us keep the project alive. Thank you!</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4">
            <Link href="/login" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-pink-900 hover:bg-pink-800 text-white hover:scale-110 font-bold py-2 px-4 rounded-3xl transition-all duration-400 text-sm sm:text-base">Get Started</button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-pink-900 hover:bg-pink-800 text-white hover:scale-110 font-bold py-2 px-4 rounded-3xl transition-all duration-400 text-sm sm:text-base">Learn more</button>
            </Link>
        </div>
    </div>

    <div className="dividerr h-[0.5px] bg-blue-50 w-[92vw] m-auto my-1"></div>

    <div className="max-w-7xl mx-auto text-center px-6  pt-20 md:mb-40 ">
        <h2 className="text-2xl md:text-5xl font-bold mb-19 text-amber-100">
          Your Fans can Support You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-[#161b22] transition"
            >
              <Image
                src={item.img}
                alt={item.title}
                width={90}
                height={90}
                unoptimized
                className="mb-4"
              />
              <h3 className="font-bold text-sky-100 text-lg mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
    </div>

    
    <div className="dividerr h-[0.5px] bg-blue-50 w-[92vw] m-auto my-1"></div>

    <div className="Learn-more-abt-us md:mt-30 mt-5 md:mb-40 mb-10  w-full min-h-[50vh] text-white flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl sm:text-2xl md:text-5xl font-bold mb-8 sm:mb-15 text-center">Learn more about us</h2>
        <div className="YTvideo border-x-2 px-4 sm:px-10 py-3 sm:py-5 rounded-4xl w-full max-w-[90vw] sm:max-w-[560px] overflow-hidden">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/iZb0NsF3Xwg?si=bKqv5iHm5FOnZ3ag" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen>
                </iframe>
            </div>
        </div>
    </div>


          

  </>;
}