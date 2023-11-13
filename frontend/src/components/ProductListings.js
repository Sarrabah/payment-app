import React from 'react';
import ProductCard from './ProductCard';

const ProductListings = ({ products, addProduct }) => {
  return (
    <div className="flex flex-wrap">
      {products.map((product) => (
        <div key={product.id} >
          <ProductCard product={product} addProduct={addProduct} />
        </div>
      ))}
    </div>
  );
};

export default ProductListings;
