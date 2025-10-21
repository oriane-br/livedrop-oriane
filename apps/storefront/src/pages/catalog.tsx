import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageLayout } from '@/components/templates/page-layout'
import { Loading } from '@/components/templates/loading'
import { SearchBar } from '@/components/molecules/search-bar'
import { SortDropdown, SortOption } from '@/components/molecules/sort-dropdown'
import { TagFilter } from '@/components/molecules/tag-filter'
import { ProductGrid } from '@/components/organisms/product-grid'
import { useCart } from '@/lib/store'
import { productsAPI } from '@/lib/api' // CHANGED: Use productsAPI instead of listProducts

// CHANGED: Update Product type to match backend
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
 * Catalog page component with search, sort, filter, and add-to-cart functionality
 * UPDATED FOR WEEK 5: Now connects to real backend API with database
 */
export default function Catalog() {
  // State management
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState<SortOption>('name-asc')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Pagination state (NEW for Week 5)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const itemsPerPage = 20

  // Hooks
  const navigate = useNavigate()
  const cart = useCart()

  // Extract all unique tags from products
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    products.forEach(product => {
      product.tags.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [products])

  // CHANGED: Server-side filtering (backend handles this now)
  // We only do client-side sort for better UX
  const sortedProducts = useMemo(() => {
    const result = [...products]
    
    result.sort((a, b) => {
      switch (sortOption) {
        case 'price-asc': return a.price - b.price
        case 'price-desc': return b.price - a.price
        case 'name-asc': return a.name.localeCompare(b.name)
        case 'name-desc': return b.name.localeCompare(a.name)
        default: return 0
      }
    })
    
    return result
  }, [products, sortOption])

  // CHANGED: Data fetching with real API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Build query params for backend
        const params: any = {
          page: currentPage,
          limit: itemsPerPage
        }
        
        if (searchQuery) {
          params.search = searchQuery
        }
        
        if (selectedTags.length > 0) {
          // Backend expects tag filter (adjust based on your API)
          params.tag = selectedTags[0] // Simple implementation
        }

        // Map sort option to backend format
        const sortMap: Record<SortOption, string> = {
          'price-asc': 'price_asc',
          'price-desc': 'price_desc',
          'name-asc': 'name',
          'name-desc': 'name'
        }
        params.sort = sortMap[sortOption]

        // CHANGED: Call real API
        const response = await productsAPI.getAll(params)
        
        setProducts(response.products)
        setTotalProducts(response.total)
      } catch (err) {
        setError('Failed to load products')
        console.error('Error loading products:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [currentPage, searchQuery, selectedTags, sortOption])

  // Event handlers
  const handleToggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
    setCurrentPage(1) // Reset to first page when filtering
  }

  const handleAddToCart = (product: Product) => {
    // CHANGED: Adapt product shape for cart
    const cartProduct = {
      id: product._id,
      title: product.name,
      price: product.price,
      image: product.imageUrl,
      tags: product.tags,
      stockQty: product.stock
    }
    cart.addItem(cartProduct, 1)
  }

  const handleProductClick = (product: Product) => {
    navigate(`/p/${product._id}`) // CHANGED: Use _id
  }

  const retry = () => {
    setError(null)
    setLoading(true)
    setProducts([])
  }

  // Loading state
  if (loading && products.length === 0) {
    return (
      <PageLayout maxWidth="lg">
        <Loading text="Loading products..." />
      </PageLayout>
    )
  }

  // Error state
  if (error) {
    return (
      <PageLayout maxWidth="lg">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={retry}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout maxWidth="lg">
      <div className="py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Products</h1>
          <p className="text-gray-600">Browse our collection of {totalProducts} products</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar 
              value={searchQuery}
              onChange={(value) => {
                setSearchQuery(value)
                setCurrentPage(1) // Reset page on search
              }}
              placeholder="Search products..."
            />
          </div>
          <SortDropdown 
            value={sortOption}
            onChange={setSortOption}
          />
        </div>
        
        <TagFilter
          availableTags={allTags}
          selectedTags={selectedTags}
          onToggleTag={handleToggleTag}
        />
        
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Showing {sortedProducts.length} products
          </p>
          <ProductGrid
            products={sortedProducts.map(p => ({
              id: p._id,
              title: p.name,
              price: p.price,
              image: p.imageUrl,
              tags: p.tags,
              stockQty: p.stock
            }))}
            onAddToCart={handleAddToCart}
            onProductClick={handleProductClick}
            emptyStateMessage={
              searchQuery || selectedTags.length > 0
                ? "No products match your filters. Try adjusting your search."
                : "No products available."
            }
          />
        </div>
      </div>
    </PageLayout>
  )
}