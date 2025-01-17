'use client';

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import config from "../config";
import Turnstile from 'react-turnstile'; 
import { useState } from "react";

export default function RegisterPage() {
    const { cloudflareCaptchaKey } = config;
    const [captchaToken, setCaptchaToken] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!captchaToken) {
            alert("Please complete the CAPTCHA");
            return;
        }
    };

    const handleCaptchaSuccess = (token) => {
        setCaptchaToken(token);
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-mali)]">
            <NavBar />
            <main className="flex flex-col gap-8 row-start-2 items-center w-full">
                <div className="h-full w-auto border rounded-lg shadow bg-gray-900/50 border-gray-700/50 p-8">
                    <div className="flex flex-col gap-8 row-start-2 items-center p-4">
                        <p5 className="text-3xl font-bold text-white mb-8">Registration</p5>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md px-4">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="p-2 border rounded-lg bg-slate-500/50 border-slate-500/50 border text-white"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="p-2 border rounded-lg bg-slate-500/50 border-slate-500/50 border text-white"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="p-2 border rounded-lg bg-slate-500/50 border-slate-500/50 border text-white"
                                required
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="p-2 border rounded-lg bg-slate-500/50 border-slate-500/50 border text-white"
                                required
                            />
                            <p className="text-sm text-white">Already have an account? <a className="text-blue-400" href="/login">Login Here.</a></p>
                            <div className="flex justify-center">
                                <Turnstile
                                    sitekey={cloudflareCaptchaKey}
                                    onSuccess={handleCaptchaSuccess}
                                    theme="dark"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-slate-500/50 text-white p-2 rounded-md hover:bg-slate-700/50 transition-colors"
                                disabled={!captchaToken}
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

