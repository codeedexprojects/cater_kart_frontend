import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TestimonialsImageSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="relative min-h-[70vh] md:min-h-screen bg-gray-100 py-8 md:py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        {/* Floating Profile Images - Desktop */}
        {/* Top Left Area */}
        <div 
          className="hidden md:block absolute top-0 left-0 w-32 h-32 rounded-2xl overflow-hidden shadow-lg transform -rotate-3 animate-float-slow"
          data-aos="fade-down-right"
          data-aos-delay="100"
        >
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
            alt="Happy client" 
            className="w-full h-full object-cover"
          />
        </div>

        <div 
          className="hidden lg:block absolute top-16 left-40 w-36 h-40 rounded-2xl overflow-hidden shadow-lg transform rotate-2 animate-float-medium"
          data-aos="fade-down-right"
          data-aos-delay="200"
        >
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
            alt="Happy client" 
            className="w-full h-full object-cover"
          />
        </div>

        <div 
          className="hidden xl:block absolute top-4 left-80 w-28 h-32 rounded-2xl overflow-hidden shadow-lg transform -rotate-1 animate-float-fast"
          data-aos="fade-down-right"
          data-aos-delay="300"
        >
          <img 
            src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face" 
            alt="Happy client" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top Right Area */}
        <div 
          className="hidden md:block absolute top-8 right-0 w-32 h-36 rounded-2xl overflow-hidden shadow-lg transform rotate-3 animate-float-medium"
          data-aos="fade-down-left"
          data-aos-delay="100"
        >
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
            alt="Happy client" 
            className="w-full h-full object-cover"
          />
        </div>

        <div 
          className="hidden lg:block absolute top-0 right-40 w-30 h-32 rounded-2xl overflow-hidden shadow-lg transform -rotate-2 animate-float-slow"
          data-aos="fade-down-left"
          data-aos-delay="200"
        >
          <img 
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" 
            alt="Happy client" 
            className="w-full h-full object-cover"
          />
        </div>

        <div 
          className="hidden xl:block absolute top-20 right-80 w-32 h-32 rounded-2xl overflow-hidden shadow-lg transform rotate-1 animate-float-fast"
          data-aos="fade-down-left"
          data-aos-delay="300"
        >
          <img 
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" 
            alt="Happy client" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Middle Left */}
        <div 
          className="hidden lg:block absolute top-60 left-20 w-36 h-32 rounded-2xl overflow-hidden shadow-lg transform rotate-2 animate-float-medium"
          data-aos="fade-right"
          data-aos-delay="150"
        >
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" 
            alt="Happy client" 
            className="w-full h-full object-cover"
          />
        </div>

        <div 
          className="hidden md:block absolute top-80 left-0 w-32 h-36 rounded-2xl overflow-hidden shadow-lg transform -rotate-1 animate-float-slow"
          data-aos="fade-right"
          data-aos-delay="250"
        >
          <img 
            src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face" 
            alt="Happy client" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Middle Right */}
        <div 
          className="hidden lg:block absolute top-52 right-24 w-32 h-32 rounded-2xl overflow-hidden shadow-lg transform -rotate-3 animate-float-fast"
          data-aos="fade-left"
          data-aos-delay="150"
        >
          <img 
            src="https://images.unsplash.com/photo-1521119989659-a83eee488004?w=150&h=150&fit=crop&crop=face" 
            alt="Happy client" 
            className="w-full h-full object-cover"
          />
        </div>

        <div 
          className="hidden md:block absolute top-72 right-4 w-28 h-32 rounded-2xl overflow-hidden shadow-lg transform rotate-2 animate-float-medium"
          data-aos="fade-left"
          data-aos-delay="250"
        >
          <img 
            src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face" 
            alt="Happy client" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom Area */}
        <div 
          className="hidden lg:block absolute bottom-20 left-60 w-32 h-32 rounded-2xl overflow-hidden shadow-lg transform rotate-1 animate-float-slow"
          data-aos="fade-up-right"
          data-aos-delay="200"
        >
          <img 
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face" 
            alt="Happy client" 
            className="w-full h-full object-cover"
          />
        </div>

        <div 
          className="hidden lg:block absolute bottom-16 right-60 w-36 h-32 rounded-2xl overflow-hidden shadow-lg transform -rotate-2 animate-float-fast"
          data-aos="fade-up-left"
          data-aos-delay="200"
        >
          <img 
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face" 
            alt="Happy client" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Mobile Images */}
        <div 
          className="md:hidden absolute top-4 left-4 w-20 h-24 rounded-xl overflow-hidden shadow-lg transform -rotate-3 animate-float-slow"
          data-aos="fade-down-right"
          data-aos-delay="100"
        >
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
            alt="Happy client" 
            className="w-full h-full object-cover"
          />
        </div>

        <div 
          className="md:hidden absolute top-6 right-4 w-22 h-20 rounded-xl overflow-hidden shadow-lg transform rotate-2 animate-float-medium"
          data-aos="fade-down-left"
          data-aos-delay="100"
        >
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
            alt="Happy client" 
            className="w-full h-full object-cover"
          />
        </div>

        <div 
          className="md:hidden absolute bottom-12 left-6 w-24 h-20 rounded-xl overflow-hidden shadow-lg transform rotate-1 animate-float-fast"
          data-aos="fade-up-right"
          data-aos-delay="150"
        >
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face" 
            alt="Happy client" 
            className="w-full h-full object-cover"
          />
        </div>

        <div 
          className="md:hidden absolute bottom-8 right-6 w-20 h-24 rounded-xl overflow-hidden shadow-lg transform -rotate-2 animate-float-medium"
          data-aos="fade-up-left"
          data-aos-delay="150"
        >
          <img 
            src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face" 
            alt="Happy client" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div 
          className="relative z-10 lg:top-52 flex flex-col items-center justify-center min-h-[70vh] md:min-h-[70vh] px-4"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {/* Testimonial Badge */}
          <div className="mb-6" data-aos="zoom-in" data-aos-delay="350">
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-full px-4 md:px-6 py-2">
              <span className="text-gray-700 font-medium text-xs md:text-sm">Testimonial</span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center max-w-4xl">
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 leading-tight mb-2 md:mb-3"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Trusted by Happy Clients Across
            </h1>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif leading-tight"
              data-aos="fade-up"
              data-aos-delay="450"
            >
              <span className="text-blue-600">Weddings</span> & <span className="text-orange-400">Corporate Events</span>
            </h2>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-20px) rotate(-1deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(2deg); }
          50% { transform: translateY(-15px) rotate(4deg); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-25px) rotate(1deg); }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default TestimonialsImageSection;