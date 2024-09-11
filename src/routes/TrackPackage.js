import React, { useState } from 'react';
import Layout from '../components/Layout';

const TrackPackage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulated tracking result
    setTrackingResult({
      status: 'In Transit',
      location: 'Local Distribution Center',
      estimatedDelivery: '2023-06-15'
    });
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Track Your Package</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter your tracking number"
            className="border p-2 mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Track
          </button>
        </form>
        {trackingResult && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Tracking Result:</h2>
            <p>Status: {trackingResult.status}</p>
            <p>Location: {trackingResult.location}</p>
            <p>Estimated Delivery: {trackingResult.estimatedDelivery}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TrackPackage;