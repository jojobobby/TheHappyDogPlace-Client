// components/index.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ShoppingCart, Menu, Plus } from 'lucide-react';

// RainbowButton Component
const StyledButton = styled(motion.button)`
  background-color: ${props => props.bgColor || '#4CAF50'};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${props => props.hoverColor || '#45a049'};
  }
`;

const rainbowColors = [
  '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#8B00FF'
];

export const RainbowButton = ({ children, onClick, bgColor, hoverColor }) => {
  return (
    <StyledButton
      bgColor={bgColor}
      hoverColor={hoverColor}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: rainbowColors.map(color => `0 0 0 2px ${color}`),
      }}
      transition={{
        boxShadow: {
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }
      }}
    >
      {children}
    </StyledButton>
  );
};

// ProductCard Component
export const ProductCard = ({ name, price, image }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-200 relative p-4"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-blue-700">{name}</h3>
      <p className="text-blue-600 mb-4">{price}</p>
      <div className="flex justify-end">
        <RainbowButton onClick={() => console.log(`Added ${name} to cart`)} bgColor="#4CAF50" hoverColor="#45a049">
          <Plus className="h-4 w-4 mr-1" />
          <span>Add to Cart</span>
        </RainbowButton>
      </div>
    </motion.div>
  );
};

// Header Component
export const Header = () => (
  <header className="bg-blue-600 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">TheHappyDogPlace.com</h1>
      <nav className="hidden md:flex space-x-4">
        <a href="#" className="hover:text-blue-200">Beds</a>
        <a href="#" className="hover:text-blue-200">Treats</a>
        <a href="#" className="hover:text-blue-200">Toys</a>
      </nav>
      <div className="flex items-center space-x-4">
        <ShoppingCart className="h-6 w-6" />
        <Menu className="h-6 w-6 md:hidden" />
      </div>
    </div>
  </header>
);

// Footer Component
export const Footer = () => (
  <footer className="bg-blue-600 text-white mt-12 py-8">
    <div className="container mx-auto px-4 text-center">
      <p>&copy; 2024 TheHappyDogPlace.com. Your trusted source for canine joy!</p>
    </div>
  </footer>
);