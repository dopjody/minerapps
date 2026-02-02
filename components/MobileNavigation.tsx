"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Wallet,
    Menu,
    X,
    ChevronLeft,
    Cpu,
    ShoppingCart,
    Brain,
    Trophy,
    ArrowUpRight,
    Settings
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileNavigation() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    const navItems = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard", active: true },
        { name: "Mining Hub", icon: Cpu, path: "/dashboard/mining", active: false },
        { name: "Marketplace", icon: ShoppingCart, path: "/dashboard/market", active: false },
        { name: "AI Optimizer", icon: Brain, path: "/dashboard/ai", active: false },
        { name: "Leaderboard", icon: Trophy, path: "/dashboard/leaderboard", active: false },
        { name: "Wallet", icon: Wallet, path: "/dashboard/wallet", active: false },
        { name: "Transactions", icon: ArrowUpRight, path: "/dashboard/transactions", active: false },
        { name: "Settings", icon: Settings, path: "/dashboard/settings", active: false },
    ];

    return createPortal(
        <>
            {/* 1. Hamburger Menu Button (Top Left) */}
            <div className="fixed top-4 left-4 z-[9999] lg:hidden">
                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="p-3 rounded-xl bg-[#050510] border border-white/20 text-[#00f2ff] shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:bg-[#00f2ff]/10 transition-all active:scale-95"
                    aria-label="Open Menu"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* 2. Floating Bottom Navigation (Bottom Center) */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[90%] max-w-[320px] lg:hidden">
                <div className="bg-[#050510]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center justify-around shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="p-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all flex flex-col items-center gap-1 active:scale-95"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Back</span>
                    </button>

                    {/* Home Button */}
                    <button className="p-3 rounded-xl text-[#00f2ff] bg-[#00f2ff]/10 border border-[#00f2ff]/20 flex flex-col items-center gap-1 transition-all active:scale-95 shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
                    </button>

                    {/* Wallet Button */}
                    <button className="p-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all flex flex-col items-center gap-1 active:scale-95">
                        <Wallet className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Wallet</span>
                    </button>

                    {/* More/Drawer Button */}
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="p-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all flex flex-col items-center gap-1 active:scale-95"
                    >
                        <Menu className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">More</span>
                    </button>
                </div>
            </div>

            {/* 3. Full Screen Drawer / Sidebar Overlay */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDrawerOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10000] lg:hidden"
                        />

                        {/* Drawer Content */}
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-80 bg-[#050510] border-r border-[#00f2ff]/20 z-[10001] p-6 flex flex-col gap-8 lg:hidden shadow-[10px_0_50px_rgba(0,242,255,0.1)]"
                        >
                            <div className="flex items-center justify-between">
                                <div className="font-[Orbitron] font-bold text-xl tracking-tighter text-white">
                                    QUANTUM<span className="text-[#00f2ff]">START</span>
                                </div>
                                <button
                                    onClick={() => setIsDrawerOpen(false)}
                                    className="p-2 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-6 overflow-y-auto">
                                {/* User Profile Snippet */}
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00f2ff] to-[#bc13fe] p-[1px]">
                                        <div className="w-full h-full rounded-lg bg-[#050510] flex items-center justify-center font-bold text-xs uppercase text-white">AR</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white">Alex Rivera</div>
                                        <div className="text-[10px] text-[#00f2ff] uppercase tracking-wider">Pro Miner</div>
                                    </div>
                                </div>

                                <nav className="flex flex-col gap-2">
                                    {navItems.map((item) => (
                                        <button
                                            key={item.name}
                                            onClick={() => setIsDrawerOpen(false)} // Close drawer on click
                                            className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${item.active
                                                    ? "bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/30 shadow-[0_0_15px_rgba(0,242,255,0.1)]"
                                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                                                }`}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            <span className="font-medium text-sm">{item.name}</span>
                                        </button>
                                    ))}
                                </nav>

                                <div className="mt-4 p-4 rounded-xl border border-[#bc13fe]/30 bg-[#bc13fe]/5">
                                    <div className="text-xs text-[#bc13fe] uppercase font-bold mb-2 flex justify-between">
                                        <span>Nebula Tier</span>
                                        <span>65%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#bc13fe] w-[65%] shadow-[0_0_10px_#bc13fe]" />
                                    </div>
                                    <div className="text-[10px] text-zinc-500 mt-2">Next Payout: 0.05 BTC</div>
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>,
        document.body
    );
}
