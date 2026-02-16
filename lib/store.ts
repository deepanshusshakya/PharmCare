"use client"

export type Order = {
    id: string
    customer: string
    items: any[]
    total: number
    status: "Processing" | "Shipped" | "Delivered" | "Cancelled"
    date: string
    paymentMethod: string
    shippingAddress: string
}

export type Prescription = {
    id: string
    patient: string
    uploadedBy: string
    time: string
    status: "Pending" | "Approved" | "Rejected"
    image?: string
    notes?: string
}

const ORDERS_KEY = "vrindacare_orders"
const PRESCRIPTIONS_KEY = "vrindacare_prescriptions"

export const store = {
    getOrders: (): Order[] => {
        if (typeof window === "undefined") return []
        const saved = localStorage.getItem(ORDERS_KEY)
        return saved ? JSON.parse(saved) : []
    },
    saveOrder: (order: Order) => {
        const orders = store.getOrders()
        localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...orders]))
    },
    updateOrderStatus: (id: string, status: Order["status"]) => {
        const orders = store.getOrders()
        const updated = orders.map(o => o.id === id ? { ...o, status } : o)
        localStorage.setItem(ORDERS_KEY, JSON.stringify(updated))
    },
    getPrescriptions: (): Prescription[] => {
        if (typeof window === "undefined") return []
        const saved = localStorage.getItem(PRESCRIPTIONS_KEY)
        return saved ? JSON.parse(saved) : []
    },
    savePrescription: (prescription: Prescription) => {
        const prescriptions = store.getPrescriptions()
        localStorage.setItem(PRESCRIPTIONS_KEY, JSON.stringify([prescription, ...prescriptions]))
    },
    updatePrescriptionStatus: (id: string, status: Prescription["status"]) => {
        const prescriptions = store.getPrescriptions()
        const updated = prescriptions.map(p => p.id === id ? { ...p, status } : p)
        localStorage.setItem(PRESCRIPTIONS_KEY, JSON.stringify(updated))
    }
}
