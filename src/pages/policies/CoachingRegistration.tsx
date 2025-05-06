import React from "react";
import PolicyLayout from '../../components/policies/PolicyLayout';

const CoachingRegistration = () => {
  return (
    <PolicyLayout
      title="Registration for Coaching Classes"
      description="Terms and conditions for enrolling in Clean Craft coaching programs"
    >
      <section>
        <div className="bg-blue-50 border-l-4 border-google-blue p-4 my-6">
          <h3 className="font-medium text-google-blue-dark">Important Notice</h3>
          <p className="text-gray-700">
            Please note that registration is one-time only and is non-refundable.
          </p>
        </div>
        
        <h2 className="text-xl font-semibold text-google-blue-dark mb-4">Registration Process</h2>
        <ol className="list-decimal pl-5 space-y-2 mb-6">
          <li>Complete the application form with accurate personal and professional details</li>
          <li>Submit any required documentation for verification</li>
          <li>Pay the registration fee as specified for your chosen program</li>
          <li>Receive confirmation of enrollment via email</li>
          <li>Access your course materials and schedule through the Clean Craft learning portal</li>
        </ol>
        
        <h2 className="text-xl font-semibold text-google-blue-dark mb-4">Terms of Registration</h2>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Registration fees are non-refundable under any circumstances</li>
          <li>Registration is personal and non-transferable to another individual</li>
          <li>Clean Craft reserves the right to modify course schedules or content as needed</li>
          <li>Participants must adhere to the code of conduct established for coaching sessions</li>
          <li>Attendance requirements must be met as specified in the course guidelines</li>
        </ul>
        
        <h2 className="text-xl font-semibold text-google-blue-dark mb-4">Course Access</h2>
        <p className="mb-4">
          Upon successful registration, you will receive:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Login credentials for the Clean Craft learning management system</li>
          <li>Access to scheduled live sessions (online or in-person as applicable)</li>
          <li>Course materials in digital format</li>
          <li>Access to discussion forums and networking opportunities with peers</li>
        </ul>
        
        <h2 className="text-xl font-semibold text-google-blue-dark mb-4">Certification</h2>
        <p className="mb-4">
          Participants who successfully complete the coaching program will receive:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>A certificate of completion from Clean Craft</li>
          <li>Recognition on the Clean Craft professional network (if applicable)</li>
          <li>Access to alumni resources and continued learning opportunities</li>
        </ul>
        
        <p className="mt-6 text-gray-700">
          By registering for a Clean Craft coaching class, you acknowledge that you have read, understood, and agreed to these terms and conditions.
        </p>
      </section>
    </PolicyLayout>
  );
};

export default CoachingRegistration;
