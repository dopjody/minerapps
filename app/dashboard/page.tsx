"use client";

import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Cpu,
    Wallet,
    ArrowUpRight,
    ArrowDownLeft,
    Settings,
    Bell,
    Search,
    Menu,
    TrendingUp,
    Users
} from "lucide-react";
import MiningRig from "@/components/MiningRig";

export default function Dashboard() {
    return (
        <div className="flex min-h-screen bg-quantum-dark text-white">
            {/* Sidebar - Desktop Only for now */}
            <aside className="hidden lg:flex w-64 border-r border-white/5 flex-col p-6 gap-8">
                <div className="font-orbitron font-bold text-xl tracking-tighter">
                    QUANTUM<span className="text-quantum-blue">START</span>
                </div>

                <nav className="flex flex-col gap-2">
                    {[
                        { name: "Dashboard", icon: LayoutDashboard, active: true },
                        { name: "Mining Hub", icon: Cpu, active: false },
                        { name: "Wallet", icon: Wallet, active: false },
                        { name: "Transactions", icon: ArrowUpRight, active: false },
                        { name: "Settings", icon: Settings, active: false },
                    ].map((item) => (
                        <button
                            key={item.name}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active
                                ? "bg-quantum-blue/10 text-quantum-blue border border-quantum-blue/20"
                                : "text-zinc-500 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                        </button>
                    ))}
                </nav>

                <div className="mt-auto glass-card p-4 rounded-xl border-quantum-purple/20">
                    <div className="text-xs text-zinc-500 uppercase font-bold mb-2">Active Plan</div>
                    <div className="text-quantum-purple font-orbitron font-bold">NEBULA TIER</div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full mt-3 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "65%" }}
                            className="h-full bg-quantum-purple"
                        />
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-2">65% Progress to Payout</div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-8">
                    <div className="flex lg:hidden font-orbitron font-bold text-lg">QS</div>

                    <div className="hidden md:flex items-center bg-zinc-900/50 border border-white/10 rounded-full px-4 py-2 w-96">
                        <Search className="w-4 h-4 text-zinc-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search contracts, transactions..."
                            className="bg-transparent border-none outline-none text-sm w-full"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-xl hover:bg-white/5 relative">
                            <Bell className="w-5 h-5 text-zinc-400" />
                            <div className="absolute top-2 right-2 w-2 h-2 bg-quantum-pink rounded-full border-2 border-quantum-dark" />
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                            <div className="flex flex-col items-end hidden sm:flex">
                                <span className="text-sm font-bold">Alex Rivera</span>
                                <span className="text-[10px] text-zinc-500">Verified Member</span>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-quantum-blue to-quantum-purple p-[1px]">
                                <div className="w-full h-full rounded-xl bg-quantum-dark flex items-center justify-center font-bold text-xs uppercase">
                                    AR
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-8 space-y-8 overflow-y-auto">
                    {/* Top Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: "Total Balance", value: "$12,482.50", sub: "+5.4% Today", icon: Wallet, color: "text-quantum-blue" },
                            { label: "Mining Hashrate", value: "48.2 TH/s", sub: "Status: Stable", icon: Cpu, color: "text-quantum-green" },
                            { label: "Estimated Daily", value: "0.0042 BTC", sub: "~$142.20 USD", icon: TrendingUp, color: "text-quantum-purple" },
                            { label: "Referral Bonus", value: "$420.00", sub: "12 Actives", icon: Users, color: "text-quantum-pink" },
                        ].map((stat, i) => (
                            <div key={i} className="glass-card p-6 rounded-2xl flex flex-col gap-1">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">{stat.label}</span>
                                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                                </div>
                                <div className="text-2xl font-orbitron font-bold">{stat.value}</div>
                                <div className={`text-[10px] font-medium ${stat.sub.includes('+') ? 'text-quantum-green' : 'text-zinc-500'}`}>
                                    {stat.sub}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Lower Grid: Rig + Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Mining Status Visualizer */}
                        <div className="lg:col-span-2 glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
                            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-quantum-blue/5 blur-[80px] rounded-full" />

                            <div className="flex-1 space-y-6 z-10">
                                <div>
                                    <h3 className="text-2xl font-orbitron font-bold">Node <span className="text-quantum-blue">B-842</span></h3>
                                    <p className="text-zinc-400 text-sm">Quantum-Enhanced SHA-256 Engine</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <div className="text-[10px] text-zinc-500 uppercase">Core Temp</div>
                                        <div className="text-lg font-bold">42.5°C</div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <div className="text-[10px] text-zinc-500 uppercase">Input Power</div>
                                        <div className="text-lg font-bold">1.2 kW</div>
                                    </div>
                                </div>

                                <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 font-bold hover:bg-quantum-blue/10 hover:border-quantum-blue/30 transition-all text-sm uppercase tracking-widest">
                                    Manage Mining Hardware
                                </button>
                            </div>

                            <div className="relative flex justify-center items-center">
                                <MiningRig />
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="glass-card rounded-3xl p-6 flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-orbitron font-bold">Activity</h3>
                                <button className="text-xs text-quantum-blue hover:underline">View All</button>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { type: 'mining', desc: 'Block reward cleared', amount: '+0.00014 BTC', time: '2 mins ago' },
                                    { type: 'withdrawal', desc: 'Payout to Wallet', amount: '-0.012 BTC', time: '1 hour ago' },
                                    { type: 'referral', desc: 'Friend signup (Level 1)', amount: '+12.5 DOGE', time: '4 hours ago' },
                                    { type: 'mining', desc: 'Hashrate boost applied', amount: 'N/A', time: '12 hours ago' },
                                ].map((act, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-white/20 transition-all`}>
                                            {act.type === 'mining' ? <Cpu className="w-4 h-4 text-quantum-blue" /> : act.type === 'withdrawal' ? <ArrowDownLeft className="w-4 h-4 text-quantum-pink" /> : <Users className="w-4 h-4 text-quantum-purple" />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-xs font-bold">{act.desc}</div>
                                            <div className="text-[10px] text-zinc-500">{act.time}</div>
                                        </div>
                                        <div className={`text-xs font-orbitron font-bold ${act.amount.startsWith('+') ? 'text-quantum-green' : act.amount === 'N/A' ? 'text-zinc-500' : 'text-quantum-pink'}`}>
                                            {act.amount}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
