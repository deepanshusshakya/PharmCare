import { Suspense } from "react"
import { ContactForm } from "./ContactForm"
import { Loader2 } from "lucide-react"

export const dynamic = "force-dynamic"

export default function ContactPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <Loader2 className="h-8 w-8 text-emerald-600 animate-spin" />
            </div>
        }>
            <ContactForm />
        </Suspense>
    )
}
