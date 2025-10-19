"use client";
import Image from "next/image";
import Link from "next/link";

export default function About() {
    const techStack = [
        {
            category: "Frontend",
            techs: [
                { name: "Next.js 13", desc: "React framework with App Router" },
                { name: "TailwindCSS", desc: "Utility-first CSS framework" },
                { name: "React", desc: "UI component library" }
            ]
        },
        {
            category: "Backend",
            techs: [
                { name: "MongoDB", desc: "NoSQL database" },
                { name: "NextAuth.js", desc: "Authentication solution" },
                { name: "Mongoose", desc: "MongoDB object modeling" }
            ]
        },
        {
            category: "Payments",
            techs: [
                { name: "Razorpay", desc: "Payment gateway integration" },
                { name: "Server Actions", desc: "Next.js server functions" }
            ]
        }
    ];

    const features = [
        {
            title: "User Authentication",
            desc: "Secure login with Google and GitHub",
            icon: "🔐"
        },
        {
            title: "Custom Profile Pages",
            desc: "Personalized pages for creators",
            icon: "👤"
        },
        {
            title: "Secure Payments",
            desc: "Safe and easy payment processing",
            icon: "💳"
        },
        {
            title: "Edit Profile",
            desc: "Change profile and cover pictures",
            icon: "🖼️"
        },
        {
            title: "Responsive Design",
            desc: "Works on all devices",
            icon: "📱"
        },
        {
            title: "Real-time Updates",
            desc: "Instant payment notifications",
            icon: "⚡"
        }
    ];

    return (
        <div className="min-h-screen w-full py-10 px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-bl from-pink-500 to-yellow-500 bg-clip-text text-transparent ">
                    About Get Me a Coffee
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 mb-8">
                    A platform that helps creators receive support from their community through one-time contributions
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                    <Link href="/login">
                        <button className="bg-pink-900 hover:bg-pink-800 text-white hover:scale-105 font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(236,72,153,0.5)] ">
                            Start Creating
                        </button>
                    </Link>
                    <a href="https://github.com/faisalzGIT/get-me-a-coffee-cloned" target="_blank" rel="noopener noreferrer">
                        <button className="bg-gray-800 hover:bg-gray-700 text-white hover:scale-105 font-bold py-2 px-6 rounded-full transition-all duration-300 flex items-center gap-2 shadow-[0_0_15px_rgba(107,114,128,0.5)] ">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            View Source
                        </button>
                    </a>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto mb-20">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-amber-100 ">
                    Features & Capabilities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-[#161b22] p-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.2)] "
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2 text-sky-100">{feature.title}</h3>
                            <p className="text-gray-400">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tech Stack */}
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-amber-100 ">
                    Technology Stack
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {techStack.map((stack, index) => (
                        <div key={index} className="bg-[#161b22] p-6 rounded-xl shadow-[0_0_15px_rgba(244,114,182,0.2)] ">
                            <h3 className="text-xl font-semibold mb-4 text-pink-400">{stack.category}</h3>
                            <ul className="space-y-3">
                                {stack.techs.map((tech, techIndex) => (
                                    <li key={techIndex} className="flex flex-col">
                                        <span className="font-medium text-sky-100">{tech.name}</span>
                                        <span className="text-sm text-gray-400">{tech.desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <div className="max-w-4xl mx-auto text-center my-20">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-amber-100 ">
                    Ready to Get Started?
                </h2>
                <p className="text-gray-300 mb-8">
                    Join our community of creators and start receiving support from your fans today.
                </p>
                <Link href="/login">
                    <button className="bg-gradient-to-r from-pink-600 to-yellow-500 text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(236,72,153,0.5)] ">
                        Create Your Page
                    </button>
                </Link>
            </div>

            {/* Made with love */}
            <div className="max-w-4xl mx-auto text-center py-8">
                <p className="text-sm text-gray-400">
                    Made with <span role="img" aria-label="white heart">🤍</span> by faisal
                </p>
            </div>
        </div>
    );
}
