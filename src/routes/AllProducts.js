import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product, addToCart }) => {
  const [imageError, setImageError] = React.useState(false);

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
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
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

const AllProducts = () => {
  const { dispatch } = useCart();
  
  // This is a mock product list. In a real application, you would fetch this data from an API
  const allProducts = [
    { id: 1, name: 'Luxury Dog Bed', price: 129.99, image: '/api/placeholder/300/200' },
    { id: 2, name: 'Gourmet Treats', price: 24.99, image: '/api/placeholder/300/200' },
    { id: 3, name: 'Interactive Toy', price: 39.99, image: '/api/placeholder/300/200' },
    { id: 4, name: 'Stylish Collar', price: 19.99, image: '/api/placeholder/300/200' },
    { id: 5, name: 'Dog Shampoo', price: 14.99, image: '/api/placeholder/300/200' },
    { id: 6, name: 'Chew Toys Set', price: 29.99, image: '/api/placeholder/300/200' },
    { id: 7, name: 'Dog Bowl', price: 9.99, image: '/api/placeholder/300/200' },
    { id: 8, name: 'Dog Leash', price: 17.99, image: '/api/placeholder/300/200' },
  ];

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success(`Added ${product.name} to cart`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AllProducts;