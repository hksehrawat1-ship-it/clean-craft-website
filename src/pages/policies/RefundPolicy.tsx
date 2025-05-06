import React from "react";
import PolicyLayout from '../../components/policies/PolicyLayout';
import { Separator } from '../../components/ui/separator';

const RefundPolicy = () => {
  return (
    <PolicyLayout
      title="Refund Policy - Clean Craft"
      description="Our refund policies for services and products"
    >
      <section>
        <p className="text-lg mb-6">
          At Clean Craft, we are committed to delivering high-quality services and products. Our refund policies differ depending on the nature of your purchase.
        </p>
        
        <h2 className="text-xl font-semibold text-google-blue-dark mb-4">For Laundry & Dry Cleaning Services</h2>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>No refunds will be issued once the service has been completed and delivered to the customer.</li>
          <li>In case of any damage or dissatisfaction with the service, customers must report the issue within 24 hours of delivery. If verified, we may offer a free re-service or a partial refund depending on the severity of the issue.</li>
          <li>Refunds (if approved) will be processed within 7-10 working days to the original payment method.</li>
        </ul>
        
        <h2 className="text-xl font-semibold text-google-blue-dark mb-4">For Product Purchases (e.g., Laundry Kits, Equipment)</h2>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Refunds are only accepted for unused and undamaged products returned within 7 days of delivery.</li>
          <li>Products must be returned in original packaging with all accessories.</li>
          <li>Return shipping charges will be borne by the customer unless the product is defective or incorrect.</li>
          <li>A restocking fee of 10% may be applied to certain returned products.</li>
          <li>Approved refunds will be processed within 7-10 working days.</li>
        </ul>
        
        <h2 className="text-xl font-semibold text-google-blue-dark mb-4">For Franchise Payments</h2>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Franchise fees and one-time setup payments are non-refundable once the onboarding or training process has started.</li>
          <li>If a refund request is made before onboarding, a partial refund may be considered after deducting administrative and processing charges.</li>
        </ul>
        
        <div className="bg-blue-50 border-l-4 border-google-blue p-4 my-6">
          <h3 className="font-medium text-google-blue-dark">Important Note</h3>
          <p className="text-gray-700">
            Clean Craft's returns and exchange policy doesn't give you the option to return or exchange items purchased on Clean Craft for any reason other than those specified above. We recommend ordering samples for your convenience before making larger purchases.
          </p>
        </div>
        
        <h2 className="text-xl font-semibold text-google-blue-dark mb-4">Refund Process</h2>
        <ol className="list-decimal pl-5 space-y-2 mb-6">
          <li>Contact our customer service team with your order details and reason for refund</li>
          <li>Our team will review your request according to the applicable policy</li>
          <li>If approved, you'll receive instructions for return shipping (for products)</li>
          <li>Once we receive and inspect returned items (if applicable), the refund will be processed</li>
          <li>Refunds will be issued to the original payment method</li>
        </ol>
        
        <p className="mt-6 text-gray-700">
          For specific questions about refunds or to initiate a refund request, please contact our customer service team.
        </p>
      </section>
    </PolicyLayout>
  );
};

export default RefundPolicy;
