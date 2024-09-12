import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import Layout from '../components/Layout';
import { ChevronRight, ChevronLeft, CreditCard, Truck, Check } from 'lucide-react';

const CheckoutPage = () => {
  const { cart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // Assuming 10% tax
  const shipping = 10; // Flat rate shipping
  const total = subtotal + tax + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the order data to your backend
    console.log('Order submitted:', { formData, cart, total });
    setStep(4); // Move to confirmation step
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            step >= i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {i}
          </div>
          {i < 3 && <div className={`w-16 h-1 ${step > i ? 'bg-blue-500' : 'bg-gray-200'}`} />}
        </div>
      ))}
    </div>
  );

  const renderOrderSummary = () => (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between mb-2">
          <span>{item.name} x {item.quantity}</span>
          <span>${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold mt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  const renderShippingForm = () => (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email Address"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        placeholder="Address"
        className="w-full p-2 border rounded"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="City"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleInputChange}
          placeholder="ZIP Code"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <input
        type="text"
        name="country"
        value={formData.country}
        onChange={handleInputChange}
        placeholder="Country"
        className="w-full p-2 border rounded"
        required
      />
    </form>
  );

  const renderPaymentForm = () => (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        name="cardName"
        value={formData.cardName}
        onChange={handleInputChange}
        placeholder="Name on Card"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="cardNumber"
        value={formData.cardNumber}
        onChange={handleInputChange}
        placeholder="Card Number"
        className="w-full p-2 border rounded"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="expDate"
          value={formData.expDate}
          onChange={handleInputChange}
          placeholder="MM/YY"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="cvv"
          value={formData.cvv}
          onChange={handleInputChange}
          placeholder="CVV"
          className="w-full p-2 border rounded"
          required
        />
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
        
        {renderStepIndicator()}

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-2/3">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
                {renderShippingForm()}
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
                {renderPaymentForm()}
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Review Your Order</h2>
                <div className="bg-gray-50 p-6 rounded-lg mb-4">
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <p>{formData.firstName} {formData.lastName}</p>
                  <p>{formData.address}</p>
                  <p>{formData.city}, {formData.zipCode}</p>
                  <p>{formData.country}</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Payment Method</h3>
                  <p>Card ending in {formData.cardNumber.slice(-4)}</p>
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="text-center">
                <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-4">Order Confirmed!</h2>
                <p>Thank you for your purchase. Your order has been received and is being processed.</p>
                <p className="mt-4">Order number: #123456</p>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/3">
            {renderOrderSummary()}
          </div>
        </div>

        {step < 4 && (
          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full flex items-center"
              >
                <ChevronLeft className="mr-2" size={18} />
                Back
              </button>
            )}
            <button
              onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
              className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center ml-auto"
            >
              {step < 3 ? 'Next' : 'Place Order'}
              {step < 3 && <ChevronRight className="ml-2" size={18} />}
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CheckoutPage;