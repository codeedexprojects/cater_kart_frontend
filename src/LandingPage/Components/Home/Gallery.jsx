import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import image from '../../../assets/about1.jpg'
import hostingStaff from '../../../assets/hosting-staff.jpg'
import cateringManagement from '../../../assets/bg-img.jpg'
import security from '../../../assets/security.jpg'

const GallerySlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const galleryItems = [
    {
      id: 1,
      image: security,
      title: "Security Guards",
      position: "left"
    },
    {
      id: 2,
      image: hostingStaff,
      title: "Hosting Staffs",
      position: "left-center"
    },
    {
      id: 3,
      image: cateringManagement,
      title: "Catering Management",
      position: "center"
    },
    {
      id: 4,
      image: image,
      title: "Valet parking",
      position: "right-center"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      title: "Counter Setup",
      position: "right"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  // Auto-advance slider every 4 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, []);

  const getItemPosition = (index) => {
    const position = (index - currentSlide + galleryItems.length) % galleryItems.length;
    
    switch (position) {
      case 0:
        return 'translate-x-[-120%] scale-75 opacity-60 z-10';
      case 1:
        return 'translate-x-[-60%] scale-85 opacity-80 z-20';
      case 2:
        return 'translate-x-0 scale-100 opacity-100 z-30';
      case 3:
        return 'translate-x-[60%] scale-85 opacity-80 z-20';
      case 4:
        return 'translate-x-[120%] scale-75 opacity-60 z-10';
      default:
        return 'translate-x-[200%] scale-50 opacity-0 z-0';
    }
  };

  const getItemTitle = (index) => {
    const position = (index - currentSlide + galleryItems.length) % galleryItems.length;
    return position === 2 ? galleryItems[index].title : '';
  };

  return (
    <div className="bg-gray-100 py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
            <span className="text-gray-600 font-medium text-lg md:text-xl font-serif">Gallery</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
            Our Work Speaks for Itself.
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-serif">
            Explore photos of our premium catering setups, elegant counter designs, and happy clients.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Main Gallery */}
          <div className="relative h-96 flex items-center justify-center">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className={`absolute transition-all duration-700 ease-in-out ${getItemPosition(index)}`}
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`rounded-lg shadow-lg object-cover ${
                      (index - currentSlide + galleryItems.length) % galleryItems.length === 2
                        ? 'w-96 h-72'
                        : 'w-80 h-60'
                    }`}
                  />
                  
                  {/* Title overlay for center image */}
                  {getItemTitle(index) && (
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-70 text-white p-4 rounded-b-lg">
                      <h3 className="text-xl text-black font-medium text-center font-serif">{getItemTitle(index)}</h3>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2  p-3   transition-shadow duration-300 z-40"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2  p-3   transition-shadow duration-300 z-40"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center  space-x-3">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentSlide ? 'bg-orange-500' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default GallerySlider;