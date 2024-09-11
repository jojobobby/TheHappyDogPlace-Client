import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Storefront from './routes/Storefront';
import Support from './routes/Support';
import TrackPackage from './routes/TrackPackage';
import TermsOfService from './routes/TermsOfService';
import ShoppingCart from './routes/ShoppingCart';
import ItemPage from './routes/ItemPage';

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Storefront />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/support" element={<Support />} />
        <Route path="/track-package" element={<TrackPackage />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/item/:id" element={<ItemPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;