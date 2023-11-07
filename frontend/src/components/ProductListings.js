import React from 'react';
import './ProductListings.css';
import ProductCard from './ProductCard';

const ProductListings = ({ products, addProduct }) => {
  return (
    <div className="product-listings">
      {products.map((product) => (
        <div key={product.id} >
          <ProductCard product={product} addProduct={addProduct} />
        </div>
      ))}
    </div>
  );
};

export default ProductListings;
