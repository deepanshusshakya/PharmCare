"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Pill, Mail, Lock, ArrowRight, Github, Chrome, Facebook } from "lucide-react"
import { store } from "@/lib/store"
import { Logo } from "@/components/ui/logo"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    useEffect(() => {
        // Redirect if already logged in
        if (store.getCurrentUser()) {
            router.push("/dashboard")
        }
    }, [router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        // Simulate API call
        setTimeout(() => {
            if (email && password.length >= 6) {
                // Mock successful login
                const name = email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1)
                store.login(email, name)
                router.push("/")
            } else {
                setError("Invalid email or password. Password must be at least 6 characters.")
            }
            setIsLoading(false)
        }, 1500)
    }

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50">
            <div className="w-full max-w-md space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="flex justify-center mb-6">
                        <Logo />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h1>
                    <p className="text-slate-500">Please enter your details to sign in</p>
                </div>

                {/* Card */}
                <div className="bg-white p-8 rounded-2xl shadow-xl shadow-emerald-900/5 border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className="pl-10 h-11 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10 h-11 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
                                {error}
                            </div>
                        )}

                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" className="border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600" />
                            <label
                                htmlFor="remember"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600"
                            >
                                Remember me for 30 days
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing in...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    Sign in <ArrowRight className="h-4 w-4" />
                                </div>
                            )}
                        </Button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-3 text-slate-500 font-medium">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-11 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all">
                            <div className="flex items-center gap-2">
                                <Chrome className="h-4 w-4 text-slate-600" />
                                <span className="text-slate-700">Google</span>
                            </div>
                        </Button>
                        <Button variant="outline" className="h-11 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all">
                            <div className="flex items-center gap-2">
                                <Facebook className="h-4 w-4 text-emerald-600" />
                                <span className="text-slate-700">Facebook</span>
                            </div>
                        </Button>
                    </div>
                </div>

                {/* Footer Link */}
                <p className="text-center text-sm text-slate-600">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
                    >
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    )
}
