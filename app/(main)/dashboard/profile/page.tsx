"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, User, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { store } from "@/lib/store"

export default function ProfilePage() {
    const router = useRouter()
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    })

    useEffect(() => {
        const user = store.getCurrentUser()
        if (!user) {
            router.push("/login")
        } else {
            setProfile({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "+91 98765 43210",
                address: user.address || "123 Health Dr, Wellness City, India"
            })
        }
    }, [router])

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault()
        // In a real app, we would update the store/API here
        alert("Profile updated successfully!")
    }

    if (!profile.email) return null

    return (
        <div className="container px-4 py-8">
            <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

            <div className="max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <User className="mr-2 h-5 w-5 text-primary" />
                            Personal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input className="pl-10" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input className="pl-10" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} disabled />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input className="pl-10" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Primary Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input className="pl-10" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <Button type="submit" className="w-full sm:w-auto px-8 font-bold">Update Profile</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
