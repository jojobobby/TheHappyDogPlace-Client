import React from 'react';
import Layout from '../components/Layout';

const Support = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Support</h1>
        <p className="mb-4">Welcome to our support page. How can we help you today?</p>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
            <ul className="list-disc list-inside ml-4">
              <li>How do I place an order?</li>
              <li>What's your return policy?</li>
              <li>How can I track my package?</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p>Email: support@thehappydogplace.com</p>
            <p>Phone: 1-800-HAPPY-DOG</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;