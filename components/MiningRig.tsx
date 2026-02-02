"use client";

import { motion } from "framer-motion";

export default function MiningRig() {
    return (
        <div className="relative w-full aspect-square max-w-[400px] flex items-center justify-center">
            {/* Outer Rotating Ring */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-full h-full border-2 border-dashed border-quantum-blue/20 rounded-full"
            />

            {/* Inner Hexagon/Core Structure */}
            <div className="relative w-2/3 h-2/3 flex items-center justify-center">
                {/* Pulsing Core */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 1, 0.5],
                        boxShadow: [
                            "0 0 20px rgba(0, 242, 255, 0.3)",
                            "0 0 50px rgba(0, 242, 255, 0.6)",
                            "0 0 20px rgba(0, 242, 255, 0.3)"
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 bg-quantum-blue rounded-full z-10"
                />

                {/* Energy Lines */}
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                    <div
                        key={angle}
                        className="absolute w-1 h-1/2 bg-gradient-to-t from-quantum-blue to-transparent origin-bottom"
                        style={{
                            transform: `rotate(${angle}deg) translateY(-50%)`,
                            opacity: 0.3
                        }}
                    >
                        {/* Particle following the line */}
                        <motion.div
                            animate={{ bottom: ["0%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: angle / 100 }}
                            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full blur-[2px]"
                        />
                    </div>
                ))}
            </div>

            {/* Floating Data Nodes */}
            {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, Math.sin(i) * 20, 0],
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: i * 0.5
                    }}
                    className="absolute w-4 h-4 glass-card border-white/20 rounded-lg flex items-center justify-center text-[8px] font-bold text-quantum-blue"
                    style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`
                    }}
                >
                    {Math.random() > 0.5 ? "0" : "1"}
                </motion.div>
            ))}

            {/* Status Indicators */}
            <div className="absolute bottom-[-20px] flex gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-quantum-green animate-pulse" />
                    <span className="text-[10px] font-orbitron text-zinc-500 uppercase">System Optimal</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-quantum-blue animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <span className="text-[10px] font-orbitron text-zinc-500 uppercase">Data Syncing</span>
                </div>
            </div>
        </div>
    );
}
