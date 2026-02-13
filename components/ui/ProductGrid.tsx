'use client'
import React from 'react'
import ProductCard from '@/components/ui/ProductCard'

const mockProduct = {
  id: 1,
  title: "Placeholder Product Name",
  price: 99.99,
  category: "Electronics",
  image: "https://picsum.photos/200",
};

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
       <ProductCard product={mockProduct} />
       <ProductCard product={mockProduct} />
       <ProductCard product={mockProduct} />
       <ProductCard product={mockProduct} />
       <ProductCard product={mockProduct} />
          </div>
  )
}

export default ProductGrid
