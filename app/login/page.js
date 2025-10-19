"use client"
import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import {useRouter} from 'next/navigation'

const Login = () => {
    const { data } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (data) {
            router.push("/editprofile");
        }
    }, [data]);

    return (
        <>
            <div className="flex flex-col items-center gap-4 min-h-[91vh] p-4 sm:p-6 lg:p-10 w-full max-w-md mx-auto">
                <div className="text-center w-full">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 py-2 bg-gradient-to-bl from-pink-500 to-yellow-500 bg-clip-text text-transparent">Login</h1>
                    <p className="text-base sm:text-lg md:text-xl text-white mb-6">Please choose a login method:</p>
                </div>

                {/* Google */}
                <button onClick={() => signIn("google")}
                    className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-md px-4 sm:px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
                >
                    <svg
                        className="h-6 w-6 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                    >
                        <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.48 2.56 13.44l7.98 6.19C12.43 13.01 17.74 9.5 24 9.5z"
                        />
                        <path
                            fill="#4285F4"
                            d="M46.98 24.55c0-1.57-.14-3.08-.39-4.55H24v9h12.94c-.56 2.92-2.24 5.39-4.77 7.05l7.47 5.8c4.37-4.05 6.84-10.01 6.84-17.3z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M11.53 28.63A14.5 14.5 0 019.5 24c0-1.6.27-3.15.77-4.6l-7.98-6.19A23.915 23.915 0 000 24c0 3.93.94 7.64 2.56 10.94l7.98-6.19z"
                        />
                        <path
                            fill="#34A853"
                            d="M24 48c6.48 0 11.91-2.13 15.88-5.8l-7.47-5.8c-2.1 1.41-4.79 2.25-8.41 2.25-6.26 0-11.57-3.51-13.95-8.69l-7.98 6.19C6.51 42.52 14.62 48 24 48z"
                        />
                    </svg>
                    <span>Continue with Google</span>
                </button>

                {/* LinkedIn */}
                <button
                    className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-md px-4 sm:px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
                >
                    <svg
                        className="h-5 w-5 sm:h-6 sm:w-6 mr-2 flex-shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                    >
                        <path
                            fill="#0077B5"
                            d="M42 0H6C2.7 0 0 2.7 0 6v36c0 3.3 2.7 6 6 6h36c3.3 0 6-2.7 6-6V6c0-3.3-2.7-6-6-6z"
                        />
                        <path
                            fill="#fff"
                            d="M12 19h6v18h-6V19zm3-9c1.9 0 3.1 1.2 3.1 3 0 1.7-1.2 3-3.1 3-1.8 0-3.1-1.3-3.1-3 0-1.8 1.3-3 3.1-3zm9 9h5.7v2.6h.1c.8-1.5 2.9-3.1 6-3.1 6.4 0 7.6 4.2 7.6 9.7V37h-6V27c0-2.4 0-5.5-3.4-5.5-3.4 0-3.9 2.6-3.9 5.3V37h-6V19z"
                        />
                    </svg>
                    <span>Continue with LinkedIn</span>
                </button>

                {/* Twitter */}
                <button
                    className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-md px-4 sm:px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
                >
                    <svg
                        className="h-5 w-5 sm:h-6 sm:w-6 mr-2 flex-shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                    >
                        <path
                            fill="#1DA1F2"
                            d="M42.5 12.3c-1.2.5-2.4.8-3.7.9 1.3-.8 2.3-2 2.8-3.4-1.2.7-2.6 1.2-4 1.5C36.3 10.5 34.4 9 32 9c-4.3 0-7.2 4.1-5.9 8.1-6.1-.3-11.5-3.2-15.1-7.7-2 3.5-1 8.1 2.4 10.4-1.1 0-2.1-.3-3-0.8v.1c0 3.9 2.8 7.1 6.6 7.8-.7.2-1.6.3-2.4.3-.6 0-1.1 0-1.6-.1 1.1 3.3 4.2 5.7 7.9 5.8-3 2.3-6.6 3.4-10.3 3.4-.6 0-1.2 0-1.7-.1C8.6 38.9 13 40 17.7 40c14.4 0 22.3-12 22.3-22.3v-1c1.2-.9 2.2-2 3-3.2z"
                        />
                    </svg>
                    <span>Continue with Twitter</span>
                </button>

                {/* GitHub */}
                <button onClick={() => signIn("github")}
                    className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-md px-4 sm:px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
                >
                    <svg
                        className="h-6 w-6 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 .5C5.648.5.5 5.648.5 12c0 5.086 3.292 9.387 7.867 10.914.575.105.785-.25.785-.555 0-.274-.01-1.001-.016-1.963-3.2.696-3.876-1.542-3.876-1.542-.523-1.328-1.277-1.681-1.277-1.681-1.043-.714.079-.699.079-.699 1.152.081 1.758 1.184 1.758 1.184 1.025 1.756 2.687 1.249 3.343.955.104-.743.401-1.25.73-1.538-2.554-.291-5.238-1.277-5.238-5.68 0-1.255.449-2.281 1.184-3.085-.119-.29-.513-1.46.112-3.046 0 0 .965-.309 3.164 1.178a11.03 11.03 0 0 1 2.879-.387c.976.004 1.961.132 2.879.387 2.199-1.487 3.164-1.178 3.164-1.178.625 1.586.231 2.756.112 3.046.735.804 1.184 1.83 1.184 3.085 0 4.414-2.688 5.385-5.253 5.67.413.354.781 1.056.781 2.13 0 1.538-.014 2.777-.014 3.152 0 .309.21.668.789.554C20.713 21.384 24 17.085 24 12c0-6.352-5.148-11.5-12-11.5z"
                            clipRule="evenodd"
                        />
                    </svg>

                    <span>Continue with GitHub</span>
                </button>


            </div>

        </>
    )
}

export default Login