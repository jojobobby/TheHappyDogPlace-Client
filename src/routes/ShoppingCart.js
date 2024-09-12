import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  const [imageError, setImageError] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    updateQuantity(item.id, newQuantity, item.stock);
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {imageError ? (
            <div className="h-20 w-20 rounded-lg bg-gray-200 flex items-center justify-center mr-4">
              <span className="text-gray-400 text-xs text-center">No Image</span>
            </div>
          ) : (
            <img 
              className="h-20 w-20 rounded-lg object-cover mr-4" 
              src={item.image} 
              alt={item.name}
              onError={handleImageError}
            />
          )}
          <div>
            <div className="font-medium text-gray-900">{item.name}</div>
            <div className="text-sm text-gray-500">SKU: {item.id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1, item.stock)}
            disabled={item.quantity === 1}
            className={`text-gray-500 hover:text-gray-700 ${item.quantity === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Minus size={16} />
          </button>
          {editingId === item.id ? (
            <input
              type="number"
              value={item.quantity}
              onChange={handleQuantityChange}
              onBlur={() => setEditingId(null)}
              className="mx-2 w-16 text-center border rounded"
              min="1"
              max={item.stock}
            />
          ) : (
            <span 
              className="mx-2 w-8 text-center cursor-pointer"
              onClick={() => setEditingId(item.id)}
            >
              {item.quantity}
            </span>
          )}
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1, item.stock)}
            disabled={item.quantity === item.stock}
            className={`text-gray-500 hover:text-gray-700 ${item.quantity === item.stock ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Plus size={16} />
          </button>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${item.price.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
        ${(item.price * item.quantity).toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-900">
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
};

const ShoppingCart = () => {
  const { cart, dispatch } = useCart();

  const updateQuantity = (id, newQuantity, stock) => {
    if (newQuantity < 1) {
      newQuantity = 1;
    } else if (newQuantity > stock) {
      newQuantity = stock;
      toast.error(`Sorry, only ${stock} items available in stock.`);
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQuantity } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // Assuming 10% tax
  const shipping = 10; // Flat rate shipping
  const total = subtotal + tax + shipping;

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
            <Link to="/" className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition duration-300">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cart.map((item) => (
                      <CartItem 
                        key={item.id} 
                        item={item} 
                        updateQuantity={updateQuantity} 
                        removeFromCart={removeFromCart}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Link 
  to="/checkout" 
  className="block w-full mt-6 bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 transition duration-300 text-center"
>
  Proceed to Checkout
</Link>
              </div>
              <div className="mt-4 text-center">
                <Link to="/" className="text-blue-500 hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ShoppingCart;