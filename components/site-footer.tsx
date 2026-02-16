import Link from "next/link"
import { Phone, Mail, MapPin, Clock, ShieldCheck, HeartPulse } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export function SiteFooter() {
    return (
        <footer className="border-t bg-white">
            <div className="container mx-auto px-4 py-16 md:px-6">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5">
                    <div className="space-y-6 lg:col-span-2">
                        <Link href="/">
                            <Logo size="lg" />
                        </Link>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                            VrindaCare is your dedicated partner in health, providing 100% authentic medicines, monthly healthcare supplies, and expert consultation right at your doorstep.
                        </p>
                        <div className="flex gap-4">
                            <div className="flex flex-col items-center gap-1">
                                <ShieldCheck className="h-10 w-10 text-primary/20" />
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Certified</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <HeartPulse className="h-10 w-10 text-primary/20" />
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Trusted</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Healthcare Services</h3>
                        <ul className="space-y-4 text-sm font-medium text-gray-500">
                            <li><Link href="/products" className="hover:text-primary transition-colors">Order Medicines</Link></li>
                            <li><Link href="/lab-tests" className="hover:text-primary transition-colors">Book Lab Tests</Link></li>
                            <li><Link href="/upload-prescription" className="hover:text-primary transition-colors">Prescription Refill</Link></li>
                            <li><Link href="/wellness" className="hover:text-primary transition-colors">Wellness Store</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Support & Help</h3>
                        <ul className="space-y-4 text-sm font-medium text-gray-500">
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Our Stores</Link></li>
                            <li><Link href="/dashboard/orders" className="hover:text-primary transition-colors">Track Your Order</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Health Articles</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Store Contact</h3>
                        <ul className="space-y-4 text-sm font-medium text-gray-500">
                            <li className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <div>
                                    <p className="text-gray-900 font-bold">+91 98765 43210</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">24/7 Support Line</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0" />
                                <p className="leading-tight">Sector 45, Gurgaon, Haryana, India - 122003</p>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock className="h-5 w-5 text-primary shrink-0" />
                                <div>
                                    <p className="text-gray-900 font-bold">Open 24 Hours</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">Medicine Delivery</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <p>&copy; {new Date().getFullYear()} VrindaCare Medical Store. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
