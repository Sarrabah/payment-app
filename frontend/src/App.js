import './App.css';
import ProductListings from './components/ProductListings';

function App() {
  const products = [
    { id: 1, name: 'Chaussure femme', price: 19.99 },
    { id: 2, name: 'Pyjama enfant', price: 29.99 },
  ];
  return (
    <div className='App'>
      <h1> Liste des produits</h1>
      <ProductListings products={products} />
    </div>
  );
}

export default App;
