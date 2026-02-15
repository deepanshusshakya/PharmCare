import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getProduct } from "@/lib/data"
import { ShoppingCart, Heart, Share2 } from "lucide-react"

interface ProductPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    // Await params in newer Next.js versions if needed, or treat as object depending on version.
    // In Next.js 15, params is a promise.
    const { id } = await params
    const product = getProduct(id)

    if (!product) {
        notFound()
    }

    return (
        <div className="container px-4 md:px-6 py-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Product Image */}
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-4xl text-muted-foreground">Product Image</span>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <p className="text-muted-foreground mt-2">Category: {product.category}</p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
                        <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">In Stock</span>
                    </div>

                    <div className="flex space-x-4">
                        <Button size="lg" className="flex-1">
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
                            This is a placeholder description for {product.name}. Essential information about dosage, side effects, and usage would go here.
                        </p>

                        <h3 className="font-semibold text-lg">Dosage</h3>
                        <p className="text-muted-foreground">
                            Take as directed by your physician. Typical dosage: 1 tablet twice daily after meals.
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
