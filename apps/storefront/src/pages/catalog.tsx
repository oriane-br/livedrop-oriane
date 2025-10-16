import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageLayout } from '@/components/templates/page-layout'
import { Loading } from '@/components/templates/loading'
import { SearchBar } from '@/components/molecules/search-bar'
import { SortDropdown, SortOption } from '@/components/molecules/sort-dropdown'
import { TagFilter } from '@/components/molecules/tag-filter'
import { ProductGrid } from '@/components/organisms/product-grid'
import { useCart } from '@/lib/store'
import { listProducts, Product } from '@/lib/api'

/**
 * Catalog page component with search, sort, filter, and add-to-cart functionality
 */
export default function Catalog() {
  // State management
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState<SortOption>('name-asc')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  // Filter pipeline
  const filteredProducts = useMemo(() => {
    let result = products
    
    // Apply search
    if (searchQuery) {
      const tokens = searchQuery.toLowerCase().split(' ').filter(Boolean)
      result = result.filter(product => 
        tokens.some(token =>
          product.title.toLowerCase().includes(token) ||
          product.tags.some(tag => tag.toLowerCase().includes(token))
        )
      )
    }
    
    // Apply tag filter
    if (selectedTags.length > 0) {
      result = result.filter(product =>
        selectedTags.every(tag => product.tags.includes(tag))
      )
    }
    
    // Apply sort
    result = [...result].sort((a, b) => {
      switch (sortOption) {
        case 'price-asc': return a.price - b.price
        case 'price-desc': return b.price - a.price
        case 'name-asc': return a.title.localeCompare(b.title)
        case 'name-desc': return b.title.localeCompare(a.title)
        default: return 0
      }
    })
    
    return result
  }, [products, searchQuery, selectedTags, sortOption])

  // Data fetching
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const fetchedProducts = await listProducts()
        setProducts(fetchedProducts)
      } catch (err) {
        setError('Failed to load products')
        console.error('Error loading products:', err)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Event handlers
  const handleToggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleAddToCart = (product: Product) => {
    cart.addItem(product, 1)
  }

  const handleProductClick = (product: Product) => {
    navigate(`/p/${product.id}`)
  }

  const retry = () => {
    setError(null)
    setLoading(true)
    // Trigger useEffect to reload
    setProducts([])
  }

  // Loading state
  if (loading) {
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
          <p className="text-gray-600">Browse our collection of {products.length} products</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
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
            Showing {filteredProducts.length} of {products.length} products
          </p>
          <ProductGrid
            products={filteredProducts}
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
