import React, { useEffect } from 'react';
import image from '../../../assets/bg-img.jpg';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS styles
import user5 from '../../../assets/Users/user1.png'
import user2 from '../../../assets/Users/user2.png';
import user3 from '../../../assets/Users/user3.png';
import user4 from '../../../assets/Users/user4.png';
import user1 from '../../../assets/Users/user5.png';


export default function LandigPageHero() {
    const navigate = useNavigate();

    // Initialize AOS when component mounts
    useEffect(() => {
        AOS.init({
            duration: 800, // Animation duration
            once: true, // Whether animation should happen only once
            easing: 'ease-in-out', // Easing type
        });
    }, []);

    const handleClick = () => {
        const phoneNumber = '917907005511';
        const whatsappURL = `https://wa.me/${phoneNumber}`;
        window.open(whatsappURL, '_blank');
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section
                className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${image})`,
                }}
            >
                {/* Black gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 z-0"></div>

                {/* Main Content */}
                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
                    <h1
                        className="text-3xl font-serif sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight"
                        data-aos="fade-down"
                        data-aos-delay="100"
                    >
                        CaterKart – Where Every
                        <br className="hidden sm:block" />
                        Event <span className="text-yellow-400">Becomes Special</span>
                    </h1>

                    {/* Yellow background text container */}
                    <div
                        className="relative mb-8 md:mb-12 mx-2 sm:mx-0"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-full sm:h-20 bg-black/30 backdrop-blur-sm transform -rotate-1 rounded-full"></div>
                        </div>
                        <p className="relative font-serif text-base sm:text-lg md:text-xl text-white font-medium px-6 py-3 sm:px-8 sm:py-4 leading-relaxed">
                            From premium catering to valet and hosting staff, we bring flawless execution and unforgettable experiences for your events.
                        </p>
                    </div>


                    {/* Buttons */}
                    <div
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 md:mb-12 w-full px-4"
                        data-aos="zoom-in"
                        data-aos-delay="300"
                    >
                        <button
                            onClick={handleClick}
                            style={{ backgroundColor: "#0A58A3" }}
                            className="w-full font-serif sm:w-auto cursor-pointer text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Plan your event →
                        </button>
                        <button
                            onClick={handleClick}
                            className="w-full font-serif cursor-pointer sm:w-auto border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Join our team →
                        </button>
                    </div>

                    {/* Trusted by section */}
                    <div
                        className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 px-4"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        <div className="flex -space-x-3">
                            {[user1, user2, user3, user4, user5].map((img, index) => (
                                <div
                                    key={index}
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white overflow-hidden"
                                    data-aos="zoom-in"
                                    data-aos-delay={500 + index * 100}
                                >
                                    <img
                                        src={img}
                                        alt={`User ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                        <p className="text-white font-serif font-medium text-base sm:text-lg">
                            100+ people trust us
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}