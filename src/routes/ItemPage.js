// src/routes/ItemPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../contexts/CartContext';

const ItemPage = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  const [imageError, setImageError] = useState(false);

  // Mock data - in a real application, you would fetch this data based on the id
  const item = {
    id: parseInt(id),
    name: 'Luxury Dog Bed',
    description: 'Give your furry friend the comfort they deserve with our premium Luxury Dog Bed. Made with memory foam and covered in soft, durable fabric, this bed provides the perfect spot for your dog to rest and relax.',
    price: 129.99,
    discount: 0.1, // 10% discount
    stock: 15,
    image: '/api/placeholder/400/300'
  };

  const discountedPrice = item.price * (1 - item.discount);

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...item, price: discountedPrice } });
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 p-4">
            {imageError ? (
              <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center rounded-lg shadow-lg">
                <span className="text-gray-400">Image not available</span>
              </div>
            ) : (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
                onError={handleImageError}
              />
            )}
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="mb-4">
              {item.discount > 0 ? (
                <>
                  <span className="text-2xl font-bold text-red-500 mr-2">${discountedPrice.toFixed(2)}</span>
                  <span className="text-lg text-gray-500 line-through">${item.price.toFixed(2)}</span>
                  <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                    {(item.discount * 100).toFixed(0)}% OFF
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold">${item.price.toFixed(2)}</span>
              )}
            </div>
            <p className="mb-4">
              <span className="font-semibold">Stock:</span> {item.stock > 0 ? `${item.stock} available` : 'Out of stock'}
            </p>
            <button
              onClick={addToCart}
              disabled={item.stock === 0}
              className={`px-6 py-2 rounded-full font-bold text-white ${
                item.stock > 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
              } transition duration-300`}
            >
              {item.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemPage;