import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "quantum-dark": "#050510",
                "quantum-blue": "#00f2ff",
                "quantum-purple": "#bc13fe",
                "quantum-pink": "#ff00bd",
                "quantum-green": "#39ff14",
            },
            fontFamily: {
                orbitron: ["var(--font-orbitron)"],
                inter: ["var(--font-inter)"],
            },
        },
    },
    plugins: [],
};
export default config;
