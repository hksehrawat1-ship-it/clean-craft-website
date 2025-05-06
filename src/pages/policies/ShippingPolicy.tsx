import React from "react";
import PolicyLayout from '../../components/policies/PolicyLayout';

const ShippingPolicy = () => {
  return (
    <PolicyLayout
      title="Shipping Policy - Clean Craft"
      description="Information about our shipping procedures and timeframes"
    >
      <section>
        <p className="text-lg mb-6">
          Clean Craft ensures timely and secure delivery of all services and products.
        </p>
        
        <h2 className="text-xl font-semibold text-google-blue-dark mb-4">For Laundry & Dry Cleaning Services</h2>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Pickup and delivery are free within our operational areas.</li>
          <li>Standard turnaround time is 48-72 hours.</li>
          <li>Express service is available at an additional charge, with a 24-hour delivery guarantee (subject to location).</li>
          <li>Delivery timings may vary based on customer location and service load.</li>
        </ul>
        
        <h2 className="text-xl font-semibold text-google-blue-dark mb-4">For Product Shipping</h2>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>We ship all products through trusted courier partners.</li>
          <li>Orders are usually processed and shipped within 2-3 business days of confirmation.</li>
          <li>Delivery time may range between 5-7 business days, depending on your location.</li>
          <li>Tracking details will be shared via email or SMS once the product is shipped.</li>
          <li>We currently ship only within India. For bulk or international orders, please contact us directly.</li>
        </ul>
        
        <h2 className="text-xl font-semibold text-google-blue-dark mb-4">Shipping Costs</h2>
        <p className="mb-4">
          Shipping costs are calculated based on:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Weight and dimensions of the package</li>
          <li>Delivery destination</li>
          <li>Selected shipping method</li>
        </ul>
        <p className="mb-4">
          Free shipping may be available for orders above a certain value. The exact threshold will be displayed during checkout.
        </p>
        
        <h2 className="text-xl font-semibold text-google-blue-dark mb-4">Order Tracking</h2>
        <p className="mb-4">
          Once your order is dispatched, you will receive a tracking number via email or SMS. You can use this number to track your shipment through:
        </p>
        <ol className="list-decimal pl-5 space-y-2 mb-6">
          <li>Your Clean Craft account dashboard</li>
          <li>The courier partner's website</li>
          <li>Our customer service team</li>
        </ol>
        
        <div className="bg-blue-50 border-l-4 border-google-blue p-4 my-6">
          <h3 className="font-medium text-google-blue-dark">Important Note</h3>
          <p className="text-gray-700">
            While we strive to deliver all orders within the estimated timeframes, delays may occasionally occur due to factors beyond our control, such as weather conditions, natural disasters, or courier service disruptions. We appreciate your understanding in such circumstances.
          </p>
        </div>
      </section>
    </PolicyLayout>
  );
};

export default ShippingPolicy;
