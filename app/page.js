"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
        const { data } = useSession()

    const items = [
    {
      img: "/avatar.gif", // replace with your icon path
      title: "Fans want to help",
      desc: "Your fans are available to support you",
    },
    {
      img: "/coin.gif", // replace with your icon path
      title: "Fans want to contribute",
      desc: "Your fans are willing to contribute financially",
    },
    {
      img: "/group.gif", // replace with your icon path
      title: "Fans want to collaborate",
      desc: "Your fans are ready to collaborate with you",
    },
  ];


  return <>
    <div className="h-[60vh] flex flex-col items-center justify-center text-center pt-4 mb-25 px-4 text-white  relative"> 
        {data && (
                <div className="mt-20">
                        <img className="w-32 h-32 rounded-full" src={data.user.image} alt="User Image" />
                </div>
            )}
        <div><img className="w-32 h-32" src="/tea.gif" alt="Coffee Cup" /></div>
        <h1 className="text-4xl md:text-7xl font-bold mb-4 bg-gradient-to-bl from-pink-500 to-yellow-500 bg-clip-text text-transparent">Get Me a Coffee!</h1>
        <p className="text-lg md:text-xl">Your support helps us keep the project alive. Thank you!</p>
        <div className="mt-6 flex gap-4">
            <button className="bg-pink-900 hover:bg-pink-800 text-white hover:scale-110 font-bold py-2 px-4 rounded-3xl transition-all duration-400">Get Started</button>
            <button className="bg-pink-900 hover:bg-pink-800 text-white hover:scale-110 font-bold py-2 px-4 rounded-3xl transition-all duration-400">Learn more</button>
        </div>
    </div>

    <div className="max-w-7xl mx-auto text-center px-6  pt-20 mb-40">
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
                className="mb-4"
              />
              <h3 className="font-bold text-sky-100 text-lg mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
    </div>

    

    <div className="Learn-more-abt-us mt-30 mb-40 w-full h-[50vh] text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-5xl font-bold mb-15">Learn more about us</h2>
        <div className="YTvideo border-x-2 px-10 py-5 rounded-4xl">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/NcWqHG1ye3g?si=8F_CV-RPHt3GEbny" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
    </div>


          

  </>;
}