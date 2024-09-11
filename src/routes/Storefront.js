// src/routes/Storefront.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product, addToCart }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/item/${product.id}`}>
        {imageError ? (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Image not available</span>
          </div>
        ) : (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover" 
            onError={handleImageError}
          />
        )}
      </Link>
      <div className="p-4">
        <Link to={`/item/${product.id}`} className="font-bold mb-2 hover:text-blue-500">{product.name}</Link>
        <p className="text-gray-600">${product.price}</p>
        <button 
          onClick={() => addToCart(product)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const Storefront = () => {
  const { dispatch } = useCart();
  
  const featuredProducts = [
    { id: 1, name: 'Luxury Dog Bed', price: 129.99, image: '/api/placeholder/300/200' },
    { id: 2, name: 'Gourmet Treats', price: 24.99, image: '/api/placeholder/300/200' },
    { id: 3, name: 'Interactive Toy', price: 39.99, image: '/api/placeholder/300/200' },
    { id: 4, name: 'Stylish Collar', price: 19.99, image: '/api/placeholder/300/200' },
  ];

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <Layout>
      {/* ... (hero section remains unchanged) ... */}

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Featured Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Storefront;