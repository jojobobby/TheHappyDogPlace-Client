import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../contexts/CartContext';

const ShoppingCart = () => {
  const { cart, dispatch } = useCart();

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-2">
                <div>
                  <h2 className="font-bold">{item.name}</h2>
                  <p>${item.price}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="bg-gray-200 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 px-2 py-1 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <p className="font-bold">Total: ${total.toFixed(2)}</p>
            </div>
          </>
        )}
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Continue Shopping
        </Link>
      </div>
    </Layout>
  );
};

export default ShoppingCart;