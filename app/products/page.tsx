import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getAllProducts } from "@/lib/data"

export default function ProductsPage() {
    const products = getAllProducts()

    return (
        <div className="container px-4 md:px-6 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters (Mock) */}
                <aside className="w-full md:w-64 space-y-6">
                    <div>
                        <h3 className="font-semibold mb-4">Categories</h3>
                        <div className="space-y-2">
                            {["Wellness", "Diabetes", "Baby Care", "Personal Care"].map((cat) => (
                                <div key={cat} className="flex items-center space-x-2">
                                    <input type="checkbox" id={cat} className="rounded border-gray-300" />
                                    <label htmlFor={cat} className="text-sm">{cat}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Price Range</h3>
                        {/* Slider placeholder */}
                        <div className="h-2 bg-secondary rounded w-full"></div>
                        <div className="flex justify-between text-sm mt-2">
                            <span>$0</span>
                            <span>$100</span>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold">All Medicines</h1>
                        <span className="text-muted-foreground">{products.length} products</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <Link key={product.id} href={`/products/${product.id}`}>
                                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="aspect-square bg-muted flex items-center justify-center p-4">
                                        {/* Placeholder */}
                                        <span className="text-muted-foreground">Image</span>
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
                                        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                        <div className="flex items-center justify-between mt-4">
                                            <span className="font-bold text-primary text-xl">${product.price.toFixed(2)}</span>
                                            <Button size="sm">Add to Cart</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
