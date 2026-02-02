"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, Lock, Mail, Github, Chrome, ArrowRight, Loader } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        });

        if (error) {
            alert("Error: " + error.message);
        } else {
            setSent(true);
        }
        setLoading(false);
    };

    const handleOAuthLogin = async (provider: 'google' | 'github') => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        });
        if (error) alert(error.message);
    };

    return (
        <div className="min-h-screen bg-[#050510] flex items-center justify-center p-4 relative overflow-hidden text-white">
            {/* Background Ambience */}
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#00f2ff]/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#bc13fe]/10 blur-[150px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#00f2ff] to-[#bc13fe] mb-4 shadow-[0_0_20px_rgba(0,242,255,0.5)]">
                        <Lock className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-[Orbitron] font-bold tracking-tighter mb-2">
                        QUANTUM<span className="text-[#00f2ff]">ACCESS</span>
                    </h1>
                    <p className="text-zinc-400 text-sm">Secure Entry to Node Network</p>
                </div>

                {sent ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center space-y-4"
                    >
                        <div className="w-16 h-16 bg-[#39ff14]/10 rounded-full flex items-center justify-center mx-auto border border-[#39ff14]/30">
                            <Mail className="w-8 h-8 text-[#39ff14]" />
                        </div>
                        <h3 className="text-xl font-bold">Check your Email</h3>
                        <p className="text-zinc-400 text-sm">We've sent a magic link to <span className="text-white">{email}</span></p>
                        <button onClick={() => setSent(false)} className="w-full text-[#00f2ff] text-sm hover:underline mt-4">
                            Try different email
                        </button>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        <form onSubmit={handleEmailLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs uppercase font-bold text-zinc-500 pl-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-zinc-500" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="miner@quantum.io"
                                        className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#00f2ff]/50 transition-all placeholder:text-zinc-600"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-[#00f2ff] text-[#050510] font-bold rounded-xl hover:bg-white transition-all active:scale-95 shadow-[0_0_20px_rgba(0,242,255,0.4)] flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader className="w-5 h-5 animate-spin" /> : <>SEND MAGIC LINK <Zap className="w-5 h-5" /></>}
                            </button>
                        </form>

                        <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/5"></div>
                            </div>
                            <span className="relative z-10 bg-[#050510] px-4 text-xs text-zinc-500 uppercase">Or continue with</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => handleOAuthLogin('google')}
                                className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all"
                            >
                                <Chrome className="w-5 h-5" />
                                <span className="font-medium text-sm">Google</span>
                            </button>
                            <button
                                onClick={() => handleOAuthLogin('github')}
                                className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all"
                            >
                                <Github className="w-5 h-5" />
                                <span className="font-medium text-sm">GitHub</span>
                            </button>
                        </div>
                    </div>
                )}

                <div className="mt-8 text-center text-xs text-zinc-600">
                    By connecting, you agree to our <span className="text-zinc-400 hover:text-white cursor-pointer">Hash Protocol</span> & <span className="text-zinc-400 hover:text-white cursor-pointer">Privacy Policy</span>.
                </div>
            </motion.div>
        </div>
    );
}
