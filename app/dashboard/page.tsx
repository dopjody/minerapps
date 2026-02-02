"use client";

import { useEffect, useState } from "react";
import MobileNavigation from "@/components/MobileNavigation";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
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
    X,
    TrendingUp,
    Users,
    ShoppingCart,
    Brain,
    Trophy,
    ArrowRight,
    ChevronLeft,
    Copy,
    Loader
} from "lucide-react";
import MiningRig from "@/components/MiningRig";

// Define Profile Interface
interface Profile {
    username: string;
    referral_code: string;
    balance_btc: number;
    balance_doge: number;
    hash_power: string;
    tier: string;
    referral_count: number;
}

export default function Dashboard() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<Profile | null>(null);

    // Fetch User Data
    useEffect(() => {
        const getUser = async () => {
            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError || !user) {
                router.push('/login');
                return;
            }

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (data) {
                setProfile(data);
            }
            setLoading(false);
        };

        getUser();
    }, [router, supabase]);

    const navItems = [
        { name: "Dashboard", icon: LayoutDashboard, active: true },
        { name: "Mining Hub", icon: Cpu, active: false },
        { name: "Marketplace", icon: ShoppingCart, active: false },
        { name: "AI Optimizer", icon: Brain, active: false },
        { name: "Leaderboard", icon: Trophy, active: false },
        { name: "Wallet", icon: Wallet, active: false },
        { name: "Transactions", icon: ArrowUpRight, active: false },
        { name: "Settings", icon: Settings, active: false },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-quantum-dark flex items-center justify-center text-quantum-blue">
                <Loader className="w-10 h-10 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-quantum-dark text-white relative">
            {/* Portal-based Mobile Navigation */}
            <MobileNavigation />

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 border-r border-white/5 flex-col p-6 gap-8 overflow-y-auto">
                <div className="font-orbitron font-bold text-xl tracking-tighter">
                    QUANTUM<span className="text-quantum-blue">START</span>
                </div>

                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active
                                ? "bg-quantum-blue/10 text-quantum-blue border border-quantum-blue/20"
                                : "text-zinc-500 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium text-sm">{item.name}</span>
                        </button>
                    ))}
                </nav>

                <div className="mt-auto glass-card p-4 rounded-xl border-quantum-purple/20">
                    <div className="text-xs text-zinc-500 uppercase font-bold mb-2">Active Plan</div>
                    <div className="text-quantum-purple font-orbitron font-bold uppercase">{profile?.tier || 'Nebula'} TIER</div>
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
            <main className="flex-1 flex flex-col h-screen overflow-hidden pb-20 lg:pb-0">
                {/* Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 md:px-8 bg-quantum-dark/50 backdrop-blur-md z-20">
                    <div className="flex items-center gap-4">
                        {/* Old Hamburger Removed for Debug */}
                        <div className="font-orbitron font-bold text-lg lg:hidden">QS</div>
                    </div>

                    <div className="hidden md:flex items-center bg-zinc-900/50 border border-white/10 rounded-full px-4 py-2 w-96">
                        <Search className="w-4 h-4 text-zinc-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search nodes, marketplace, assets..."
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
                                <span className="text-sm font-bold">{profile?.username || 'User'}</span>
                                <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">Verified Miner</span>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-quantum-blue to-quantum-purple p-[1px]">
                                <div className="w-full h-full rounded-xl bg-quantum-dark flex items-center justify-center font-bold text-xs uppercase">
                                    {profile?.username?.substring(0, 2) || 'QS'}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-6 md:p-8 space-y-8 overflow-y-auto flex-1">
                    {/* Top Stats Card Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: "Total Balance", value: `${profile?.balance_btc || '0.000'} BTC`, sub: "+$0.00 Today", icon: Wallet, color: "text-quantum-blue" },
                            { label: "Mining Hashrate", value: profile?.hash_power || "0 TH/s", sub: "Status: Active", icon: Cpu, color: "text-quantum-green" },
                            { label: "Referral Bonus", value: `${profile?.balance_doge || '0'} DOGE`, sub: `${profile?.referral_count || 0} Actives`, icon: Users, color: "text-quantum-purple" },
                            { label: "Global Rank", value: "#---", sub: "Top 10% Globally", icon: Trophy, color: "text-quantum-pink" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6 rounded-2xl flex flex-col gap-1 hover:border-white/20 transition-all cursor-default"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{stat.label}</span>
                                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                                </div>
                                <div className="text-2xl font-orbitron font-bold">{stat.value}</div>
                                <div className="text-[10px] font-medium text-zinc-400">{stat.sub}</div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Visualizer & Controls */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
                                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-quantum-blue/5 blur-[80px] rounded-full" />

                                <div className="flex-1 space-y-6 z-10 w-full text-center md:text-left">
                                    <div>
                                        <h3 className="text-2xl font-orbitron font-bold">Node <span className="text-quantum-blue">B-842</span></h3>
                                        <p className="text-zinc-400 text-sm italic">"Infrastructure is stable and performing above baseline."</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col gap-1">
                                            <div className="text-[10px] text-zinc-500 uppercase font-bold">Quantum Core</div>
                                            <div className="text-lg font-orbitron font-bold text-quantum-blue text-glow">ACTIVE</div>
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col gap-1">
                                            <div className="text-[10px] text-zinc-500 uppercase font-bold">Network Delay</div>
                                            <div className="text-lg font-orbitron font-bold text-quantum-green">14ms</div>
                                        </div>
                                    </div>

                                    <button className="w-full py-4 rounded-xl bg-quantum-blue/10 border border-quantum-blue/30 text-quantum-blue font-bold hover:bg-quantum-blue hover:text-quantum-dark transition-all text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                                        Boost Hash Power
                                    </button>
                                </div>

                                <div className="relative flex justify-center items-center w-full md:w-auto">
                                    <MiningRig />
                                </div>
                            </div>

                            {/* Referral Code Section (New) */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="glass-card rounded-3xl p-8 border-quantum-purple/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-quantum-purple/5 via-transparent to-transparent opacity-50" />
                                <div className="flex items-center gap-6 z-10">
                                    <div className="w-16 h-16 rounded-full bg-quantum-purple/10 flex items-center justify-center border border-quantum-purple/30">
                                        <Users className="w-8 h-8 text-quantum-purple" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-orbitron font-bold">Referral <span className="text-quantum-purple">Network</span></h3>
                                        <p className="text-zinc-400 text-sm max-w-md">Your invitation code. Earn 15% of all mined blocks from your node network.</p>
                                    </div>
                                </div>
                                <div className="z-10 w-full md:w-auto flex flex-col gap-2">
                                    <div className="flex items-center gap-2 bg-black/50 p-2 rounded-xl border border-white/10">
                                        <span className="font-orbitron font-bold text-quantum-white px-2 tracking-widest">
                                            {profile?.referral_code || 'LOADING...'}
                                        </span>
                                        <button
                                            onClick={() => navigator.clipboard.writeText(profile?.referral_code || '')}
                                            className="p-2 hover:bg-white/10 rounded-lg transition-all"
                                        >
                                            <Copy className="w-4 h-4 text-zinc-400" />
                                        </button>
                                    </div>
                                    <div className="text-[10px] text-center text-zinc-500 uppercase font-bold tracking-wider">Share Code</div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Marketplace & Activity Side Column */}
                        <div className="space-y-8">
                            {/* Marketplace Card */}
                            <div className="glass-card rounded-3xl p-6 flex flex-col gap-6 border-quantum-pink/20">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-orbitron font-bold text-quantum-pink">Nodes Market</h3>
                                    <div className="text-[10px] px-2 py-1 rounded bg-quantum-pink/20 text-quantum-pink font-bold uppercase">Hot</div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { name: "Titan SHA-256", power: "10 TH/s", price: "0.005 BTC" },
                                        { name: "Lunar Scrypt", power: "250 MH/s", price: "1200 DOGE" },
                                        { name: "Nebula Ethash", power: "45 MH/s", price: "0.08 ETH" }
                                    ].map((item, i) => (
                                        <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-xl hover:border-quantum-blue/30 transition-all cursor-pointer group flex flex-col gap-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold">{item.name}</span>
                                                <ArrowRight className="w-3 h-3 text-zinc-500 group-hover:text-quantum-blue transition-all" />
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <span className="text-[10px] text-zinc-500">{item.power}</span>
                                                <span className="text-xs font-orbitron text-quantum-blue">{item.price}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-quantum-dark transition-all">
                                    Browse All Nodes
                                </button>
                            </div>

                            {/* Activity Feed */}
                            <div className="glass-card rounded-3xl p-6 flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-orbitron font-bold">System Log</h3>
                                    <div className="w-2 h-2 rounded-full bg-quantum-green animate-pulse" />
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { type: 'mining', desc: 'Block #842,501 mined', amount: '+0.00014 BTC', time: '2m' },
                                        { type: 'referral', desc: 'New Node Joined', amount: '+12.5 DOGE', time: '1h' },
                                        { type: 'reward', desc: 'Staking Payout', amount: '+0.0008 ETH', time: '4h' },
                                    ].map((act, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                                            <div className="flex-1">
                                                <div className="text-[11px] font-bold">{act.desc}</div>
                                                <div className="text-[9px] text-zinc-500">{act.time} ago</div>
                                            </div>
                                            <div className="text-[10px] font-orbitron text-quantum-green">{act.amount}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
