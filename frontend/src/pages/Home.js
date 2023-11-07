import React, { useState } from "react";
import ProductListings from "../components/ProductListings";
import './Home.css';

const Home = () => {
    const[selectedProducts, setSelectedProducts] = useState([]);
    const addProduct =  (newProduct) =>{
        //console.log(selectedProducts);
        setSelectedProducts([...selectedProducts,newProduct]);
        
    }
    const products = [
        { id: 1, name: 'Chaussure femme', price: 19.99 },
        { id: 2, name: 'Pyjama enfant', price: 29.99 },
    ];
    const sum = (products) => {
       let total = 0;
        for(let p of products){
            total = total + p.quantity;
        }
        return total;
    }
    return (
        <div className='Home'>
            <p> la somme des produits: {sum(selectedProducts)}</p>
            <h1> Liste des produits </h1>
            <ProductListings products={products} addProduct={addProduct} />
        </div>
    );
};

export default Home;
