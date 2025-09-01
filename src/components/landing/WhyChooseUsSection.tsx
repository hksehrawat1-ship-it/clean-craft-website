import { Shield, Clock, Leaf, Award, Truck, Phone } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Satisfaction Guarantee",
    description: "We stand behind our work with a complete satisfaction guarantee. Not happy? We'll make it right or it's free.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Clock,
    title: "24/7 Customer Support",
    description: "Round-the-clock customer service to handle your questions, concerns, and scheduling needs anytime.",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Cleaning",
    description: "Safe, non-toxic cleaning methods that protect your clothes, your family, and the environment.",
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    icon: Award,
    title: "Expert Professionals",
    description: "Trained and certified cleaning experts with years of experience handling delicate and specialty fabrics.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Truck,
    title: "Free Pickup & Delivery",
    description: "Convenient door-to-door service at no extra cost. Schedule online and we'll handle the rest.",
    color: "bg-orange-100 text-orange-600"
  },
  {
    icon: Phone,
    title: "Real-Time Updates",
    description: "Stay informed with SMS and email notifications about your order status from pickup to delivery.",
    color: "bg-indigo-100 text-indigo-600"
  }
];

export default function WhyChooseUsSection() {
  return (
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Why Choose <span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">CleanCraft?</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We're not just another laundry service. We're your trusted partner in garment care, 
          delivering exceptional quality and convenience that fits your lifestyle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-2 transition-all duration-300"
          >
            <div className="space-y-6">
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>

            {/* Hover accent */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold">10K+</div>
            <div className="text-blue-100 font-medium">Happy Customers</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold">99%</div>
            <div className="text-blue-100 font-medium">Satisfaction Rate</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold">5★</div>
            <div className="text-blue-100 font-medium">Average Rating</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold">24/7</div>
            <div className="text-blue-100 font-medium">Support Available</div>
          </div>
        </div>
      </div>
    </div>
  );
}