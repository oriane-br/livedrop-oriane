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
import { productsAPI } from '@/lib/api' // CHANGED: Use productsAPI
import { getStockStatus } from '@/lib/format'

// CHANGED: Backend product type
interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: string
  tags: string[]
  imageUrl: string
  stock: number
}

/**
 * Product details page component with related products and add-to-cart functionality
 * UPDATED FOR WEEK 5: Now fetches from real backend API
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

  // CHANGED: Data fetching with real API
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

        // CHANGED: Fetch from real API
        const productData = await productsAPI.getById(id)

        if (!productData) {
          setNotFound(true)
          return
        }

        setProduct(productData)
        
        // CHANGED: Fetch related products by same category or tags
        const allProducts = await productsAPI.getAll({ limit: 50 })
        const related = allProducts.products
          .filter(p => 
            p._id !== productData._id && 
            (p.category === productData.category || 
             p.tags.some(tag => productData.tags.includes(tag)))
          )
          .slice(0, 3)
        
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
      // Adapt product shape for cart
      const cartProduct = {
        id: product._id,
        title: product.name,
        price: product.price,
        image: product.imageUrl,
        tags: product.tags,
        stockQty: product.stock
      }
      cart.addItem(cartProduct, quantity)
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
  const stockStatus = getStockStatus(product.stock) // CHANGED: Use stock instead of stockQty

  return (
    <PageLayout maxWidth="lg">
      <div className="py-8">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <Link to="/" className="text-blue-600 hover:underline">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">{product.name}</span>
        </nav>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left: Image */}
          <div>
            <Image
              src={product.imageUrl} // CHANGED
              alt={product.name}
              aspectRatio="1/1"
              className="rounded-lg"
            />
          </div>
          
          {/* Right: Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
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
            
            {/* Category Badge */}
            <div>
              <Badge variant="default">{product.category}</Badge>
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
                {product.description || `High-quality ${product.name.toLowerCase()} available now.`}
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
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  disabled={quantity === product.stock}
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
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts
            products={relatedProducts.map(p => ({
              id: p._id,
              title: p.name,
              price: p.price,
              image: p.imageUrl,
              tags: p.tags,
              stockQty: p.stock
            }))}
            title="You might also like"
            onAddToCart={(p) => {
              const cartProduct = {
                id: p.id,
                title: p.title,
                price: p.price,
                image: p.image,
                tags: p.tags,
                stockQty: p.stockQty
              }
              cart.addItem(cartProduct, 1)
            }}
            onProductClick={(p) => navigate(`/p/${p.id}`)}
          />
        )}
      </div>
    </PageLayout>
  )
}