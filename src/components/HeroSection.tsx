
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-in">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-primary text-sm font-medium mb-4">
              Professional Training Program
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Master the Art of <span className="text-primary">Laundry</span> Services
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Professional 5-day comprehensive training program in Delhi to help you start your own successful laundry business.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild
                size="lg"
                className="bg-primary hover:bg-primary-hover text-white text-lg px-8"
              >
                <a href="#register">Register Now</a>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="text-gray-700 text-lg px-8"
              >
                <a href="#course">Learn More</a>
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-8">
              <span className="text-sm text-gray-500">Next Batch:</span>
              <span className="py-1 px-3 rounded-full bg-blue-100 text-primary text-sm font-medium">
                5th June, 2025
              </span>
              <span className="py-1 px-3 rounded-full bg-blue-100 text-primary text-sm font-medium">
                25th June, 2025
              </span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-blue-200 opacity-60"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-blue-100 opacity-60"></div>
              <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=600&q=80" 
                  alt="Clean Craft Laundry Training" 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                  <p className="text-xl font-bold">Hands-on Training</p>
                  <p>Learn from industry experts in Delhi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
