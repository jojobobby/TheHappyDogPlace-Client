import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../contexts/CartContext';
import { Star } from 'lucide-react';
import toast from 'react-hot-toast';

const ItemPage = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);

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

  // Mock reviews
  const reviews = [
    { id: 1, author: 'John D.', rating: 5, comment: 'My dog loves this bed! Great quality.' },
    { id: 2, author: 'Sarah M.', rating: 4, comment: 'Good product, but a bit pricey.' },
    { id: 3, author: 'Mike R.', rating: 5, comment: 'Excellent comfort, my pup sleeps soundly!' },
  ];

  const discountedPrice = item.price * (1 - item.discount);

  const addToCart = () => {
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { ...item, price: discountedPrice, quantity }
    });
    toast.success(`Added ${quantity} ${item.name}${quantity > 1 ? 's' : ''} to cart`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value > 0 && value <= item.stock ? value : 1);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
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
          <div className="w-full md:w-1/2 px-4">
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
            <p className="mb-4">
              <span className="font-semibold">Delivery Time:</span> 15 days
            </p>
            <div className="mb-4 flex items-center">
              <span className="font-semibold mr-2">Quantity:</span>
              <input 
                type="number" 
                min="1" 
                max={item.stock} 
                value={quantity}
                onChange={handleQuantityChange}
                className="border rounded px-2 py-1 w-16 text-center"
              />
            </div>
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

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          {reviews.map((review) => (
            <div key={review.id} className="mb-4 border-b pb-4">
              <div className="flex items-center mb-2">
                <span className="font-semibold mr-2">{review.author}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < review.rating ? "gold" : "none"} 
                      stroke={i < review.rating ? "gold" : "currentColor"}
                    />
                  ))}
                </div>
              </div>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ItemPage;