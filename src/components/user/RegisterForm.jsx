import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

function RegisterForm() {
    const navigate = useNavigate();
    const [data, setData] = useState({ name: "", username: "", email: "", phone: "", checkbox: false });
    const [error, setError] = useState({ name: "", username: "", email: "", phone: "", checkbox: "" });

    function validatePhone(phone) {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateForm(e) {
        e.preventDefault()

        let isError = false;
        setError(() => { return { name: "", username: "", email: "", phone: "", checkbox: "", } });

        Object.keys(data).forEach(key => {
            const element = data[key];
            if (typeof element === 'string' && element.trim().length === 0) {
                isError = true;
                setError(error => ({ ...error, [key]: "This field is required." }));
            } else if (typeof element === 'boolean' && !element) {
                isError = true;
                setError(error => ({ ...error, [key]: "This checkbox must be checked." }));
            } else if (key === 'phone' && !validatePhone(element)) {
                isError = true;
                setError(error => ({ ...error, [key]: "This phone no is invalid." }));
            } else if (key === 'email' && !validateEmail(element)) {
                isError = true;
                setError(error => ({ ...error, [key]: "This email id is invalid." }));
            }
        });

        if (!isError) {
            localStorage.setItem('userData', JSON.stringify(data));
            navigate("/movies/genre");
        }
    }


    return (
        <div className="h-screen bg-black flex flex-col">
            <div className="flex flex-row h-full">
                <div className="relative hidden sm:block w-1/2">
                    <img className="w-full h-full object-cover" src="/images/reg-banner.png" alt="" />
                    <h1 className="absolute text-5xl text-white font-semibold bottom-20 px-20">Discover new things on Superapp</h1>
                </div>
                <div className="w-full sm:w-1/2 flex justify-center items-center p-4 md:p-0">
                    <div className="w-full max-w-sm">
                        <img className="block mx-auto mb-4" src="/images/logo.png" alt="" width={150} />
                        <p className="text-white text-center">Create your new account</p>
                        <form className="flex flex-col gap my-4" onSubmit={validateForm} style={{ gap: '15px' }} autoComplete="off">
                            <div className="input-name">
                                <input type="text" className="w-full py-2 px-3 bg-[#292929] text-gray-300 focus:outline-none" id="name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder="Name" />
                                <label htmlFor="name" className="text-sm text-red-500">{error.name}</label>
                            </div>
                            <div className="input-username">
                                <input type="text" className="w-full py-2 px-3 bg-[#292929] text-gray-300 focus:outline-none" id="username" value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} placeholder="Username" />
                                <label htmlFor="username" className="text-sm text-red-500">{error.username}</label>
                            </div>
                            <div className="input-email">
                                <input type="email" className="w-full py-2 px-3 bg-[#292929] text-gray-300 focus:outline-none" id="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Email" />
                                <label htmlFor="email" className="text-sm text-red-500">{error.email}</label>
                            </div>
                            <div className="input-phone">
                                <input type="tel" className="w-full py-2 px-3 bg-[#292929] text-gray-300 focus:outline-none" id="phone" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} placeholder="Mobile" />
                                <label htmlFor="phone" className="text-sm text-red-500">{error.phone}</label>
                            </div>
                            <div className="input-checkbox">
                                <input type="checkbox" id="checkbox" value={data.checkbox} onChange={(e) => setData({ ...data, checkbox: e.target.checked })} /> <span className="text-[#7C7C7C]">Share my registration data with Superapp</span><br />
                                <label htmlFor="checkbox" className="text-sm text-red-500">{error.checkbox}</label>
                            </div>
                            <button className="w-full rounded-3xl bg-[#72DB73] text-white font-medium py-2 px-4 focus:outline-none" type="submit">SIGN UP</button>
                        </form>
                        <p className="text-[#7C7C7C] text-sm">By clicking on Sign up. you agree to Superapp <span className="text-[#72DB73]">Terms and Conditions of Use</span></p>
                        <p className="text-[#7C7C7C] text-sm mt-4">To learn more about how Superapp collects, uses, shares and protects your personal data please head Superapp <span className="text-[#72DB73]">Privacy Policy</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm