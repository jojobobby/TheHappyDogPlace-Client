import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Phone, Mail, MessageCircle, HelpCircle, Search, ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-gray-700">{question}</span>
        {isOpen ? <ChevronUp className="text-blue-500" /> : <ChevronDown className="text-blue-500" />}
      </button>
      {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
};

const Support = () => {
  const faqs = [
    {
      question: "How do I place an order?",
      answer: "To place an order, simply browse our products, select the items you wish to purchase, and add them to your cart. When you're ready, proceed to checkout and follow the steps to complete your purchase."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. If you're not satisfied with your purchase, you can return it within 30 days for a full refund or exchange. Please ensure the item is unused and in its original packaging."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order has been shipped, you will receive a shipping confirmation email with a tracking number. You can use this number on our website's 'Track Order' page or on the courier's website to track your package."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we offer international shipping to many countries. Shipping rates and delivery times may vary depending on the destination. You can see the available shipping options during the checkout process."
    },
    {
      question: "How do I care for my dog's new bed?",
      answer: "Most of our dog beds come with removable, machine-washable covers. We recommend washing the cover in cold water on a gentle cycle and air drying. For the bed insert, spot cleaning is usually sufficient."
    }
  ];

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Customer Support</h1>
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden mb-12">
            <div className="p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">How can we help you?</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for help..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>
            
            <div className="bg-blue-50 p-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Contact Us</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a href="tel:+18001234567" className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <Phone className="text-blue-500 mr-3" />
                  <div>
                    <p className="font-semibold">Call Us</p>
                    <p className="text-sm text-gray-600">1-800-123-4567</p>
                  </div>
                </a>
                <a href="mailto:support@happydogplace.com" className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <Mail className="text-blue-500 mr-3" />
                  <div>
                    <p className="font-semibold">Email Us</p>
                    <p className="text-sm text-gray-600">support@happydogplace.com</p>
                  </div>
                </a>
                <a href="#" className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <MessageCircle className="text-blue-500 mr-3" />
                  <div>
                    <p className="font-semibold">Live Chat</p>
                    <p className="text-sm text-gray-600">Chat with our team</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Frequently Asked Questions</h2>
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-12 text-center">
            <p className="text-gray-600">
              Can't find what you're looking for? Our customer support team is here to help.
            </p>
            <a href="#" className="inline-block mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition duration-300">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;