import React from "react";
import { Shield, Users, MessageSquare, Baby, Lock, CheckCircle, RefreshCw, AlertCircle } from "lucide-react";
import PolicySection from "@/components/policies/PolicySection";
import PolicyLayout from "@/components/policies/PolicyLayout";


const PrivacyPolicy: React.FC = () => {
  return (
    <PolicyLayout
      title="Privacy Policy"
      description="This privacy policy outlines how CLEAN CRAFT collects, uses, maintains, and discloses information collected from users of our services."
    >
      <div className="space-y-8">
        <PolicySection title="Acceptance" number={1}>
          <p>
            CLEAN CRAFT is a brand under Clean Craft Tech Solutions Pvt Ltd, a company incorporated under the laws of India. 
            By using our website, application, services, and tools, you are accepting and agreeing to be bound by these Privacy 
            policies. If you don't agree with these terms, please do not use our services.
          </p>
          <p className="mt-3">
            We reserve the right to change these Privacy policies at any time in our sole discretion and without notice. 
            All changes are effective immediately when we post them. Your continued use of our services after we have 
            posted changes means that you agree to be bound by the updated policies.
          </p>
          <p className="mt-3">
            The terms "We", "Us", "Our", "CLEAN CRAFT" refer to Clean Craft Tech Solutions Private Limited.
          </p>
        </PolicySection>

        <PolicySection title="Your Details and Personal Information" number={2}>
          <div className="mb-3">
            <h3 className="font-medium text-gray-800 mb-2">Information We Collect</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Name</li>
              <li>Address</li>
              <li>Telephone Number</li>
              <li>Email Address</li>
              <li>Home Address</li>
              <li>Information about your home which you provide</li>
              <li>Your payment details</li>
              <li>Your IP address</li>
              <li>Any other personal information which you give us in connection with the Services</li>
            </ul>
          </div>
          
          <p className="mb-3">
            We collect these details to enhance your service experience. We do not share or sell your data to any second or third parties.
            For remarketing purposes, we may use your email and phone number. By providing your details, you agree that the company may 
            contact you with offers, coupons, or feedback requests via email or text messages.
          </p>

          <div className="mt-4">
            <h3 className="font-medium text-gray-800 mb-2">Information Collected by Third Parties</h3>
            <p>
              We take no responsibility for third-party sites. If you provide your information to third parties, you will be 
              responsible for it, and no complaint shall be entertained in this matter.
            </p>
          </div>
        </PolicySection>

        <PolicySection title="Sharing of Personal Information" number={3}>
          <p>
            We do not sell, trade, or rent users' personal identification information to others. We may share generic 
            aggregated demographic information not linked to any personal identification information regarding visitors 
            and users with our business partners and trusted affiliates for the purposes outlined above.
          </p>
        </PolicySection>

        <PolicySection title="Advertisements on Website and App" number={4}>
          <p>
            The company may share third-party advertisements. We do not take any responsibility for their products, services, or tools. 
            Use of their services is at your own will and discretion.
          </p>
          <p className="mt-3">
            Clean Craft also advertises through notifications on the application, website, email, text messages, etc.
          </p>
        </PolicySection>

        <PolicySection title="Email and Text Messages" number={5}>
          <p>
            By providing your email ID and phone number, you are allowing us to send you emails and text messages at any time. 
            If you do not agree to this, please do not use our services.
          </p>
        </PolicySection>

        <PolicySection title="Children" number={6}>
          <p>
            No children under the age of majority are allowed to use our application and website or place an order. 
            If a child does so, it will be the responsibility of their parent/guardian. Any loss caused by a minor 
            shall be reimbursed by the parents/guardians.
          </p>
        </PolicySection>

        <PolicySection title="How We Protect Information" number={7}>
          <p>
            We use firewalls and encrypted data to protect your personal information. We implement industry best practices 
            to maintain the security of your data.
          </p>
        </PolicySection>

        <PolicySection title="Your Consent" number={8}>
          <p>
            By using our services, you are accepting all our privacy policy terms, which may be changed at any time without notice. 
            Once updated, they are effective immediately. If you do not agree, please do not use our website, application, or 
            any other service provided by the company.
          </p>
        </PolicySection>

        <PolicySection title="Changes to Privacy Policies" number={9}>
          <p>
            We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and 
            clarifications will take effect immediately upon their posting on the Website. If we make material changes to 
            this policy, it will be updated on the website only.
          </p>
        </PolicySection>

        <PolicySection title="For Any Grievance" number={10}>
          <p>Please contact:</p>
          <p className="mt-2">Email: <a href="mailto:hello@Cleancraftapp.com" className="text-google-blue hover:underline">hello@Cleancraftapp.com</a></p>
          <p className="mt-1">Visit us personally or call our call center.</p>
          <p className="mt-3 font-medium">Happy to help our awesome customers, anytime!</p>
        </PolicySection>
      </div>
    </PolicyLayout>
  );
};

export default PrivacyPolicy;