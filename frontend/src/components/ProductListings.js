import React from 'react';
import './ProductListings.css';
import ProductCard from './ProductCard';

const ProductListings = ({ products }) => {
  return (
    <div className="product-listings">
      {products.map((product) => (
        <div key={product.id} >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductListings;
