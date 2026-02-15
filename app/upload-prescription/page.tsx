"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Upload, FileText, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function UploadPrescriptionPage() {
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Mock API call
        setTimeout(() => setIsSubmitted(true), 1000)
    }

    if (isSubmitted) {
        return (
            <div className="container flex flex-col items-center justify-center min-h-[60vh] py-12 text-center space-y-4">
                <div className="p-4 bg-green-100 rounded-full text-green-600">
                    <CheckCircle className="h-12 w-12" />
                </div>
                <h1 className="text-3xl font-bold">Prescription Uploaded!</h1>
                <p className="text-muted-foreground max-w-md">
                    Your prescription has been sent to our pharmacists for verification.
                    We will update you shortly via SMS/Email.
                </p>
                <div className="flex gap-4">
                    <Button asChild variant="outline">
                        <Link href="/">Back to Home</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container max-w-2xl px-4 py-12">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Upload Prescription</CardTitle>
                    <CardDescription>
                        Upload a clear image of your doctor&apos;s prescription. Our pharmacists will verify and process your order.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid w-full items-center gap-1.5">
                            <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-muted-foreground">PNG, JPG or PDF (MAX. 5MB)</p>
                                </div>
                                <Input id="dropzone-file" type="file" className="hidden" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="notes" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Additional Notes (Optional)
                            </label>
                            <textarea
                                id="notes"
                                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                                placeholder="Mention any specific medicines or quantities..."
                            ></textarea>
                        </div>

                        <Button type="submit" className="w-full" size="lg">
                            <FileText className="mr-2 h-4 w-4" />
                            Submit Prescription
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
