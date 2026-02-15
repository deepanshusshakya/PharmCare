"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Package, FileText, Truck, Check, X, Search } from "lucide-react"

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("inventory")

    return (
        <div className="container px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Admin Panel</h1>
                <div className="flex gap-2">
                    <Button variant={activeTab === "inventory" ? "default" : "outline"} onClick={() => setActiveTab("inventory")}>
                        <Package className="mr-2 h-4 w-4" />
                        Inventory
                    </Button>
                    <Button variant={activeTab === "prescriptions" ? "default" : "outline"} onClick={() => setActiveTab("prescriptions")}>
                        <FileText className="mr-2 h-4 w-4" />
                        Prescriptions
                    </Button>
                    <Button variant={activeTab === "orders" ? "default" : "outline"} onClick={() => setActiveTab("orders")}>
                        <Truck className="mr-2 h-4 w-4" />
                        Orders
                    </Button>
                </div>
            </div>

            {activeTab === "inventory" && (
                <Card>
                    <CardHeader>
                        <CardTitle>Inventory Management</CardTitle>
                        <div className="flex gap-4 mt-4">
                            <Input placeholder="Search products..." className="max-w-sm" />
                            <Button>Add Product</Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <div className="grid grid-cols-4 p-4 font-medium bg-muted">
                                <div>Product Name</div>
                                <div>Category</div>
                                <div>Stock</div>
                                <div>Price</div>
                            </div>
                            <div className="divide-y">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <div key={item} className="grid grid-cols-4 p-4 hover:bg-muted/50 items-center">
                                        <div>Product {item}</div>
                                        <div>Wellness</div>
                                        <div className="text-green-600">In Stock (50)</div>
                                        <div>$25.00</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {activeTab === "prescriptions" && (
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Verifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
                                            <FileText className="h-5 w-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Prescription #{item}00{item}</h3>
                                            <p className="text-sm text-muted-foreground">Uploaded by John Doe • 2 mins ago</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                            <X className="h-4 w-4 mr-1" /> Reject
                                        </Button>
                                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                            <Check className="h-4 w-4 mr-1" /> Approve
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {activeTab === "orders" && (
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <div className="grid grid-cols-4 p-4 font-medium bg-muted">
                                <div>Order ID</div>
                                <div>Customer</div>
                                <div>Status</div>
                                <div>Total</div>
                            </div>
                            <div className="divide-y">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="grid grid-cols-4 p-4 hover:bg-muted/50 items-center">
                                        <div>#ORD-{item}234</div>
                                        <div>Jane Smith</div>
                                        <div>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                Processing
                                            </span>
                                        </div>
                                        <div>$45.50</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
