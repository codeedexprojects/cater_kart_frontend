import React, { useEffect } from 'react';
import image1 from '../../../assets/about1.jpg';
import image2 from '../../../assets/about2.jpg';
import image3 from '../../../assets/about3.jpg';
import image4 from '../../../assets/bg-img.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutCaterkart = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div 
            className="flex items-center justify-center mb-4"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
            <span className="text-gray-600 font-medium text-lg md:text-xl font-serif">About us</span>
          </div>
          <h1 
            className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            About Caterkart
          </h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            {/* Main Description */}
            <div 
              className="text-gray-700 font-serif text-lg leading-relaxed"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <p>
                CateringCart is your trusted partner in creating unforgettable events. Whether it's a wedding, corporate event, or private celebration, we provide exceptional catering, professional staff, and seamless event management to make your day special.
              </p>
            </div>

            {/* Mission & Vision Section */}
            <div data-aos="fade-right" data-aos-delay="250">
              <h2 className="text-2xl font-serif font-bold text-yellow-600 mb-6">Mission & Vision:</h2>
              
              {/* Mission */}
              <div className="mb-6">
                <h3 className="text-lg font-serif font-semibold text-blue-600 mb-2">Mission:</h3>
                <p className="text-gray-700 font-serif leading-relaxed">
                  To deliver outstanding catering and event solutions with quality and care.
                </p>
              </div>

              {/* Vision */}
              <div>
                <h3 className="text-lg font-serif font-semibold text-yellow-600 mb-2">Vision:</h3>
                <p className="text-gray-700 font-serif leading-relaxed">
                  To be the leading name in event excellence, known for creativity and customer satisfaction.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Top Left - Elegant table setting */}
            <div 
              className="rounded-2xl overflow-hidden shadow-lg"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <img 
                src={image4}
                alt="Elegant table setting with flowers and candles"
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Top Right - Appetizers/catering display */}
            <div 
              className="rounded-2xl overflow-hidden shadow-lg"
              data-aos="fade-left"
              data-aos-delay="250"
            >
              <img 
                src={image2}
                alt="Elegant catering display with appetizers"
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Bottom Left - Professional server */}
            <div 
              className="rounded-2xl overflow-hidden shadow-lg"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <img 
                src={image1}
                alt="Professional server preparing event"
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Bottom Right - Smiling waiter */}
            <div 
              className="rounded-2xl overflow-hidden shadow-lg"
              data-aos="fade-left"
              data-aos-delay="350"
            >
              <img 
                src={image3} 
                alt="Professional waiter in bow tie"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCaterkart;