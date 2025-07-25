import { ChefHat, Users, UserCheck, Car, Shield, Utensils, ArrowRight } from "lucide-react";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ServiceSection() {
  const services = [
    {
      title: "Catering Management",
      icon: ChefHat,
      description:
        "Our well-trained service boys ensure smooth food service, timely assistance, and a pleasant dining experience for all your guests. We focus on hospitality with professionalism and care.",
    },
    {
      title: "Service Boys",
      icon: Users,
      description:
        "Our well-trained service boys ensure smooth food service, timely assistance, and a pleasant dining experience for all your guests. We focus on hospitality with professionalism and care.",
    },
    {
      title: "Hosting Staffs",
      icon: UserCheck,
      description:
        "Our hosting staff adds warmth and elegance to your events by greeting guests and ensuring every detail is managed seamlessly. We create a welcoming atmosphere for all occasions.",
    },
    {
      title: "Valet Parking",
      icon: Car,
      description:
        "We offer reliable valet parking services to ensure your guests enjoy convenience from the moment they arrive. Our trained valet staff manages vehicles with the utmost care.",
    },
    {
      title: "Security Services",
      icon: Shield,
      description:
        "Safety is our priority. We provide professional security personnel to monitor and protect your event, ensuring a secure and worry-free experience for you and your guests.",
    },
    {
      title: "Counter Settings",
      icon: Utensils,
      description:
        "Our beautifully designed counters are tailored to match your event theme. From décor to presentation, we create eye-catching setups that enhance the overall event experience.",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-3 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div 
          className="flex items-center justify-center gap-2 mb-6"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
          <span className="text-gray-600 font-medium text-lg md:text-xl font-serif">What we do</span>
        </div>
        <h1 
          className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          Crafting Experiences Beyond
          <br />
          Catering
        </h1>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:bg-[#E19F17]"
              data-aos="fade-up"
              data-aos-delay={200 + (index * 100)} // Staggered delay
              data-aos-anchor-placement="top-bottom"
            >
              {/* Icon and Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <IconComponent className="w-8 h-8 text-orange-400 group-hover:text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-serif font-semibold text-gray-900 group-hover:text-white leading-tight">
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-600 font-serif group-hover:text-white text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              
            </div>
          );
        })}
      </div>
    </div>
  );
}