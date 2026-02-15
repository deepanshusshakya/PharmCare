import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAllProducts, categories } from "@/lib/data"
import { notFound } from "next/navigation"

interface CategoryPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params
    const category = categories.find((c) => c.slug === slug)

    if (!category) {
        notFound()
    }

    const products = getAllProducts().filter(
        (p) => p.category.toLowerCase() === category.name.toLowerCase()
    )

    return (
        <div className="container px-4 md:px-6 py-8">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">{category.name}</h1>
                <p className="text-muted-foreground">Browse our selection of {category.name} products.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Link key={product.id} href={`/products/${product.id}`}>
                            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                                <div className="aspect-square bg-muted flex items-center justify-center">
                                    <div className="text-muted-foreground">Product Image</div>
                                </div>
                                <CardContent className="p-4">
                                    <div className="text-sm text-muted-foreground mb-1">{product.category}</div>
                                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
                                        <Button size="sm" variant="secondary">
                                            View
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-muted-foreground mb-4">No products found in this category yet.</p>
                        <Button asChild>
                            <Link href="/products">Browse All Medicines</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
