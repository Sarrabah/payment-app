import React from "react";
import ProductListings from "../components/ProductListings";
import './Home.css';

const Home = () =>{
    const products = [
        { id: 1, name: 'Chaussure femme', price: 19.99 },
        { id: 2, name: 'Pyjama enfant', price: 29.99 },
      ];
      return (
        <div className='Home'>
          <h1> Liste des produits</h1>
          <ProductListings products={products} />
        </div>
      );
};

export default Home ;
