import React, { useEffect, useState } from "react";
import ProductListings from "../components/ProductListings";
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [catalogProduct, setCatalogProduct] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/products')
            .then(response => response.json())
            .then(data => setCatalogProduct(data.catalog))
            .catch(error => console.error("Error in fetching products", error));

        const storedBasket = localStorage.getItem("basket");
        const products = storedBasket ? JSON.parse(storedBasket) : [];
        setSelectedProducts(products);
    }, []);
    // fct pour ajouter le produit à la liste 
    const addProduct = (newProduct) => {
        const existingProductIndex = selectedProducts.findIndex(product => product.id === newProduct.id);
        let updatedProducts = [...selectedProducts];
        if (existingProductIndex !== -1) {
            updatedProducts[existingProductIndex].quantity = newProduct.quantity;
        } else {
            updatedProducts = [...selectedProducts, newProduct];
        }
        setSelectedProducts(updatedProducts);
        localStorage.setItem('basket', JSON.stringify(updatedProducts));
    };

    const sum = (products) => {
        let total = 0;
        for (let p of products) {
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
            <ProductListings products={catalogProduct} addProduct={addProduct} />
        </div>
    );
};

export default Home;
