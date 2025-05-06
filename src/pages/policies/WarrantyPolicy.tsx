import React from "react";
import PolicyLayout from '../../components/policies/PolicyLayout';

const WarrantyPolicy = () => {
  return (
    <PolicyLayout
      title="Warranty On Products"
      description="Information about product warranty coverage"
    >
      <section>
        <h2 className="text-xl font-semibold text-google-blue-dark mb-4">Product Warranty Coverage</h2>
        <p className="mb-4">
          All warranties for products purchased on Clean Craft are covered by the manufacturer of the respective product. Service and support for warranty claims are provided directly by the manufacturing company.
        </p>
        <p className="mb-4">
          Clean Craft acts as a retailer and facilitates the connection between customers and manufacturers for warranty claims but is not directly responsible for warranty fulfillment.
        </p>
        
        <div className="bg-blue-50 border-l-4 border-google-blue p-4 my-6">
          <h3 className="font-medium text-google-blue-dark">Important Note</h3>
          <p className="text-gray-700">
            We recommend ordering product samples for your convenience to ensure satisfaction with your purchase before committing to larger orders.
          </p>
        </div>
        
        <h2 className="text-xl font-semibold text-google-blue-dark my-4">Warranty Claim Process</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Contact Clean Craft customer service with your order details and warranty issue</li>
          <li>Our team will provide manufacturer contact information and guidance</li>
          <li>Submit required documentation to the manufacturer as instructed</li>
          <li>The manufacturer will assess the claim according to their warranty terms</li>
          <li>If approved, the manufacturer will handle repair or replacement</li>
        </ol>
        
        <h2 className="text-xl font-semibold text-google-blue-dark my-4">Warranty Limitations</h2>
        <p className="mb-4">
          Warranty coverage varies by product and manufacturer. Typical limitations include:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Damage from misuse, accidents, or improper maintenance</li>
          <li>Normal wear and tear</li>
          <li>Products with removed or altered serial numbers</li>
          <li>Products used for commercial purposes (unless specifically covered)</li>
        </ul>
        
        <p className="mt-6 text-gray-700">
          For specific warranty details on your product, please refer to the warranty documentation included with your purchase or contact our customer service team for assistance.
        </p>
      </section>
    </PolicyLayout>
  );
};

export default WarrantyPolicy;
