import React from "react";
import PolicyLayout from '../../components/policies/PolicyLayout';

const CancellationPolicy = () => {
  return (
    <PolicyLayout
      title="Cancellation Policy"
      description="Our policy for cancelling orders and services"
    >
      <section>
        <p className="text-lg mb-6">
          We understand plans can change. Our cancellation policy is designed to be fair and transparent.
        </p>
        
        <h2 className="text-xl font-semibold text-google-blue-dark mb-4">For Laundry & Dry Cleaning Services</h2>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Orders can be cancelled free of charge within 30 minutes of booking.</li>
          <li>After 30 minutes or once the pickup has been completed, the order cannot be cancelled.</li>
          <li>If a service is cancelled after pickup, the customer will be charged a visit fee.</li>
        </ul>
        
        <h2 className="text-xl font-semibold text-google-blue-dark mb-4">For Product Purchases</h2>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Orders can be cancelled before dispatch without any charges.</li>
          <li>Once an order is dispatched, it cannot be cancelled. You may initiate a return once the item is delivered (refer to our Refund Policy).</li>
        </ul>
        
        <h2 className="text-xl font-semibold text-google-blue-dark mb-4">For Franchise Registration</h2>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Franchise registration cancellation must be requested in writing within 3 business days of payment.</li>
          <li>Cancellations are subject to review, and administrative fees will apply.</li>
          <li>If onboarding or document processing has started, cancellation is not permitted.</li>
        </ul>
        
        <h2 className="text-xl font-semibold text-google-blue-dark mb-4">How to Request Cancellation</h2>
        <p className="mb-4">
          To cancel an order or service:
        </p>
        <ol className="list-decimal pl-5 space-y-2 mb-6">
          <li>Log into your Clean Craft account</li>
          <li>Navigate to "My Orders" or "Order History"</li>
          <li>Select the order you wish to cancel</li>
          <li>Click on the "Cancel Order" button (if available based on order status)</li>
          <li>Follow the prompts to complete the cancellation</li>
        </ol>
        
        <p className="mb-4">
          Alternatively, you can contact our customer service team for assistance with cancellations.
        </p>
        
        <div className="bg-blue-50 border-l-4 border-google-blue p-4 my-6">
          <h3 className="font-medium text-google-blue-dark">Important Note</h3>
          <p className="text-gray-700">
            Repeated cancellations may affect your account status and future service availability. We appreciate your understanding of our cancellation policies, which are designed to maintain operational efficiency and service quality.
          </p>
        </div>
      </section>
    </PolicyLayout>
  );
};

export default CancellationPolicy;
