import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const Author = () => {
  return (
    <section className="py-16 md:py-24 bg-white text-grey-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Section */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              From the <span className="text-blue-500">Expert</span> in Laundry
              Business
            </h2>
            <Card className="bg-white border-blue-500/30">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-blue-500 mb-2">
                  Mr. Himanshu Sehrawat
                </h3>
                <p className="text-sm text-grey-600 mb-4">
                  FOUNDER & CEO CLEAN CRAFT
                </p>
                <p className="mb-4 text-grey-900">
                  With years of experience in the{" "}
                  <strong>dry cleaning business in India</strong>, Mr. Sehrawat
                  has developed proven methods to create and scale successful{" "}
                  <strong>laundry franchise business</strong> models across
                  India.
                </p>
                <p className="mb-4 text-grey-900">
                  As the founder of Clean Craft, he has transformed the{" "}
                  <strong>laundry business</strong> landscape with innovative
                  approaches that generate consistent profits.
                </p>
                <p className="text-grey-900">
                  Now, he's sharing his knowledge on{" "}
                  <strong>how to start laundry business in India</strong>{" "}
                  through this comprehensive guide that reveals exactly{" "}
                  <strong>how to run laundry business successfully</strong>.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2">
            <div className="bg-blue-50 p-8 rounded-lg border border-blue-500/30">
              <h3 className="text-2xl font-semibold mb-6 text-blue-500">
                Why I Wrote This Book
              </h3>
              <p className="mb-4 text-grey-900">
                "Throughout my journey in the laundry industry, I've seen
                countless entrepreneurs struggle with{" "}
                <strong>laundry setup cost in India</strong> due to lack of
                proper guidance.
              </p>
              <p className="mb-4 text-grey-900">
                The <strong>laundry and dry cleaning business in India</strong>{" "}
                has immense potential to become a{" "}
                <strong>profitable business in India 2025</strong>, yet there
                was no comprehensive resource available to guide newcomers.
              </p>
              <p className="mb-4 text-grey-900">
                This <strong>laundromat business guide</strong> is my
                contribution to helping entrepreneurs understand exactly
                <strong> how much to invest in laundry business</strong> and
                providing the strategies they need to build high-revenue laundry
                businesses from the ground up."
              </p>
              <p className="text-right text-blue-500 italic">
                - Himanshu Sehrawat
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <a
            href="https://cleancraft.mojo.page/online-laundry-training-in-india"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 text-white bg-[#1869D3] hover:bg-[#155bb6] rounded-full text-lg font-semibold transition duration-300"
          >
            Start Reading
          </a>
        </div>
      </div>
    </section>
  );
};

export default Author;
