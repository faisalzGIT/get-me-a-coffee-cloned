"use client"
import { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/actions/useractions'
import { set } from 'mongoose'
import { ToastContainer, toast } from 'react-toastify';

export default function EditProfile() {
    const { data, update } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (!data) {
            router.push("/login");
            return;
        }
        getData();
    }, [data]);

    const getData = async () => {
        try {
            if (!data?.user?.name) return;
            let u = await fetchuser(data.user.name);
            if (u) {
                // Ensure all form fields have at least empty string values
                const formattedData = {
                    name: u.name || "",
                    email: u.email || "",
                    username: u.username || "",
                    profilepic: u.profilepic || "",
                    coverpic: u.coverpic || "",
                    razorpayid: u.razorpayid || "",
                    razorpaysecret: u.razorpaysecret || ""
                };
                setForm(formattedData);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }


    const [form, setForm] = useState({
        name: "",
        email: "",
        username: "",
        profilepic: "",
        coverpic: "",
        razorpayid: "",
        razorpaysecret: "",
    });
    // No need for preview states when using direct URLs


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };


    const handleSubmit = async (e) => {
        try {
            if (!data?.user?.name) {
                alert("Please login first");
                return;
            }
            
            // Create FormData from the form state
            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => {
                if (value) formData.append(key, value);
            });
            
            const result = await updateProfile(formData, data.user.name);
            if (result?.error) {
                alert(result.error);
                return;
            }
            
            await update(); // Update the session
            toast.success('Profile updated!', {
                        position: "bottom-left",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });

        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile: " + error.message);
        }
    };

    const inputClass =
        "block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm " +
        "focus:ring-blue-500 focus:border-blue-500 " +
        "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " +
        "dark:focus:ring-blue-500 dark:focus:border-blue-500";

    const labelClass = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

    return ( <>
            <ToastContainer />
        
        <div className="min-h-screen bg-slate-900 text-white grid place-items-start px-6 py-10">
            <div className="w-full max-w-3xl mx-auto">
                <h1 className="text-3xl font-semibold text-center mb-8">Welcome to your Profile Editor</h1>
                <form action={handleSubmit} className="space-y-4">

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
                                value={form.email || ""}
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
                        {/* Profile Picture URL */}
                        <div className="my-2">
                            <label htmlFor="profilepic" className={labelClass}>Profile Picture URL</label>
                            <div className="space-y-2">
                                <input
                                    id="profilepic"
                                    name="profilepic"
                                    type="url"
                                    placeholder="Enter image URL"
                                    value={form.profilepic}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                                {form.profilepic && (
                                    <div className="mt-2 flex items-center gap-2">
                                        <img
                                            src={form.profilepic}
                                            alt="Profile Preview"
                                            className="w-10 h-10 object-cover rounded-full border-2 border-blue-400 shadow"
                                            onError={(e) => {
                                                e.target.src = "https://i.pinimg.com/736x/db/3a/62/db3a623acc8396fb285ec899ad01cd10.jpg";
                                            }}
                                        />
                                        <span className="text-xs text-gray-400">Preview</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Cover Picture URL */}
                    <div className="my-2">
                        <label htmlFor="coverpic" className={labelClass}>Cover Picture URL</label>
                        <div className="space-y-2">
                            <input
                                id="coverpic"
                                name="coverpic"
                                type="url"
                                placeholder="Enter image URL"
                                value={form.coverpic}
                                onChange={handleChange}
                                className={inputClass}
                            />
                            {form.coverpic && (
                                <div className="mt-2">
                                    <img 
                                        src={form.coverpic}
                                        alt="Cover Preview"
                                        className="w-full h-32 object-cover rounded-md shadow"
                                        onError={(e) => {
                                            e.target.src = "https://marketplace.canva.com/EAE0b4yHuM0/1/0/1600w/canva-purple-and-pink-abstract-linkedin-banner-j3pCRhiuM_Y.jpg";
                                        }}
                                    />
                                    <p className="text-xs text-gray-400 mt-1">Preview</p>
                                </div>
                            )}
                        </div>
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
    </>);
}
