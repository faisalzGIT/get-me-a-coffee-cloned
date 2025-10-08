"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useRef } from "react";


export default function Navbar() {
    const pathname = usePathname();
    const { data } = useSession();
    // console.log("Session data:", data);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    let closeTimeout = null;

    const navItems = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Projects", href: "/projects" },
    ];

    return (
        <nav className="bg-black z-11 text-white flex justify-between items-center px-4 h-[9vh]">
            <Link href={'/'}>
                <div className="logo text-2xl font-bold">Get Me a Coffee!</div>
            </Link>
            <ul className="flex justify-between items-center gap-4">
                {navItems.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className={clsx(
                                "px-3 py-2 rounded-md transition",
                                pathname === item.href
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                            )}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}

                {/* User logged/NotLogged Dropdown */}
                <li className="relative">
                    {data ? (
                        <div>
                            <button
                                id="dropdownDefaultButton"
                                ref={dropdownRef}
                                onClick={() => setIsOpen((open) => !open)}
                                onMouseEnter={() => {
                                    if (closeTimeout) clearTimeout(closeTimeout);
                                    setIsOpen(true);
                                }}
                                onMouseLeave={() => {
                                    closeTimeout = setTimeout(() => setIsOpen(false), 200);
                                }}
                                data-dropdown-toggle="dropdown"
                                className="retro-gradient-btn text-black font-bold rounded-2xl text-base pl-2 pr-3 py-1 text-center inline-flex items-center gap-2 shadow-lg border-2 border-white focus:outline-none focus:ring-4 focus:ring-pink-400 hover:scale-95 transition-transform duration-200"
                                type="button"
                                style={{
                                    background: "linear-gradient(90deg, #ff8a00 0%, #e52e71 100%)",
                                    boxShadow: "0 0 1px 1px #e52e71, 0 0 6px 2px #ff8a00"
                                }}
                            >
                                <img className="w-8 h-8 rounded-xl border border-amber-950" src={data.user.image} alt="User Image" />
                                <span className="text-black">{data.user.name}</span>
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {/* Dropdown menu absolutely positioned below button */}
                            {isOpen && (
                                <div
                                    id="dropdown"
                                    className="absolute left-0 top-full mt-1 z-10 bg-[#f7f7f2] border-2 border-black rounded-md shadow-[4px_4px_0_#e52e71] w-48"
                                    style={{ fontFamily: 'monospace', fontWeight: 'bold' }}
                                    onMouseEnter={() => {
                                        if (closeTimeout) clearTimeout(closeTimeout);
                                        setIsOpen(true);
                                    }}
                                    onMouseLeave={() => {
                                        closeTimeout = setTimeout(() => setIsOpen(false), 200);
                                    }}
                                >
                                    <ul className="py-2 text-base text-black">
                                        <li>
                                            <Link href="/dashboard" className="block px-4 py-2 hover:bg-[#ffe082] transition-colors">Dashboard</Link>
                                        </li>
                                        <li>
                                            <Link href={`/${data.user.name}`} className="block px-4 py-2 hover:bg-[#ffe082] transition-colors">Your Page</Link>
                                        </li>
                                        <li>
                                            <Link href="#" className="block px-4 py-2 hover:bg-[#ffe082] transition-colors">Settings</Link>
                                        </li>
                                        <li>
                                            <Link href="#" className="block px-4 py-2 hover:bg-[#ffe082] transition-colors">Earnings</Link>
                                        </li>
                                        <li>
                                            <button onClick={() => signOut({ callbackUrl: '/' })} className="block w-full text-left px-4 py-2 hover:bg-[#ffe082] transition-colors">Sign out</button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (<>
                            <Link href={"/login"}
                                className={clsx(
                                    "px-3 py-2 rounded-md transition",
                                    "text-gray-300 hover:bg-gray-700 hover:text-white"
                                )}>
                                LogIn
                            </Link>
                        </>
                    )}
                </li>
            </ul>
        </nav>
    );
}