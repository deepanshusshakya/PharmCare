import React from "react"

interface LogoProps {
    className?: string
    showText?: boolean
    size?: "sm" | "md" | "lg"
}

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
    const iconSize = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-20 w-20" : "h-12 w-12"
    const textSize = size === "sm" ? "text-xl" : size === "lg" ? "text-5xl" : "text-3xl"

    return (
        <div className={`flex items-center gap-4 ${className} group`}>
            <div className={`relative ${iconSize} shrink-0`}>
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-[0_4px_12px_rgba(16,185,129,0.2)]"
                >
                    {/* Background Soft Glow - only in larger sizes */}
                    <circle cx="50" cy="50" r="45" fill="url(#logo-glow)" opacity="0.15" />

                    {/* Left Fluid Shape (Heart/Support) */}
                    <path
                        d="M30 25C30 25 25 75 50 90C55 87 60 70 60 55C60 40 50 25 30 25Z"
                        fill="url(#v-gradient-dark)"
                    />

                    {/* Right Flourish (Leaf/Growth) */}
                    <path
                        d="M50 90C50 90 75 75 85 45C90 30 75 25 60 40C55 45 45 75 50 90Z"
                        fill="url(#v-gradient-light)"
                    />

                    {/* Central Medical Detail */}
                    <circle cx="50" cy="58" r="8" fill="white" fillOpacity="0.9" />
                    <path
                        d="M50 54V62M46 58H54"
                        stroke="#059669"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />

                    <defs>
                        <linearGradient id="v-gradient-dark" x1="30" y1="25" x2="50" y2="90" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#064E3B" />
                            <stop offset="1" stopColor="#065F46" />
                        </linearGradient>
                        <linearGradient id="v-gradient-light" x1="50" y1="90" x2="85" y2="45" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#10B981" />
                            <stop offset="1" stopColor="#34D399" />
                        </linearGradient>
                        <radialGradient id="logo-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50) rotate(90) scale(45)">
                            <stop stopColor="#10B981" />
                            <stop offset="1" stopColor="#10B981" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                </svg>
                {/* Micro-interaction highlight */}
                <div className="absolute inset-0 bg-white/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {showText && (
                <div className={`flex flex-col leading-none ${textSize}`}>
                    <span className="font-extrabold text-gray-900 tracking-tighter flex items-center">
                        Vrinda<span className="text-emerald-600">Care</span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600/60 mt-1 ml-1">
                        Medical & Wellness
                    </span>
                </div>
            )}
        </div>
    )
}
