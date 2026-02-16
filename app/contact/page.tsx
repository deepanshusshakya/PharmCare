"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, CheckCircle2, Send } from "lucide-react"

export default function ContactPage() {
    const searchParams = useSearchParams()
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
    })

    useEffect(() => {
        const subject = searchParams.get("subject")
        const message = searchParams.get("message")
        if (subject || message) {
            setFormData(prev => ({
                ...prev,
                subject: subject || prev.subject,
                message: message || prev.message
            }))
        }
    }, [searchParams])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulate submission
        setIsSubmitted(true)
    }

    if (isSubmitted) {
        return (
            <div className="container px-4 py-24 flex flex-col items-center text-center animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-10 w-10" />
                </div>
                <h1 className="text-4xl font-black text-gray-900 mb-4">Message Received!</h1>
                <p className="text-gray-500 max-w-md font-medium text-lg mb-8">
                    Thank you for reaching out to VrindaCare. Our health consultant will get back to you within 2-4 hours.
                </p>
                <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
            </div>
        )
    }

    return (
        <div className="bg-gray-50/50 min-h-screen">
            <div className="container px-4 md:px-6 py-16">
                <div className="flex flex-col items-center text-center space-y-4 mb-16">
                    <h1 className="text-4xl font-black tracking-tight sm:text-5xl text-gray-900">Get in <span className="text-primary">Touch</span></h1>
                    <p className="text-gray-500 max-w-[600px] font-medium text-lg">
                        Have questions about medicines, orders, or lab tests? Our team is here to help you 24/7.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {/* Contact Information */}
                    <div className="space-y-8 lg:col-span-1">
                        <Card className="rounded-3xl border-none shadow-sm overflow-hidden">
                            <CardHeader className="bg-primary text-white pb-8">
                                <CardTitle className="text-2xl font-bold">Contact Info</CardTitle>
                                <CardDescription className="text-primary-foreground/80 font-medium">
                                    Multiple ways to reach us.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8 pt-8">
                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Main Pharmacy</h3>
                                        <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                            Sector 45, Gurgaon,<br />
                                            Haryana, India - 122003
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Phone Support</h3>
                                        <p className="text-gray-500 text-sm font-medium">+91 98765 43210</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Available 24/7</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Email Query</h3>
                                        <p className="text-gray-500 text-sm font-medium">support@vrindacare.com</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-3xl border-none shadow-sm">
                            <CardHeader>
                                <div className="flex items-center gap-2 text-primary">
                                    <Clock className="h-5 w-5" />
                                    <CardTitle className="text-lg">Store Hours</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4 text-sm font-bold text-gray-600">
                                    <li className="flex justify-between border-b border-gray-50 pb-2">
                                        <span className="text-gray-400 uppercase tracking-tighter">Retail Outlet</span>
                                        <span>8 AM - 11 PM</span>
                                    </li>
                                    <li className="flex justify-between border-b border-gray-50 pb-2">
                                        <span className="text-gray-400 uppercase tracking-tighter">Home Delivery</span>
                                        <span className="text-primary italic">24 Hours</span>
                                    </li>
                                    <li className="flex justify-between pb-2">
                                        <span className="text-gray-400 uppercase tracking-tighter">Lab Collection</span>
                                        <span>6 AM - 8 PM</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <Card className="lg:col-span-2 rounded-[40px] border-none shadow-sm p-4 md:p-8">
                        <CardHeader className="pb-8">
                            <CardTitle className="text-3xl font-black text-gray-900">Send us a Message</CardTitle>
                            <CardDescription className="text-lg font-medium text-gray-500">
                                We'll analyze your query and get back with a solution.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                                        <Input
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all text-base"
                                            placeholder="Rahul" required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                                        <Input
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all text-base"
                                            placeholder="Sharma" required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all text-base"
                                        placeholder="rahul@example.com" required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                                    <Input
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="h-14 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white transition-all text-base"
                                        placeholder="How can we help?" required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="flex w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 text-base shadow-sm focus:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 min-h-[160px] transition-all"
                                        placeholder="Tell us more about your requirement..."
                                        required
                                    ></textarea>
                                </div>
                                <Button type="submit" className="w-full h-16 rounded-2xl text-xl font-black shadow-xl shadow-primary/20 group hover:shadow-primary/30 active:scale-[0.98] transition-all">
                                    <Send className="h-6 w-6 mr-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
