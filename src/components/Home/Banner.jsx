import React, { useState, useEffect } from "react";

const Banner = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const fullText =
    "Asian Import & Export Co., LTD is a manufacturer and wholesaler serving NC, SC, TN, and VA. With competitive pricing, quality products, strong inventory, and reliable delivery, we build lasting customer relationships.";

  // Typing animation effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 40);

      return () => clearTimeout(timer);
    } else {
      // Once typing is complete, blink the cursor
      const cursorTimer = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);

      return () => clearInterval(cursorTimer);
    }
  }, [currentIndex, fullText]);

  return (
    <div className="relative w-full h-96 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/banner-bg.jpg')",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backgroundBlendMode: "overlay",
        }}
      ></div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 flex items-center justify-center h-full px-4 ">
          <div className="max-w-4xl p-8    relative overflow-hidden">
            <div className="text-center mb-4">
              <div className="flex justify-center items-center mb-3">
                <svg
                  className="w-8 h-8 mr-3 text-amber-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <h1 className="text-3xl md:text-4xl font-bold text-white-800">
                  Welcome to Asian Import & Export
                </h1>
              </div>
              <div className="h-1 w-24 bg-gradient-to-r from-amber-400 to-teal-500 mx-auto rounded-full mb-2"></div>
            </div>

            <div className="relative p-6 bg-white/80 rounded-xl shadow-inner mb-6 border border-teal-100">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-teal-500 rounded-xl blur opacity-30"></div>
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 text-teal-600 mr-3 mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p className="text-lg text-gray-800 font-medium leading-relaxed">
                  {displayText}
                  <span
                    className={`inline-block w-1 h-6 bg-teal-600 align-middle ml-1 ${
                      showCursor ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-300`}
                  ></span>
                </p>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className=" flex flex-wrap justify-center gap-5">
              <button className="relative overflow-hidden group bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <span className="relative z-10 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    ></path>
                  </svg>
                  Explore Products
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-teal-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="relative overflow-hidden group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <span className="relative z-10 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  Contact Us
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
