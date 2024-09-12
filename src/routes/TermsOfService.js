import React from 'react';
import Layout from '../components/Layout';
import { Shield, FileText, Scale, Clock, Globe } from 'lucide-react';

const TermsOfService = () => {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Terms of Service</h1>
          
          <div className="bg-white shadow-xl rounded-lg p-8 mb-8">
            <p className="text-gray-600 mb-6">
              Welcome to TheHappyDogPlace. By using our website and services, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully before using our platform.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="flex items-start">
                <Shield className="text-blue-500 mr-4 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Privacy Protection</h3>
                  <p className="text-gray-600">We prioritize the protection of your personal information and adhere to strict privacy policies.</p>
                </div>
              </div>
              <div className="flex items-start">
                <FileText className="text-blue-500 mr-4 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Clear Policies</h3>
                  <p className="text-gray-600">Our terms are written in clear, understandable language to ensure transparency in all our dealings.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Scale className="text-blue-500 mr-4 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Fair Practices</h3>
                  <p className="text-gray-600">We are committed to fair business practices and ethical conduct in all our operations.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="text-blue-500 mr-4 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Regular Updates</h3>
                  <p className="text-gray-600">Our terms are regularly reviewed and updated to reflect current laws and best practices.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-xl rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Detailed Terms</h2>

            <section className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">1. Use of Site</h3>
              <p className="text-gray-600 mb-4">
                You may use our site for lawful purposes only. You must not use our site in any way that causes, or may cause, damage to the site or impairment of the availability or accessibility of the site.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">2. Product Information</h3>
              <p className="text-gray-600 mb-4">
                We strive to provide accurate product information, but we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free. If a product offered by TheHappyDogPlace is not as described, your sole remedy is to return it in unused condition.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">3. Pricing and Availability</h3>
              <p className="text-gray-600 mb-4">
                All prices are subject to change without notice. We reserve the right to modify or discontinue any product without notice. We shall not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the product.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">4. User Accounts</h3>
              <p className="text-gray-600 mb-4">
                If you create an account on our site, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-4 text-gray-700">5. Limitation of Liability</h3>
              <p className="text-gray-600 mb-4">
                TheHappyDogPlace will not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the site.
              </p>
            </section>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              By using TheHappyDogPlace, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
            <p className="text-gray-600 mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;