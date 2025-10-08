"use client"
import { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function DashboardForm() {
    const { data } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (!data) {
            router.push("/login");
        }
    }, [data]);


    const [form, setForm] = useState({
        name: "",
        email: "",
        username: "",
        profilePicture: "",
        coverPicture: "",
        razorpayid: "",
        razorpaysecret: "",
    });
    const [profilePreview, setProfilePreview] = useState("");
    const [coverPreview, setCoverPreview] = useState("");


    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            const file = files[0];
            if (!file) return;
            if (name === "profilePicture") {
                setForm((f) => ({ ...f, profilePicture: file }));
                setProfilePreview(URL.createObjectURL(file));
            } else if (name === "coverPicture") {
                setForm((f) => ({ ...f, coverPicture: file }));
                setCoverPreview(URL.createObjectURL(file));
            }
        } else {
            setForm((f) => ({ ...f, [name]: value }));
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // submit logic here
        // If you want to upload the image, use form.profilePicture (File object)
        console.log(form);
    };

    const inputClass =
        "block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm " +
        "focus:ring-blue-500 focus:border-blue-500 " +
        "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " +
        "dark:focus:ring-blue-500 dark:focus:border-blue-500";

    const labelClass = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

    return (
        <div className="min-h-screen bg-slate-900 text-white grid place-items-start px-6 py-10">
            <div className="w-full max-w-3xl mx-auto">
                <h1 className="text-3xl font-semibold text-center mb-8">Welcome to your Dashboard</h1>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="gridForSome grid grid-cols-2 grid-rows-2 gap-3">

                        {/* Name */}
                        <div className="my-2">
                            <label htmlFor="name" className={labelClass}>Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder=""
                            />
                        </div>

                        {/* Email */}
                        <div className="my-2">
                            <label htmlFor="email" className={labelClass}>Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>

                        {/* Username */}
                        <div className="my-2">
                            <label htmlFor="username" className={labelClass}>Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={form.username}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>
                        {/* Profile Picture */}
                        <div className="my-2 ">
                            <label htmlFor="profilePicture" className={labelClass}>Profile Picture  
                            </label>
                                <span className='flex items-center gap-1'>
                                    {profilePreview && (
                                    <div className="mt-2 flex justify-start gap-2">
                                        <img
                                            src={profilePreview}
                                            alt="Profile Preview"
                                            className="w-10 h-10 object-fit rounded-full border-2 border-blue-400 shadow"
                                        />
                                    </div>
                                    )}
                                <input
                                    id="profilePicture"
                                    name="profilePicture"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="block w-full h-10 py-2 px-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
                                />
                                </span>
                            
                        </div>
                    </div>


                    {/* Cover Picture */}
                    <div className="my-2">
                        <label htmlFor="coverPicture" className={labelClass}>Cover Picture</label>
                        <input
                            id="coverPicture"
                            name="coverPicture"
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
                        />
                        {coverPreview && (
                            <div className="mt-2">
                                <img src={coverPreview} alt="Cover Preview" className="w-full h-32 object-cover rounded-md shadow" />
                                <p className="text-xs text-gray-400 mt-1">Cover preview</p>
                            </div>
                        )}
                    </div>

                    {/* Razorpay Id */}
                    <div className="my-2">
                        <label htmlFor="razorpayid" className={labelClass}>Razorpay Id</label>
                        <input
                            id="razorpayid"
                            name="razorpayid"
                            type="text"
                            value={form.razorpayid}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    {/* Razorpay Secret */}
                    <div className="my-2">
                        <label htmlFor="razorpaysecret" className={labelClass}>Razorpay Secret</label>
                        <input
                            id="razorpaysecret"
                            name="razorpaysecret"
                            type="text"
                            value={form.razorpaysecret}
                            onChange={handleChange}
                            className={inputClass}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}
