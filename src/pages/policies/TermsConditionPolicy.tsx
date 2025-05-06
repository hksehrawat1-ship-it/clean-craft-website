import React from "react";
import PolicyLayout from '../../components/policies/PolicyLayout';

const TermsConditionPolicy = () => {
  return (
    <PolicyLayout
      title="Terms & Conditions"
      description="Please read these terms and conditions carefully before using our services"
    >
      <section className="space-y-8">
        <div className="bg-blue-50 border-l-4 border-google-blue p-4 my-6">
          <h3 className="font-medium text-google-blue-dark">Important Notice</h3>
          <p className="text-gray-700">
            By using CLEAN CRAFT's services, you agree to be bound by these terms and conditions. If you do not agree, please do not use our services.
          </p>
        </div>

        {/* 1. Acceptance */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">1. Acceptance</h2>
          <p className="mb-4">
            CLEAN CRAFT is a Brand under Clean Craft Tech Solutions Pvt Ltd company incorporated under the laws of India. You understand that by using the website, application, services and tools you are accepting and agreeing to bound and abided by these terms and conditions. Please do not use our services if you don't agree. We reserve the right to change these Terms of Use and conditions at any time at our sole discretion and without notice. All changes are effective immediately when we post them. Your continued use of the App after we have posted changes to these Terms of Use means that you agree to be bound and abide by the changes, so please check the Terms of Use regularly for any changes.
          </p>
          <p className="mb-4">
            The term "We", "Us", "Our", "CLEAN CRAFT" shall mean Clean Craft Tech Solutions Private Limited.
          </p>
        </div>

        {/* 2. Modification of price and services */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">2. Modification of Price and Services</h2>
          <p className="mb-4">
            All quoted prices are inclusive of Goods & Services and are subject to change without notice. All bills must be paid at the time of collection of garments or as otherwise directed by us and we reserve the right to retain your goods until payment in full is received.
          </p>
        </div>

        {/* 3. Content and general disclaimers */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">3. Content and General Disclaimers</h2>
          <p className="mb-4">
            All content on the website and application is the sole property of Clean Craft Tech Solutions Pvt. Ltd Under government copyright 2018.
          </p>
        </div>

        {/* 4. Third-party links */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">4. Third-party Links / Links to Other Websites</h2>
          <p className="mb-4">
            We use third-party links and we do have links to other websites. We take no responsibility in any manner for their content, services and products. We also use third-party payment gateways, which are secure, but in some conditions or in any circumstance it fails to perform its function, we take no responsibility. In that case, you can get an official letter that we don't receive payment.
          </p>
        </div>

        {/* 5. Cookies */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">5. Cookies</h2>
          <p className="mb-4">
            Our website uses cookies to help remember and process the items in the shopping cart. It understands and saves the user's preferences for future visits. It also compiles aggregate data about site traffic and site interactions to offer better site experiences and tools in the future. We may also use trusted third-party services that track this information on our behalf. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since the browser is a little different, look at your browser's Help Menu to learn the correct way to modify your cookies.
          </p>
        </div>

        {/* 6. Termination */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">6. Termination</h2>
          <p className="mb-4">Clean Craft Tech Solutions Pvt. Ltd can terminate any user for:</p>
          <ul className="list-disc pl-5 mb-4">
            <li>Misbehaviour with the company or any person related directly or indirectly to the company.</li>
            <li>Don't pay the bill.</li>
            <li>Cancel order 5 times a week.</li>
            <li>No-show 3 times after the order is placed.</li>
            <li>Other unseen conditions.</li>
          </ul>
          <p className="mb-4">
            The company also reserved the right to cancel the membership without any notice. No complaint shall be entertained in this matter.
          </p>
        </div>

        {/* 7. Offers and coupon codes */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">7. Offers and Coupon Codes</h2>
          <p className="mb-4">
            Offers and coupons are for a temporary period. Read the expiry date before applying. The company can spend any offer or coupon at any time without notice.
          </p>
        </div>

        {/* 8. Minimum order */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">8. Minimum Order</h2>
          <p className="mb-4">No order will be entertained without minimum order criteria.</p>
          <p className="mb-4">(A) Minimum order criteria is an amount fixed by the company is Rs. 200 For services and products.</p>
          <p className="mb-4">Minimum order criteria can be changed without any notice.</p>
        </div>

        {/* 9. Damage items */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">9. Damage Items</h2>
          <p className="mb-4">
            The company is not responsible for damage to cloth due to bleeding of colour and shrinkage or if the fabric expend. The company takes no responsibility for damaged items please check every piece before pick-up and at the time of delivery. If there is a damaged piece we call the customer. Moreover, if the item is damaged by us, the company pay 10 time the cost of processing irrespective of brand, colour, fabric & condition etc. All subjects are under Delhi jurisdiction only.
          </p>
          <p className="mb-4">Chark i.e. starch will be done on customer risk.</p>
          <p className="mb-4">If the Cloth is damaged it will not be processed without customer consent & will be returned within 2 days.</p>
        </div>

        {/* 10. Lost items */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">10. Lost Items</h2>
          <p className="mb-4">
            Any item lost should be reported within 30 minutes at the time of delivery. Item is considered lost after 10 days. The company will pay 10 times of the processing charge of the lost item irrespective of the brand, colour, fabric & condition etc. All subjects are under Delhi jurisdiction only.
          </p>
        </div>

        {/* 11. Delivery */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">11. Delivery</h2>
          <p className="mb-4">
            We try our level best to make timely and secure delivery. Once the delivery is been made the company holds no responsibility for the lost item. Please check all items at the time of delivery. No complaint shall be entertained after it.
          </p>
          <p className="mb-4">Delivery of the goods must be taken within 15 days from the date of booking.</p>
        </div>

        {/* 12. Reimbursement policies */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">12. Reimbursement Policies for Damaged or Lost Items</h2>
          <p className="mb-4">
            We are a reputed company dedicated to customer service in every way possible. A human is not perfect miss happens sometimes.
          </p>
          <p className="mb-4">
            We want to do our best to offer you reimbursements and we follow the International Fabric care claims guide to do so.
          </p>
          <p className="mb-4">
            In case we are unable to find the lost item or damaged item we provide 10 times the cost of service of the item and in the case of the package 10 times the cost of dry clean of that particular item.
          </p>
          <p className="mb-4 font-medium">
            NOTE: After payment, the garment or the item will be the property of Clean Craft Tech Solutions pvt ltd. And will be used for Research and development purposes, so that damage won't happen in future.
          </p>
          <p className="mb-4">
            Clean craft does not take responsibility for items such as gold items, watches, money, rings cell phones etc. forget in the pick-up bag at the time of pick-up. No claims will be entertained in this matter.
          </p>
          <p className="mb-4 font-medium">Another type of compensation:</p>
          <p className="mb-4">
            If the customer doesn't agree to take compensation, the customer can get a dry cleaning and laundry or any other service package present on that very shop of the half for less the price quoted by the customer.
            AMOUNT will be decided by the company or Franchise store owner only.
          </p>
        </div>

        {/* 13. Hand dry */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">13. Hand Dry</h2>
          <p className="mb-4">
            The company use best-in-class Dryers. But if you prefer to use hand dry service please inform in advance.
          </p>
        </div>

        {/* 14. Pick-up, delivery, cancellation */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">14. Pick-up, Delivery, Cancellation and Rescheduling</h2>
          <p className="mb-4">
            The time will be confirmed by the company agent via app or call. In case this service is not available, the day should be considered irrespective of the timing. In case of a No-Show, the customer shall pay 50rs for every time of No-show both in case of Pick-up and delivery. Cancellation should be made within 30 minutes of the pick-up. If a person cancels more than 5 times in a month company is liable to cancel his membership without any notice.
          </p>
          <p className="mb-4">
            We are trying our level best to provide our customers with world-class service. Due to some technical issues, rescheduling is not available, the customer can cancel and place the order again.
          </p>
          <p className="mb-4">
            We do this because some anti-elements schedule false orders.
          </p>
        </div>

        {/* 15. Allergies */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">15. Allergies</h2>
          <p className="mb-4">
            The company use best-in-class liquid detergent and conditioners. Moreover, CLEAN CRAFT is the first in class to use antifungal and antibacterial solutions. We have achieved a benchmark in Hygiene laundry. If a customer has some allergies please inform customer care or the agent.
          </p>
          <p className="mb-4">The company holds no responsibility for medical conditions.</p>
        </div>

        {/* 16. Re-cleaning policy */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">16. Re-cleaning Policy</h2>
          <p className="mb-4">
            We have strict quality control but in some odd scenarios if a spot remains a customer can claim our re-cleaning policies once. If the spot is not removed customer has to opt for wet- a clean or dry-clean procedure. The customer has to inform us within 1 hour of the delivery. Re- cleaning will only be done at the time of the next pick-up. On special Pickup will be made for re-cleaning.
          </p>
        </div>

        {/* 17. Personal property */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">17. Personal Property Left at the Time of Pick-up</h2>
          <p className="mb-4">
            The company holds no responsibility for the valuable items left at the time of pick-up. Please check every pocket and every item in the advance company will try to search it, if found will return it but in no case, reimbursement shall be given, No matter what the item was and no complaint shall be entertained in any condition.
          </p>
        </div>

        {/* 18. Membership and club */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">18. Membership and Club</h2>
          <p className="mb-4">
            The company can deny any customer membership without any reason. It's the will of the company to give the membership. Membership is non-transferable expect spouses only. The customer has to show some proof id asked
          </p>
          <p className="mb-4">
            Membership has an expiry date. The company may or may not extend the date of expiry.
          </p>
        </div>

        {/* 19. Package system */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">19. Package System</h2>
          <p className="mb-4">
            The company provides a package system for the members only. 1-2 pick-ups will be given to the customer in the package. If a customer asks for pick-up it will be charged as per the service price quoted by the company as he was given time.
          </p>
        </div>

        {/* 20. Tax and Payments */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">20. Tax and Payments</h2>
          <p className="mb-4">
            The tax shall be as per the government of India. Payment shall be made in advance for the package system. If the customer has taken the service he has to pay for it no matter if he is satisfied or not. Any denial of payment is subject to judicial trial. All matters of the complaint are under Delhi's jurisdiction.
          </p>
        </div>

        {/* 21. Disputes */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">21. Disputes</h2>
          <p className="mb-4">
            ALL DISPUTES ARE TO BE SETTLED IN DELHI COURT JURISDICTION ONLY.
          </p>
        </div>

        {/* 22. Denial of services */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">22. Denial of Services</h2>
          <p className="mb-4">
            The company can deny any service to any person without any reason or notice.
          </p>
          <p className="mb-4">
            We do so to protect our company and respectable customer from anti-elements.
          </p>
        </div>

        {/* 23. Use of our content */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">23. Use of Our Content</h2>
          <p className="mb-4">
            All the content on this website, and the application is the sole property of Clean Craft Tech Solutions Private Limited. Use of Graphics, Logo, name or any other material is strictly restricted.
          </p>
        </div>

        {/* 24. Inventory */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">24. Inventory</h2>
          <p className="mb-4">
            Cleanly reserve the right to keep records of your garments and retain, store, display or reproduce such records which may include images or photographs, and associate such records with your name or other profile information for commercially reasonable periods for archival, inventory purposes, quality control, loss prevention, and or data collection
          </p>
        </div>

        {/* 25. Your Consent */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">25. Your Consent</h2>
          <p className="mb-4">
            By using the website application or taking our products and services you give your consent to all our terms and condition and privacy policies.
          </p>
        </div>

        {/* 26. Change to terms */}
        <div>
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">26. Change to Terms and Conditions of Use</h2>
          <p className="mb-4">
            The company can change any terms or conditions of use at any time without giving notice. Please remain updated.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 p-6 rounded-lg mt-8">
          <h2 className="text-xl font-semibold text-google-blue-dark mb-4">For any grievance</h2>
          <p>Please contact:</p>
          <p>Email: <a href="mailto:hello@Cleancraftapp.com" className="text-blue-500 hover:underline">hello@Cleancraftapp.com</a></p>
          <p>Visit us personally or call our call centre.</p>
          <p className="mt-4 font-medium">Happy to help our awesome customers, anytime!</p>
        </div>
      </section>
    </PolicyLayout>
  );
};

export default TermsConditionPolicy;
