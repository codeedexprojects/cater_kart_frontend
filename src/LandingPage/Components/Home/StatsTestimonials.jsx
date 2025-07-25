import React, { useEffect } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import image from '../../../assets/whychoose.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function EventLandingPage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);
   const handleClick = () => {
        const phoneNumber = '917907005511'; 
        const whatsappURL = `https://wa.me/${phoneNumber}`;
        window.open(whatsappURL, '_blank');
    };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div 
            className="flex items-center justify-center gap-2 mb-6"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
            <span className="text-gray-600 font-medium text-lg md:text-xl font-serif">Why choose us</span>
          </div>
          <h1 
            className="text-5xl md:text-6xl font-serif text-gray-900 leading-tight"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            We Turn Every Occasion<br />
            Into a Signature Experience.
          </h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {/* Left Column - Seamless Service */}
          <div className="flex flex-col h-full gap-8">
            {/* Seamless Service Box */}
            <div 
              className="bg-white rounded-2xl p-8 shadow-sm flex-1"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Seamless Service</h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg font-serif">
                Every event we manage is designed to bring elegance, efficiency, and unforgettable memories.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg font-serif">
                Our dedicated team has successfully catered hundreds of events with flawless execution and attention to detail.
              </p>
              <div className="mt-6">
                <div className="text-5xl font-bold text-orange-400 mb-2 font-serif">500+</div>
                <p className="text-gray-700 text-lg font-serif">successful events organized</p>
              </div>
            </div>

            {/* Stats Box */}
            <div 
              className="bg-white rounded-2xl p-8 shadow-sm flex-1"
              data-aos="fade-right"
              data-aos-delay="250"
            >
              <div className="space-y-8 h-full flex flex-col">
                <div>
                  <div className="text-5xl font-bold text-orange-400 mb-2 font-serif">95%</div>
                  <p className="text-gray-700 text-lg font-serif">
                    Clients report 95% satisfaction rates with our premium catering and service teams.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column - Image */}
          <div 
            className="lg:col-span-1 h-full"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <div className="h-full rounded-2xl overflow-hidden">
              <img
                src={image}
                alt="Professional catering service"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Client Stats */}
          <div className="flex flex-col h-full gap-8">
            {/* 85% Box */}
            <div 
              className="bg-white rounded-2xl p-8 shadow-sm flex-1"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <div className="text-5xl font-bold text-orange-400 mb-4 font-serif">85%</div>
              <p className="text-gray-700 leading-relaxed text-lg font-serif">
                Client retention due to exceptional quality, premium setups, and dedicated staff.
              </p>
            </div>

            {/* Client Approved Box */}
            <div 
              className="bg-white rounded-2xl p-8 shadow-sm flex-1"
              data-aos="fade-left"
              data-aos-delay="250"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-4 font-serif">Client Approved</h3>
              <p className="text-gray-700 leading-relaxed mb-8 text-lg font-serif">
                Recognized for reliability and quality, with glowing reviews from families, corporates, and wedding planners.
              </p>

              <div className="mt-auto">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-orange-400 font-serif">4.9</span>
                  <Star className="w-8 h-8 text-orange-400 fill-current" />
                </div>
                <p className="text-gray-700 text-lg font-serif">average client rating</p>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              style={{backgroundColor:"#0A58A3"}} 
              className="cursor-pointer font-serif text-white font-semibold px-10 py-5 rounded-xl transition-colors duration-200 flex items-center gap-3 justify-center text-lg"
              data-aos="fade-up"
              data-aos-delay="300"
              onClick={handleClick}
            >
              Connect US
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}