import React from 'react';
import Layout from '../components/Layout';

const TermsOfService = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <div className="space-y-4">
          <p>Welcome to TheHappyDogPlace. By using our website, you agree to these terms of service.</p>
          <h2 className="text-xl font-semibold">1. Use of Site</h2>
          <p>You may use our site for lawful purposes only. You must not use our site in any way that causes, or may cause, damage to the site or impairment of the availability or accessibility of the site.</p>
          <h2 className="text-xl font-semibold">2. Product Information</h2>
          <p>We strive to provide accurate product information, but we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.</p>
          <h2 className="text-xl font-semibold">3. Pricing and Availability</h2>
          <p>All prices are subject to change without notice. We reserve the right to modify or discontinue any product without notice.</p>
          {/* Add more sections as needed */}
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;