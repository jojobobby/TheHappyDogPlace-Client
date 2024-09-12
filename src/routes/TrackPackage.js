import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Package, Truck, Home, CheckCircle, MapPin, Calendar, Clock, AlertTriangle } from 'lucide-react';

const TrackPackage = () => {
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !orderNumber) {
      setError('Please enter both email and order number.');
      return;
    }

    // Simulated tracking result
    // In a real application, you would make an API call here
    if (email === 'test@example.com' && orderNumber === 'ORD-12345') {
      setTrackingResult({
        orderNumber: 'ORD-12345-ABCDE',
        status: 'In Transit',
        estimatedDelivery: '2023-06-15',
        currentLocation: 'Local Distribution Center, New York',
        shipDate: '2023-06-10',
        trackingHistory: [
          { date: '2023-06-10', time: '09:00 AM', status: 'Order Processed', location: 'Warehouse, Los Angeles' },
          { date: '2023-06-11', time: '10:30 AM', status: 'Shipped', location: 'Sorting Facility, Chicago' },
          { date: '2023-06-13', time: '02:15 PM', status: 'In Transit', location: 'Local Distribution Center, New York' },
        ]
      });
    } else {
      setError('No matching order found. Please check your email and order number.');
    }
  };

  const trackingSteps = [
    { icon: Package, label: 'Order Processed' },
    { icon: Truck, label: 'Shipped' },
    { icon: MapPin, label: 'In Transit' },
    { icon: Home, label: 'Out for Delivery' },
    { icon: CheckCircle, label: 'Delivered' }
  ];

  const getCurrentStep = () => {
    if (!trackingResult) return -1;
    const statusIndex = trackingSteps.findIndex(step => step.label === trackingResult.status);
    return statusIndex !== -1 ? statusIndex : trackingSteps.length - 1;
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Track Your Package</h1>
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden mb-12">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
                  <input
                    id="orderNumber"
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="Enter your order number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition duration-300"
                >
                  Track Package
                </button>
              </form>
            </div>
          </div>

          {error && (
            <div className="max-w-3xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {trackingResult && (
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Tracking Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-sm text-gray-600">Order Number</p>
                    <p className="font-semibold">{trackingResult.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold">{trackingResult.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estimated Delivery</p>
                    <p className="font-semibold flex items-center">
                      <Calendar className="mr-2 text-blue-500" size={18} />
                      {trackingResult.estimatedDelivery}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Location</p>
                    <p className="font-semibold flex items-center">
                      <MapPin className="mr-2 text-blue-500" size={18} />
                      {trackingResult.currentLocation}
                    </p>
                  </div>
                </div>

                <div className="mb-12">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">Tracking Progress</h3>
                  <div className="flex justify-between items-center relative">
                    {trackingSteps.map((step, index) => {
                      const currentStep = getCurrentStep();
                      return (
                        <div key={index} className="flex flex-col items-center relative z-10">
                          <div 
                            className={`rounded-full p-2 ${
                              index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
                            }`}
                          >
                            <step.icon size={24} />
                          </div>
                          <p className="text-xs mt-2 text-center">{step.label}</p>
                        </div>
                      );
                    })}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
                    <div 
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-500 transition-all duration-500 ease-in-out -z-10" 
                      style={{ width: `${(getCurrentStep() / (trackingSteps.length - 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">Tracking History</h3>
                  <div className="space-y-4">
                    {trackingResult.trackingHistory.map((event, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-blue-500 rounded-full p-2 mr-4">
                          <Clock size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">{event.status}</p>
                          <p className="text-sm text-gray-600">{event.date} - {event.time}</p>
                          <p className="text-sm text-gray-600">{event.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto mt-12 bg-blue-50 rounded-lg p-6 flex items-start">
            <AlertTriangle className="text-blue-500 mr-4 flex-shrink-0" size={24} />
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Need Help?</h3>
              <p className="text-gray-600">
                If you have any questions about your shipment or need additional assistance, 
                please don't hesitate to contact our customer support team.
              </p>
              <a href="/support" className="inline-block mt-4 text-blue-500 hover:underline">Go to Support Page</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrackPackage;