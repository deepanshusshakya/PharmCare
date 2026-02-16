"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useProducts } from "@/components/providers/product-provider"
import { useCart } from "@/components/providers/cart-provider"
import { ShoppingCart, Heart, Share2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Product } from "@/lib/data"

export default function ProductPage() {
    const params = useParams()
    const router = useRouter()
    const { products } = useProducts()
    const { addItem } = useCart()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (params.id && products.length > 0) {
            const foundProduct = products.find(p => p.id === params.id)
            setProduct(foundProduct || null)
            setLoading(false)
        } else if (products.length > 0) {
            setLoading(false)
        }
    }, [params.id, products])

    if (loading) {
        return (
            <div className="container px-4 md:px-6 py-8 flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="container px-4 md:px-6 py-16 text-center">
                <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
                <p className="text-muted-foreground mb-8">The product you are looking for does not exist or has been removed.</p>
                <Button onClick={() => router.push("/products")}>Back to Products</Button>
            </div>
        )
    }

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        })
        // Simple feedback
        alert(`${product.name} added to cart!`)
    }

    return (
        <div className="container px-4 md:px-6 py-8">
            <Link href="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
            </Link>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Product Image */}
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    {product.image && product.image !== "/images/placeholder.jpg" ? (
                        <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                    ) : (
                        <span className="text-4xl text-muted-foreground text-center px-4">
                            {product.name}<br />
                            <small className="text-sm font-normal">No Image Available</small>
                        </span>
                    )}
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <p className="text-muted-foreground mt-2">Category: {product.category}</p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-3xl font-bold text-primary">₹{product.price.toFixed(2)}</span>
                        <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">In Stock</span>
                    </div>

                    <div className="flex space-x-4">
                        <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Add to Cart
                        </Button>
                        <Button variant="outline" size="icon">
                            <Heart className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Share2 className="h-5 w-5" />
                        </Button>
                    </div>

                    <div className="border-t pt-6 space-y-4">
                        <h3 className="font-semibold text-lg">Description</h3>
                        <p className="text-muted-foreground">
                            High-quality {product.name} for your health and wellness. This product is sourced from trusted manufacturers and follows all safety standards.
                        </p>

                        <h3 className="font-semibold text-lg">Dosage</h3>
                        <p className="text-muted-foreground">
                            Take as directed by your physician or as indicated on the packaging.
                        </p>

                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm text-yellow-800">
                            <strong>Safety Warning:</strong> Keep out of reach of children. Consult a doctor before use if pregnant or nursing.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

