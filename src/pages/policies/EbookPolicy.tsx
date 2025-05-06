import React from "react";
import PolicyLayout from '../../components/policies/PolicyLayout';

const EbookPolicy = () => {
  return (
    <PolicyLayout
      title="Ebook Policy"
      description="Terms and conditions for ebook purchases and downloads"
    >
      <section>
        <div className="bg-blue-50 border-l-4 border-google-blue p-4 my-6">
          <h3 className="font-medium text-google-blue-dark">Important Notice</h3>
          <p className="text-gray-700">
            Once you pay, the book will be downloaded automatically to your device. If you want a hard copy, please order it from Amazon or Flipkart. Once the book is downloaded, the payment is non-refundable.
          </p>
        </div>
        
        <h2 className="text-xl font-semibold text-google-blue-dark mb-4">Purchase and Download Process</h2>
        <ol className="list-decimal pl-5 space-y-2 mb-6">
          <li>Select the desired ebook from our catalog</li>
          <li>Proceed to checkout and complete the payment</li>
          <li>The ebook will automatically begin downloading to your device</li>
          <li>A download link will also be sent to your registered email address</li>
          <li>The download link remains active for 7 days from the purchase date</li>
        </ol>
        
        <h2 className="text-xl font-semibold text-google-blue-dark mb-4">Usage Rights and Restrictions</h2>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Each ebook purchase grants a single-user, non-transferable license</li>
          <li>The ebook is for personal use only and may not be redistributed or shared</li>
          <li>You may download and access the ebook on up to 3 personal devices</li>
          <li>The ebook content is protected by copyright law</li>
          <li>Any unauthorized distribution or reproduction is strictly prohibited</li>
        </ul>
        
        <h2 className="text-xl font-semibold text-google-blue-dark mb-4">Technical Support</h2>
        <p className="mb-4">
          If you encounter technical difficulties with your ebook download or access, our support team is available to assist you:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Contact us within 48 hours of purchase for download issues</li>
          <li>Provide your order number and details of the technical problem</li>
          <li>Our team will work to resolve access issues or provide alternative download options</li>
          <li>Technical support does not cover compatibility with all devices or software</li>
        </ul>
        
        <h2 className="text-xl font-semibold text-google-blue-dark mb-4">Format and Compatibility</h2>
        <p className="mb-4">
          Our ebooks are provided in PDF, EPUB, or MOBI formats. Before purchasing, please ensure your device is compatible with these formats. We cannot guarantee compatibility with all e-readers or devices.
        </p>
        
        <p className="mt-6 text-gray-700">
          By purchasing an ebook from Clean Craft, you acknowledge that you have read, understood, and agreed to these terms and conditions.
        </p>
      </section>
    </PolicyLayout>
  );
};

export default EbookPolicy;
