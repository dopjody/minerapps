"use client";

import { motion } from "framer-motion";
import { Cpu, Zap, Shield, TrendingUp, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 overflow-hidden">
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-quantum-blue/20 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-quantum-purple/20 blur-[120px] rounded-full -z-10" />

      {/* Hero Section */}
      <section className="relative z-10 w-full max-w-6xl flex flex-col items-center text-center gap-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-quantum-blue/30 bg-quantum-blue/5 text-quantum-blue text-sm font-medium mb-4"
        >
          <Zap className="w-4 h-4" />
          <span>v2.0 Quantum Interface Active</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-8xl font-orbitron font-bold tracking-tighter text-glow"
        >
          QUANTUM<span className="text-quantum-blue">START</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-2xl text-lg md:text-xl text-zinc-400 font-light leading-relaxed"
        >
          Experience the evolution of cloud mining. Harness high-speed Bitcoin & Dogecoin hashrates through our secure, automated quantum infrastructure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <Link href="/dashboard" className="px-8 py-4 bg-quantum-blue text-quantum-dark font-orbitron font-bold rounded-xl hover:bg-white transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,242,255,0.5)] flex items-center gap-2">
            START MINING <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="px-8 py-4 glass-card border-quantum-blue/20 text-white font-orbitron font-bold rounded-xl hover:border-quantum-blue/50 transition-all">
            STAKING VAULT
          </button>
        </motion.div>
      </section>

      {/* Live Stats Grid */}
      <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-20">
        {[
          { label: "Active Hashrate", value: "842.5 TH/s", icon: Cpu, color: "text-quantum-blue" },
          { label: "Network Profit", value: "24.5 BTC/day", icon: TrendingUp, color: "text-quantum-green" },
          { label: "Global Nodes", value: "1,248", icon: Shield, color: "text-quantum-purple" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.2, duration: 0.6 }}
            className="glass-card p-6 rounded-2xl flex flex-col gap-4 relative group overflow-hidden"
          >
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
              <stat.icon className="w-20 h-20" />
            </div>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-zinc-900/50 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-zinc-500 font-medium text-sm">{stat.label}</span>
            </div>
            <div className="text-3xl font-orbitron font-bold tracking-tight">{stat.value}</div>
          </motion.div>
        ))}
      </section>

      {/* Social Proof / Friends Invite Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-6xl glass-card p-8 rounded-3xl border-quantum-purple/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-quantum-purple to-transparent opacity-50" />
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-orbitron font-bold text-quantum-purple">The Referral Node</h2>
          <p className="text-zinc-400 max-w-md">Multiply your hashrate by inviting your network. Earn up to 15% commission on every block mined by your referrals.</p>
        </div>
        <div className="flex items-center gap-6 px-8 py-4 bg-zinc-900/80 rounded-2xl border border-white/5">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-quantum-dark flex items-center justify-center">
                <Users className="w-5 h-5 text-zinc-500" />
              </div>
            ))}
          </div>
          <span className="font-orbitron text-sm font-semibold tracking-wide">+12.4k Active Miners</span>
        </div>
      </motion.section>

      <footer className="mt-20 py-8 opacity-40 text-sm font-light">
        &copy; 2026 QUANTUMSTART INFRASTRUCTURE. ALL RIGHTS RESERVED.
      </footer>
    </main>
  );
}
