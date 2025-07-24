import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TestimonialsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    // First set of 6 testimonials
    {
      id: 1,
      text: "CateringCart made our wedding reception absolutely perfect. From the food to the counter setups, everything was flawless.",
      rating: 4,
      author: "Anjali & Ramesh",
      role: "Wedding Couples",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=60&h=60&fit=crop&crop=faces",
      highlighted: false
    },
    {
      id: 2,
      text: "We hired CateringCart for a corporate event, and the service was beyond professional. Guests loved the elegant counter settings and food variety.",
      rating: 4,
      author: "Arun P.",
      role: "Event Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
      highlighted: true
    },
    {
      id: 3,
      text: "Outstanding catering service! The team was professional and the food quality exceeded our expectations for our anniversary celebration.",
      rating: 5,
      author: "Priya & Vikram",
      role: "Anniversary Couple",
      image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=60&h=60&fit=crop&crop=face",
      highlighted: false
    },
    {
      id: 4,
      text: "Excellent service for our company's annual meeting. The setup was elegant and the variety of dishes impressed all our clients.",
      rating: 4,
      author: "Sarah Johnson",
      role: "HR Manager",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1e1?w=60&h=60&fit=crop&crop=face",
      highlighted: false
    },
    {
      id: 5,
      text: "CateringCart delivered exceptional service for our engagement party. Every detail was perfectly executed and our guests were delighted.",
      rating: 5,
      author: "Rahul & Meera",
      role: "Engaged Couple",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      highlighted: false
    },
    {
      id: 6,
      text: "Professional catering service that made our product launch event memorable. Great food presentation and timely service.",
      rating: 4,
      author: "David Chen",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
      highlighted: false
    },
    // Second set of 6 testimonials
    {
      id: 7,
      text: "Amazing experience with CateringCart for our wedding. The team handled everything smoothly and the food was absolutely delicious.",
      rating: 5,
      author: "Kavya & Arjun",
      role: "Wedding Couple",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      highlighted: false
    },
    {
      id: 8,
      text: "Top-notch catering service for our conference. The variety and quality of food received excellent feedback from all attendees.",
      rating: 4,
      author: "Michael Rodriguez",
      role: "Event Coordinator",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=60&h=60&fit=crop&crop=face",
      highlighted: true
    },
    {
      id: 9,
      text: "CateringCart made our family reunion special with their excellent service and delicious traditional dishes. Highly recommended!",
      rating: 5,
      author: "Sunita Sharma",
      role: "Family Event Host",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face",
      highlighted: false
    },
    {
      id: 10,
      text: "Exceptional catering for our charity gala. The presentation was elegant and the service team was incredibly professional.",
      rating: 4,
      author: "Jennifer Davis",
      role: "Non-profit Director",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop&crop=face",
      highlighted: false
    },
    {
      id: 11,
      text: "Perfect catering service for our golden anniversary celebration. Every guest complimented the food and service quality.",
      rating: 5,
      author: "Ravi & Lakshmi",
      role: "Anniversary Couple",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face",
      highlighted: false
    },
    {
      id: 12,
      text: "Outstanding corporate catering service. CateringCart helped make our board meeting lunch impressive and memorable.",
      rating: 4,
      author: "Lisa Thompson",
      role: "Executive Assistant",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=60&h=60&fit=crop&crop=face",
      highlighted: false
    }
  ];

  // Calculate total number of slides (each slide shows 3 testimonials)
  const testimonialsPerSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / testimonialsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Get testimonials for current slide
  const getCurrentTestimonials = () => {
    const startIndex = currentSlide * testimonialsPerSlide;
    const endIndex = startIndex + testimonialsPerSlide;
    return testimonials.slice(startIndex, endIndex);
  };

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

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Navigation arrows */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Testimonials Grid - Reduced bottom margin */}
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 mb-2 min-h-[400px]">
          {getCurrentTestimonials().map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`p-6 rounded-lg transition-all duration-300 ${
                testimonial.highlighted
                  ? 'bg-blue-50 border-2 border-blue-300 shadow-lg'
                  : 'bg-white border border-gray-200 shadow-md'
              }`}
            >
              {/* Review text */}
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {testimonial.text}
              </p>

              {/* Star rating */}
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Author info */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    – {testimonial.author}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots - Added top margin for closer spacing */}
        <div className="flex justify-center space-x-2 mt-2">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentSlide
                  ? 'bg-blue-500'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}