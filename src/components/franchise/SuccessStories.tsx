import React from "react";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SuccessStories = () => {
  const storeImages = [
    {
      src: "/lovable-uploads/472c4875-a6bd-49da-9dbc-17ac8e5ee228.png",
      alt: "Clean Craft Store",
    },
    {
      src: "/lovable-uploads/aabe5366-4868-47b6-bd4b-101ad2e43ccb.png",
      alt: "Clean Craft Store",
    },
    {
      src: "/lovable-uploads/7f8dd830-65f2-4c69-8731-f046bfe8c97a.png",
      alt: "Clean Craft Store",
    },
    {
      src: "/lovable-uploads/1bc896e2-afee-43a0-837f-2e259a74ae49.png",
      alt: "Clean Craft Store",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
            One Brand. 100+ Success Stories. <br />
            <span className="text-blue-600">Yours Could Be Next</span>
          </h2>
          <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Clean Image Gallery */}
        <div className="mb-12">
          <Carousel className="w-full  mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {storeImages.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="relative group">
                    <div className="aspect-video overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">
              This store can be yours.
            </h3>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our successful franchise network and start your journey to
              entrepreneurial success with Clean Craft.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className=" flex justify-center text-center gap-3 bg-blue-50 text-blue-700 py-0 rounded-full px-3 items-center">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:8800771349" className="mt-4 text-lg font-bold">
                  8800771349
                </a>
              </div>

              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors duration-300"
                onClick={() => window.open("tel:8800771349", "_self")}
              >
                Call Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              Speak with our franchise experts today
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
