"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Package,
    FileText,
    Truck,
    Check,
    X,
    Search,
    Users,
    LayoutDashboard,
    TrendingUp,
    TrendingDown,
    ShoppingCart,
    DollarSign,
    Activity,
    Menu,
    Download,
    Pill
} from "lucide-react"
import { getAllProducts, categories } from "@/lib/data"
import { useProducts } from "@/components/providers/product-provider"
import { store, type Order, type Prescription } from "@/lib/store"

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard")
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const { products, addProduct, deleteProduct, updateProduct } = useProducts()

    const [orders, setOrders] = useState<Order[]>([])
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([])

    // UI States
    const [toast, setToast] = useState<{ message: string, type: "success" | "error" | "info" } | null>(null)
    const [modal, setModal] = useState<{
        type: "order" | "product" | "user" | "prescription" | "form",
        data: any
    } | null>(null)

    // Form state for adding/editing product
    const [productForm, setProductForm] = useState({
        id: "",
        name: "",
        category: "Wellness",
        price: "",
        image: ""
    })

    useEffect(() => {
        setOrders(store.getOrders())
        setPrescriptions(store.getPrescriptions())
    }, [])

    const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
        setToast({ message, type })
        setTimeout(() => setToast(null), 3000)
    }

    const refreshData = () => {
        setOrders(store.getOrders())
        setPrescriptions(store.getPrescriptions())
    }

    // Dashboard stats
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
    const stats = {
        totalOrders: orders.length,
        ordersTrend: 12.5,
        totalRevenue: totalRevenue,
        revenueTrend: 8.2,
        activeUsers: 856,
        usersTrend: -2.4,
        pendingPrescriptions: prescriptions.filter(p => p.status === "Pending").length,
        prescriptionsTrend: 5.1
    }

    const recentOrders = orders.slice(0, 5)

    const users = [
        { id: 1, name: "Rahul Verma", email: "rahul@example.com", orders: 12, joined: "Jan 2024" },
        { id: 2, name: "Anita Desai", email: "anita@example.com", orders: 8, joined: "Feb 2024" },
        { id: 3, name: "Karan Mehta", email: "karan@example.com", orders: 15, joined: "Dec 2023" },
        { id: 4, name: "Pooja Iyer", email: "pooja@example.com", orders: 5, joined: "Mar 2024" },
    ]

    // Action Handlers
    const handleApprovePrescription = (id: string) => {
        store.updatePrescriptionStatus(id, "Approved")
        refreshData()
        showToast(`Prescription ${id} approved`)
        setModal(null)
    }

    const handleRejectPrescription = (id: string) => {
        store.updatePrescriptionStatus(id, "Rejected")
        refreshData()
        showToast(`Prescription ${id} rejected`, "error")
        setModal(null)
    }

    const handleUpdateOrderStatus = (id: string, status: Order["status"]) => {
        store.updateOrderStatus(id, status)
        refreshData()
        showToast(`Order ${id} status updated to ${status}`)
    }

    const handleSaveProduct = () => {
        if (!productForm.name || !productForm.price) {
            showToast("Please fill name and price", "error")
            return
        }

        if (productForm.id) {
            updateProduct({
                id: productForm.id,
                name: productForm.name,
                category: productForm.category,
                price: parseFloat(productForm.price),
                image: productForm.image || "/images/placeholder.jpg",
                slug: productForm.name.toLowerCase().replace(/ /g, "-")
            })
            showToast("Product updated successfully")
        } else {
            addProduct({
                name: productForm.name,
                category: productForm.category,
                price: parseFloat(productForm.price),
                image: productForm.image || "/images/placeholder.jpg"
            })
            showToast("Product added successfully")
        }

        setModal(null)
        setProductForm({ id: "", name: "", category: "Wellness", price: "", image: "" })
    }

    const handleDeleteProduct = (productId: string, productName: string) => {
        deleteProduct(productId)
        showToast(`Product "${productName}" deleted`, "info")
    }

    const handleExport = (type: string) => {
        showToast(`Exporting ${type}...`, "info")
    }

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "shipped": return "bg-purple-100 text-purple-800"
            case "delivered": return "bg-green-100 text-green-800"
            case "cancelled": return "bg-red-100 text-red-800"
            case "approved": return "bg-green-100 text-green-800"
            case "pending": return "bg-amber-100 text-amber-800"
            case "rejected": return "bg-red-100 text-red-800"
            default: return "bg-blue-100 text-blue-800"
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex overflow-hidden">
            {/* Toast Notification */}
            {toast && (
                <div className={`fixed bottom-4 right-4 z-[99] p-4 rounded-lg shadow-xl animate-in fade-in slide-in-from-bottom-5 duration-300 flex items-center gap-2 border ${toast.type === "success" ? "bg-green-50 text-green-800 border-green-200" : toast.type === "error" ? "bg-red-50 text-red-800 border-red-200" : "bg-blue-50 text-blue-800 border-blue-200"}`}>
                    {toast.type === "success" ? <Check className="h-5 w-5" /> : toast.type === "error" ? <X className="h-5 w-5" /> : <Activity className="h-5 w-5" />}
                    <span className="font-medium">{toast.message}</span>
                </div>
            )}

            {/* Modal Overlay */}
            {modal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
                        <div className="p-6 border-b flex items-center justify-between bg-gray-50/50">
                            <h3 className="text-xl font-bold text-gray-900 capitalize">
                                {modal.type === "form" ? (modal.data.id ? "Edit Product" : "Add New Product") : `${modal.type} Details`}
                            </h3>
                            <button onClick={() => setModal(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1">
                            {modal.type === "form" && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Product Name</label>
                                        <Input
                                            value={productForm.name}
                                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                            placeholder="Enter drug name"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700">Category</label>
                                            <select
                                                className="w-full px-4 py-2 border rounded-lg outline-none text-sm"
                                                value={productForm.category}
                                                onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                                            >
                                                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-gray-700">Price (₹)</label>
                                            <Input
                                                type="number"
                                                value={productForm.price}
                                                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Image URL</label>
                                        <Input
                                            value={productForm.image}
                                            onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                                            placeholder="/images/example.jpg"
                                        />
                                    </div>
                                    <Button
                                        onClick={handleSaveProduct}
                                        className="w-full h-12 text-lg mt-4"
                                    >
                                        {productForm.id ? "Update Product" : "Save Product"}
                                    </Button>
                                </div>
                            )}

                            {modal.type === "order" && (
                                <div className="space-y-6 text-gray-800">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm text-gray-500">Order ID</p>
                                            <p className="font-bold text-lg">{modal.data.id}</p>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(modal.data.status)}`}>
                                            {modal.data.status}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="font-semibold border-b pb-1 text-primary">Customer Info</p>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <p className="text-gray-500">Name:</p><p className="font-medium">{modal.data.customer}</p>
                                            <p className="text-gray-500">Address:</p><p className="font-medium">{modal.data.shippingAddress}</p>
                                            <p className="text-gray-500">Date:</p><p className="font-medium">{modal.data.date}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="font-semibold border-b pb-1 text-primary">Items</p>
                                        <div className="space-y-2">
                                            {modal.data.items?.map((item: any, i: number) => (
                                                <div key={i} className="flex justify-between text-sm">
                                                    <span>{item.name} x {item.quantity}</span>
                                                    <span className="font-medium">₹{item.price * item.quantity}</span>
                                                </div>
                                            ))}
                                            <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg text-primary">
                                                <span>Total</span>
                                                <span>₹{modal.data.total}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-100 p-4 rounded-xl space-y-3">
                                        <p className="text-xs font-bold text-gray-500 uppercase text-center">Update Status</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {["Shipped", "Delivered", "Cancelled"].map((s) => (
                                                <button
                                                    key={s}
                                                    onClick={() => handleUpdateOrderStatus(modal.data.id, s as any)}
                                                    className="px-3 py-2 bg-white border rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition-all shadow-sm"
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {modal.type === "prescription" && (
                                <div className="space-y-6">
                                    <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden text-gray-400">
                                        <FileText className="h-12 w-12" />
                                        <p className="absolute bottom-4 text-xs font-medium">No Image Uploaded</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-500">Patient</p>
                                        <p className="font-bold text-lg">{modal.data.patient}</p>
                                        {modal.data.notes && (
                                            <p className="text-sm text-gray-600 bg-amber-50 p-3 rounded-lg border border-amber-100 italic">
                                                "{modal.data.notes}"
                                            </p>
                                        )}
                                    </div>
                                    {modal.data.status === "Pending" && (
                                        <div className="flex gap-4 pt-4 border-t">
                                            <Button
                                                variant="outline"
                                                onClick={() => handleRejectPrescription(modal.data.id)}
                                                className="flex-1 text-red-600 border-red-100 hover:bg-red-50"
                                            >
                                                Reject
                                            </Button>
                                            <Button
                                                onClick={() => handleApprovePrescription(modal.data.id)}
                                                className="flex-1 bg-green-600 hover:bg-green-700"
                                            >
                                                Approve
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r transition-all duration-300 hidden md:flex flex-col z-40`}>
                <div className="p-6 flex items-center justify-between border-b">
                    {sidebarOpen && <span className="text-xl font-bold text-primary flex items-center gap-2"><Pill className="h-6 w-6" /> Admin</span>}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors border shadow-sm">
                        <Menu className="h-5 w-5 text-gray-600" />
                    </button>
                </div>
                <nav className="flex-1 p-4 space-y-2 mt-4">
                    {[
                        { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
                        { id: "orders", icon: ShoppingCart, label: "Orders" },
                        { id: "inventory", icon: Package, label: "Inventory" },
                        { id: "prescriptions", icon: FileText, label: "Prescriptions" },
                        { id: "users", icon: Users, label: "Users" },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === item.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-gray-600 hover:bg-gray-100"}`}
                        >
                            <item.icon className="h-5 w-5 shrink-0" />
                            {sidebarOpen && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-20 bg-white border-b flex items-center justify-between px-8 z-30">
                    <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 min-w-[300px]">
                        <Search className="h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search everything..."
                            className="bg-transparent border-none outline-none w-full text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 bg-gray-50 pr-4 pl-1 py-1 rounded-full border border-gray-200">
                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">V</div>
                            <div className="hidden lg:block">
                                <p className="text-sm font-bold text-gray-900">Vrindacare Admin</p>
                                <p className="text-[10px] text-gray-500 font-bold uppercase">Super Admin</p>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8 space-y-8 bg-gray-50/50 scroll-smooth">
                    {activeTab === "dashboard" && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
                                    <p className="text-gray-500 font-medium mt-1">Real-time status of your store.</p>
                                </div>
                                <Button variant="outline" onClick={() => handleExport("Full Report")}>
                                    <Download className="h-4 w-4 mr-2" /> Export
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { label: "Orders", value: stats.totalOrders, icon: ShoppingCart, trend: stats.ordersTrend, color: "blue" },
                                    { label: "Revenue", value: `₹${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, trend: stats.revenueTrend, color: "green" },
                                    { label: "Users", value: stats.activeUsers, icon: Users, trend: stats.usersTrend, color: "purple" },
                                    { label: "Pending", value: stats.pendingPrescriptions, icon: FileText, trend: stats.prescriptionsTrend, color: "amber" },
                                ].map((stat, i) => (
                                    <Card key={i} className="hover:border-primary/50 transition-colors cursor-default">
                                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                                            <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</CardTitle>
                                            <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                                            <div className={`flex items-center gap-1 text-[10px] font-bold mt-1 ${stat.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {stat.trend > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                                {stat.trend}% vs last month
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg">Recent Orders</CardTitle>
                                            <CardDescription>Latest transactions in your store</CardDescription>
                                        </div>
                                        <Button variant="ghost" className="text-primary font-bold" onClick={() => setActiveTab("orders")}>View All</Button>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {recentOrders.map((order) => (
                                                <div
                                                    key={order.id}
                                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200"
                                                    onClick={() => setModal({ type: "order", data: order })}
                                                >
                                                    <div className="flex gap-4 items-center">
                                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border font-bold text-xs">#{order.id.slice(-4)}</div>
                                                        <div>
                                                            <p className="font-bold text-sm">{order.customer}</p>
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{order.status}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-sm text-primary">₹{order.total}</p>
                                                        <p className="text-[10px] text-gray-400">{order.date}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            {recentOrders.length === 0 && <p className="text-center py-8 text-sm text-gray-400 italic">No orders yet</p>}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg">Pending Verification</CardTitle>
                                            <CardDescription>Prescriptions awaiting approval</CardDescription>
                                        </div>
                                        <Button variant="ghost" className="text-primary font-bold" onClick={() => setActiveTab("prescriptions")}>Verify</Button>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {prescriptions.filter(p => p.status === "Pending").map((rx) => (
                                                <div
                                                    key={rx.id}
                                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-transparent hover:border-primary/20 transition-all cursor-pointer"
                                                    onClick={() => setModal({ type: "prescription", data: rx })}
                                                >
                                                    <div className="flex gap-4 items-center">
                                                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center border border-blue-100 font-bold text-xs cursor-pointer">RX</div>
                                                        <div>
                                                            <p className="font-bold text-sm">{rx.patient}</p>
                                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{rx.id}</p>
                                                        </div>
                                                    </div>
                                                    <Button size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest bg-primary text-white">Review</Button>
                                                </div>
                                            ))}
                                            {prescriptions.filter(p => p.status === "Pending").length === 0 && <p className="text-center py-8 text-sm text-gray-400 italic text-green-600 font-bold">Queue is clear! ✅</p>}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {activeTab === "inventory" && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Medicine Inventory</h1>
                                    <p className="text-gray-500 font-medium">Manage prices and products.</p>
                                </div>
                                <Button
                                    className="px-8 py-6 h-auto text-lg font-black rounded-2xl shadow-xl shadow-primary/20"
                                    onClick={() => {
                                        setProductForm({ id: "", name: "", category: "Wellness", price: "", image: "" })
                                        setModal({ type: "form", data: {} })
                                    }}
                                >
                                    <Package className="h-6 w-6 mr-2" /> Add Medicine
                                </Button>
                            </div>

                            <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-100">
                                                <th className="px-8 py-6 text-left text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Product Details</th>
                                                <th className="px-8 py-6 text-left text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Category</th>
                                                <th className="px-8 py-6 text-left text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Price</th>
                                                <th className="px-8 py-6 text-right text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap pr-12">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {products.filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((product) => (
                                                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden border p-1 group-hover:border-primary/50 transition-all">
                                                                <img src={product.image || "/images/placeholder.jpg"} className="w-full h-full object-contain" />
                                                            </div>
                                                            <p className="font-extrabold text-gray-900 text-base">{product.name}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-200">{product.category}</span>
                                                    </td>
                                                    <td className="px-8 py-6 font-black text-gray-900 text-lg">₹{product.price}</td>
                                                    <td className="px-8 py-6 text-right pr-12">
                                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                            <button
                                                                onClick={() => {
                                                                    setProductForm({
                                                                        id: product.id,
                                                                        name: product.name,
                                                                        category: product.category,
                                                                        price: product.price.toString(),
                                                                        image: product.image || ""
                                                                    })
                                                                    setModal({ type: "form", data: product })
                                                                }}
                                                                className="p-3 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95 border border-blue-100"
                                                            >
                                                                <TrendingUp className="h-5 w-5" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteProduct(product.id, product.name)}
                                                                className="p-3 bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95 border border-red-100"
                                                            >
                                                                <X className="h-5 w-5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {["orders", "prescriptions", "users"].includes(activeTab) && (
                        <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-gray-300 animate-in fade-in duration-500">
                            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Activity className="h-12 w-12 text-primary" />
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 capitalize tracking-tight">{activeTab} Database</h2>
                            <p className="text-gray-500 mt-2 font-medium max-w-sm mx-auto">Accessing secure medical records. You can view details by clicking on items below.</p>

                            <div className="mt-12 flex flex-wrap justify-center gap-6">
                                {activeTab === "orders" && orders.map(o => (
                                    <div key={o.id} className="p-6 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-primary text-left min-w-[250px] cursor-pointer transition-all active:scale-95 shadow-sm" onClick={() => setModal({ type: "order", data: o })}>
                                        <div className="flex justify-between items-start mb-4">
                                            <p className="font-black text-lg text-primary">{o.id}</p>
                                            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusColor(o.status)}`}>{o.status}</span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-700">{o.customer}</p>
                                        <p className="text-xs text-gray-400 mt-1">{o.date}</p>
                                        <p className="text-lg font-black text-gray-900 mt-4">₹{o.total}</p>
                                    </div>
                                ))}
                                {activeTab === "prescriptions" && prescriptions.map(p => (
                                    <div key={p.id} className="p-6 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-primary text-left min-w-[250px] cursor-pointer transition-all active:scale-95 shadow-sm" onClick={() => setModal({ type: "prescription", data: p })}>
                                        <div className="flex justify-between items-start mb-4">
                                            <p className="font-black text-lg text-primary">{p.id}</p>
                                            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusColor(p.status)}`}>{p.status}</span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-700">{p.patient}</p>
                                        <p className="text-xs text-gray-400 mt-1">{p.time}</p>
                                    </div>
                                ))}
                                {activeTab === "users" && users.map(u => (
                                    <div key={u.id} className="p-6 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-primary text-left min-w-[250px] cursor-pointer transition-all active:scale-95 shadow-sm" onClick={() => showToast(`Viewing ${u.name}'s profile`)}>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-black">{u.name[0]}</div>
                                            <div>
                                                <p className="font-black text-gray-900">{u.name}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-medium text-gray-500">{u.email}</p>
                                        <div className="flex justify-between mt-4">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Orders</p>
                                            <p className="font-black text-primary">{u.orders}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
