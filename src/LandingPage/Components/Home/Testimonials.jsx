import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  const testimonials = [
    {
      id: 1,
      text: "CateringCart made our wedding reception absolutely perfect. From the food to the counter setups, everything was flawless.",
      name: "Anjali & Ramesh",
      role: "Wedding Couples",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      rating: 4
    },
    {
      id: 2,
      text: "We hired CateringCart for a corporate event, and the service was beyond professional. Guests loved the elegant counter settings and food variety.",
      name: "Arun P.",
      role: "Event Manager",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 4
    },
    {
      id: 3,
      text: "CateringCart made our wedding reception absolutely perfect. From the food to the counter setups, everything was flawless.",
      name: "Anjali & Ramesh",
      role: "Wedding Couples",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 4
    },
    {
      id: 4,
      text: "The attention to detail and quality of service exceeded our expectations. Our guests are still talking about the amazing food!",
      name: "Priya S.",
      role: "Corporate Event Planner",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5a9?w=100&h=100&fit=crop&crop=face",
      rating: 4
    },
    {
      id: 5,
      text: "Professional setup, delicious food, and excellent service. CateringCart made our anniversary celebration memorable.",
      name: "Ravi & Meera",
      role: "Anniversary Celebration",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 4
    },
    {
      id: 6,
      text: "Outstanding catering service with a wide variety of menu options. The team was incredibly helpful and accommodating.",
      name: "Karthik M.",
      role: "Birthday Party Host",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      rating: 4
    }
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const cardsPerSlide = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(testimonials.length / cardsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  useEffect(() => {
    setCurrentSlide(0);
  }, [isMobile]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const getCurrentSlideTestimonials = () => {
    const startIndex = currentSlide * cardsPerSlide;
    return testimonials.slice(startIndex, startIndex + cardsPerSlide);
  };

  return (
    <div className="w-full px-2 py-12 bg-gray-50 overflow-hidden" data-aos="fade-up">
      <div className="relative">
        <div className="overflow-hidden">
          <div className="transition-all duration-500 ease-in-out">
            <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-3'}`}>
              {getCurrentSlideTestimonials().map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className="bg-white rounded-lg shadow-sm p-6 h-full flex flex-col"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex justify-start mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="font-serif text-gray-700 text-sm leading-relaxed mb-6 flex-grow">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-3"
                      data-aos="zoom-in"
                      data-aos-delay={index * 100 + 200}
                    />
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm font-serif">– {testimonial.name}</h4>
                      <p className="text-gray-600 text-xs font-serif">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {totalSlides > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10"
              aria-label="Previous testimonials"
              data-aos="fade-right"
            >
              <ChevronLeft className="w-8 h-8 text-gray-600 hover:text-gray-800 transition-colors" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
              aria-label="Next testimonials"
              data-aos="fade-left"
            >
              <ChevronRight className="w-8 h-8 text-gray-600 hover:text-gray-800 transition-colors" />
            </button>
          </>
        )}

        {totalSlides > 1 && (
          <div className="flex justify-center mt-8 space-x-2" data-aos="fade-up">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? 'bg-gray-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialSlider;