import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { Toaster } from 'react-hot-toast';
import Storefront from './routes/Storefront';
import Support from './routes/Support';
import TrackPackage from './routes/TrackPackage';
import TermsOfService from './routes/TermsOfService';
import ShoppingCart from './routes/ShoppingCart';
import ItemPage from './routes/ItemPage';
import AllProducts from './routes/AllProducts';
import CheckoutPage from './routes/CheckoutPage';

function App() {
  return (
    <CartProvider>
      <Toaster position="top-right"/>
      <Routes>
        <Route path="/" element={<Storefront />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/support" element={<Support />} />
        <Route path="/track-package" element={<TrackPackage />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;