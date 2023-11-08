import React from "react";
import './CheckoutPanier.css';

const CheckoutPanier = () => {
    const storedBasket = localStorage.getItem('basket');
    const selectedProducts = storedBasket ? JSON.parse(storedBasket) : [];
    const totalPrice = (products) =>{
        let sum = 0;
        for(let p of products){
            sum = sum +( p.priceUnit * p.quantity ) ;
        }
        return sum;
    }
    return (
        <div>
            <h1 className="title"> Panier </h1>
            <h2>Produits sélectionnés: </h2>
            <ul>
                {selectedProducts.map((product) => {
                    return (
                        <li key={product.id}>
                            Nom du produit : {product.name}   --   Quantité: {product.quantity}   --   Prix total par produit : {product.priceUnit*product.quantity} Euro
                        </li>
                    )
                })}
            </ul>
            <div className="validation">
            <h4> Sous-total  </h4> {totalPrice(selectedProducts)} Euro
            <h4> Livraison </h4> Gratuit
            <h3> Total </h3> {totalPrice(selectedProducts)} Euro
            <br></br>
            <hr></hr>
            <button> Valider ma commande </button>
            </div>
        </div>
    );
}
export default CheckoutPanier;