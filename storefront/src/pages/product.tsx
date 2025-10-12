import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { PageLayout } from '@/components/templates/page-layout'
import { Loading } from '@/components/templates/loading'
import { Image } from '@/components/atoms/image'
import { Price } from '@/components/atoms/price'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import { RelatedProducts } from '@/components/organisms/related-products'
import { useCart } from '@/lib/store'
import { getProduct, listProducts, getRelatedProducts } from '@/lib/api'
import type { Product } from '@/lib/api'
import { getStockStatus } from '@/lib/format'

/**
 * Product details page component with related products and add-to-cart functionality
 */
export default function Product() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const cart = useCart()

  // State management
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  // Data fetching
  useEffect(() => {
    const loadProductData = async () => {
      if (!id) {
        setNotFound(true)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setNotFound(false)

        // Load product and all products in parallel
        const [productData, allProducts] = await Promise.all([
          getProduct(id),
          listProducts()
        ])

        if (!productData) {
          setNotFound(true)
          return
        }

        setProduct(productData)
        
        // Calculate related products
        const related = getRelatedProducts(productData, allProducts)
        setRelatedProducts(related)
      } catch (error) {
        console.error('Error loading product:', error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    loadProductData()
  }, [id])

  // Event handlers
  const handleAddToCart = () => {
    if (product) {
      cart.addItem(product, quantity)
    }
  }

  const handleBackToProducts = () => {
    navigate('/')
  }

  // Loading state
  if (loading) {
    return (
      <PageLayout maxWidth="lg">
        <Loading text="Loading product..." />
      </PageLayout>
    )
  }

  // 404 state
  if (notFound || !product) {
    return (
      <PageLayout maxWidth="lg">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-4">The product you're looking for doesn't exist.</p>
          <Button onClick={handleBackToProducts}>
            Back to Products
          </Button>
        </div>
      </PageLayout>
    )
  }

  // Get stock status
  const stockStatus = getStockStatus(product.stockQty)

  return (
    <PageLayout maxWidth="lg">
      <div className="py-8">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <Link to="/" className="text-blue-600 hover:underline">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">{product.title}</span>
        </nav>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left: Image */}
          <div>
            <Image
              src={product.image}
              alt={product.title}
              aspectRatio="1/1"
              className="rounded-lg"
            />
          </div>
          
          {/* Right: Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <div className="flex items-center gap-3 mb-4">
                <Price amount={product.price} size="xl" />
                <Badge
                  variant={stockStatus.color === 'green' ? 'success' : 
                          stockStatus.color === 'yellow' ? 'warning' : 'danger'}
                >
                  {stockStatus.label}
                </Badge>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <Badge key={tag} variant="default">{tag}</Badge>
              ))}
            </div>
            
            {/* Description */}
            <div>
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-gray-600">
                High-quality {product.title.toLowerCase()} available now.
              </p>
            </div>
            
            {/* Quantity Selector */}
            <div>
              <label className="block font-semibold mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity === 1}
                >
                  -
                </Button>
                <span className="text-lg font-medium w-12 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(q => Math.min(product.stockQty, q + 1))}
                  disabled={quantity === product.stockQty}
                >
                  +
                </Button>
              </div>
            </div>
            
            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={product.stockQty === 0}
            >
              {product.stockQty === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts
            products={relatedProducts}
            title="You might also like"
            onAddToCart={(p) => cart.addItem(p, 1)}
            onProductClick={(p) => navigate(`/p/${p.id}`)}
          />
        )}
      </div>
    </PageLayout>
  )
}
