"use client"

import { useCart } from "@/components/providers/cart-provider"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
    const { items, removeItem, total, clearCart } = useCart()

    if (items.length === 0) {
        return (
            <div className="container flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
                <p className="text-muted-foreground">Add some medicines to get started.</p>
                <Button asChild>
                    <Link href="/products">Browse Products</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="container px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                                <div className="h-16 w-16 bg-muted rounded"></div>
                                <div>
                                    <h3 className="font-medium">{item.name}</h3>
                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                                    <Trash2 className="h-5 w-5 text-red-500" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    <Button variant="link" className="text-destructive px-0" onClick={clearCart}>
                        Clear Cart
                    </Button>
                </div>

                <div className="md:col-span-1">
                    <div className="border rounded-lg p-6 space-y-4 bg-muted/20">
                        <h3 className="font-semibold text-lg">Order Summary</h3>
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="border-t pt-4 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <Button className="w-full" size="lg">Checkout</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
