"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useRef, useEffect } from "react";
import { fetchuser } from '@/actions/useractions';


export default function Navbar() {
    const pathname = usePathname();
    const { data } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [userData, setUserData] = useState(null);
    const dropdownRef = useRef(null);
    let closeTimeout = null;

    useEffect(() => {
        const getUserData = async () => {
            if (data?.user?.name) {
                const userInfo = await fetchuser(data.user.name);
                setUserData(userInfo);
            }
        };
        getUserData();
    }, [data]);

    // Debounced resize handler
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    // Check if we're on mobile
    useEffect(() => {
        const checkIfMobile = debounce(() => {
            setIsMobile(window.innerWidth < 768); // 768px is the md breakpoint in Tailwind
        }, 100); // Debounce resize events to improve performance
        
        // Check initially
        checkIfMobile();
        
        // Add event listener for window resize with passive option
        window.addEventListener('resize', checkIfMobile, { passive: true });
        
        // Cleanup
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    // Handle clicks outside of dropdown with improved performance
    useEffect(() => {
        if (!isMobile) return; // Don't add listeners if not mobile

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // Use RAF to avoid blocking the main thread
                requestAnimationFrame(() => setIsOpen(false));
            }
        };

        // Add event listeners with passive option for better scroll performance
        document.addEventListener('mousedown', handleClickOutside, { passive: true });
        document.addEventListener('touchstart', handleClickOutside, { passive: true });

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isMobile]);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Developer", href: "https://faisalzportfolio.netlify.app/" },
    ];

    return (
        <nav className="bg-black z-11 text-white flex justify-between items-center px-2 sm:px-4 h-[9vh] w-full">
            <Link href={'/'}>
                <div className="logo text-sm sm:text-lg md:text-2xl font-bold">Get Me a Coffee!</div>
            </Link>
            <ul className="flex justify-between items-center gap-2 sm:gap-4">
                {navItems.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className={clsx(
                                "px-2 sm:px-3 py-1 sm:py-2 text-[12px] sm:text-base rounded-md transition",
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
                        <div className="flex justify-between items-center">
                            <button
                                id="dropdownDefaultButton"
                                ref={dropdownRef}
                                onClick={(e) => {
                                    e.preventDefault();
                                    requestAnimationFrame(() => setIsOpen(prev => !prev));
                                }}
                                onMouseEnter={() => {
                                    if (!isMobile) {
                                        if (closeTimeout) {
                                            clearTimeout(closeTimeout);
                                            closeTimeout = null;
                                        }
                                        requestAnimationFrame(() => setIsOpen(true));
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (!isMobile) {
                                        closeTimeout = setTimeout(() => {
                                            requestAnimationFrame(() => setIsOpen(false));
                                        }, 150);
                                    }
                                }}
                                data-dropdown-toggle="dropdown"
                                className="retro-gradient-btn md:h-12 h-10 text-black font-bold md:rounded-2xl rounded-xl text-xs sm:text-base md:pl-1 md:pr-2 px-[1px] py-[4px] text-center inline-flex justify-center items-center gap-1 sm:gap-2 shadow-lg border-2 border-white focus:outline-none focus:ring-4 focus:ring-pink-400 hover:scale-95 transition-transform duration-200"
                                type="button"
                                style={{
                                    background: "linear-gradient(90deg, #ff8a00 0%, #e52e71 100%)",
                                    boxShadow: "0 0 1px 1px #e52e71, 0 0 6px 2px #ff8a00"
                                }}
                            >
                                <img 
                                    className="md:w-10 md:h-10 w-9 h-9 rounded-xl border border-amber-950 object-cover" 
                                    src={userData?.profilepic || data.user.image} 
                                    alt="User Image" 
                                />
                                <span className="text-black md:flex hidden">{data.user.name}</span>
                                <svg className=" md:flex hidden w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {/* Dropdown menu absolutely positioned below button */}
                            {isOpen && (
                                <div
                                    id="dropdown"
                                    className="absolute md:left-0 -left-30 top-full mt-1 z-10 bg-[#f7f7f2] border-2 border-black rounded-md shadow-[4px_4px_0_#e52e71] w-38 transform-gpu"
                                    style={{ 
                                        fontFamily: 'monospace', 
                                        fontWeight: 'bold',
                                        animation: 'dropdownFade 150ms ease-out'
                                    }}
                                    onMouseEnter={() => {
                                        if (!isMobile && closeTimeout) {
                                            clearTimeout(closeTimeout);
                                            closeTimeout = null;
                                            requestAnimationFrame(() => setIsOpen(true));
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (!isMobile) {
                                            closeTimeout = setTimeout(() => {
                                                requestAnimationFrame(() => setIsOpen(false));
                                            }, 150);
                                        }
                                    }}
                                >
                                    <ul className="py-2 text-base text-black">
                                        <li>
                                            <Link href="/editprofile" className="block px-4 py-2 hover:bg-[#ffe082] transition-colors">Edit Profile</Link>
                                        </li>
                                        <li>
                                            <Link href={`/${data.user.name}`} className="block px-4 py-2 hover:bg-[#ffe082] transition-colors">Your Page</Link>
                                        </li>
                                        <li>
                                            <Link href="#" className="block px-4 py-2 hover:bg-[#ffe082] transition-colors">Settings</Link>
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
                                    "md:text-lg text-[12px] px-3 py-2 rounded-md transition",
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