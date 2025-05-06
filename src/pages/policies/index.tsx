import { Link } from "react-router-dom";
import { FileText, RefreshCw, Calendar, Truck, BookCheck, BookOpen, Shield } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


const policies = [
  {
    title: "Warranty Policy",
    description: "Information about manufacturer warranties on Clean Craft products",
    icon: FileText,
    path: "/policies/warranty"
  },
  {
    title: "Refund Policy",
    description: "Our refund policies for services and products",
    icon: RefreshCw,
    path: "/policies/refund"
  },
  {
    title: "Cancellation Policy",
    description: "How to cancel orders and applicable terms",
    icon: Calendar,
    path: "/policies/cancellation"
  },
  {
    title: "Shipping Policy",
    description: "Details about shipping timeframes and practices",
    icon: Truck,
    path: "/policies/shipping"
  },
  {
    title: "Coaching Registration",
    description: "Terms for enrolling in Clean Craft coaching classes",
    icon: BookCheck,
    path: "/policies/coaching-registration"
  },
  {
    title: "Ebook Policy",
    description: "Terms related to purchasing and downloading ebooks",
    icon: BookOpen,
    path: "/policies/ebook"
  },
  {
    title: "Privacy Policy",
    description: "This privacy policy outlines how CLEAN CRAFT collects, uses, maintains, and discloses information collected from users of our services.",
    icon: Shield,
    path: "/policies/privacy"
  },
  {
    title: "Terms & Conditions",
    description: "Please read these terms and conditions carefully before using our services",
    icon: FileText,
    path: "/policies/terms-conditions"
  }
];

const PoliciesIndex = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-2">
        <div className="max-w-3xl w-full mx-auto text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-blue-500 mb-2">Clean Craft Policies</h1>
          <p className="text-lg md:text-xl text-grey-700 mb-6">Information about our terms, policies, and procedures</p>
          <div className="mx-auto w-16 h-1 bg-blue-100 rounded-full mb-8" />
        </div>
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {policies.map((policy) => (
            <Link
              key={policy.path}
              to={policy.path}
              className="bg-white border border-blue-100 rounded-xl p-6 flex items-start gap-4 hover:shadow-lg transition-shadow group"
            >
              <div className="bg-blue-50 p-3 rounded-full flex items-center justify-center">
                <policy.icon className="h-7 w-7 text-blue-500" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-bold text-blue-500 group-hover:underline mb-1">{policy.title}</h2>
                <p className="text-grey-900 text-base">{policy.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center text-grey-900 text-base">
          Have questions about our policies?{' '}
          <a href="mailto:hello@cleancraftapp.com" className="text-blue-500 hover:underline">Contact us</a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliciesIndex;
