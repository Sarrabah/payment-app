import React, { useEffect, useState } from "react";
import ProductListings from "../components/ProductListings";
import './Home.css';
import {Link} from 'react-router-dom';

const Home = () => {
    const[selectedProducts, setSelectedProducts] = useState([]);
    useEffect(() => {
        const storedBasket = localStorage.getItem("basket");
        const products = storedBasket ? JSON.parse(storedBasket): [];
        setSelectedProducts(products);
    }, []);
    // fct pour ajouter le produit à la liste 
    const addProduct =  (newProduct) =>{
        const updatedSelectedProduct = [...selectedProducts,newProduct];
        setSelectedProducts(updatedSelectedProduct);
        localStorage.setItem('basket', JSON.stringify(updatedSelectedProduct)); 
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
            <div className="panier">
            <p> la somme des produits: {sum(selectedProducts)} </p>
            <Link to="/checkout"> Consulter mon Panier </Link>
            </div>
            <h1> Liste des produits </h1>
            <ProductListings products={products} addProduct={addProduct} />
        </div>
    );
};

export default Home;
