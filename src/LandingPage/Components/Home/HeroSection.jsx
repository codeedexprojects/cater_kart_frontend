import React from 'react';
import image from '../../../assets/bg-img.jpg';
import { useNavigate } from 'react-router-dom';

export default function LandigPageHero() {
    const navigate = useNavigate();

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
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight">
                        CaterKart – Where Every
                        <br className="hidden sm:block" />
                        Event <span className="text-yellow-400">Becomes Special</span>
                    </h1>

                    {/* Yellow background text container - improved for mobile */}
                    <div className="relative mb-8 md:mb-12 mx-2 sm:mx-0">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-full sm:h-20 bg-yellow-400 transform -rotate-1 rounded-full opacity-90"></div>
                        </div>
                        <p className="relative text-base sm:text-lg md:text-xl text-black font-medium px-6 py-3 sm:px-8 sm:py-4 leading-relaxed">
                            From premium catering to valet and hosting staff, we bring flawless execution and unforgettable experiences for your events.
                        </p>
                    </div>

                    {/* Buttons - stacked on mobile */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 md:mb-12 w-full px-4">
                        <button 
                            onClick={handleClick} 
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Plan your event →
                        </button>
                        <button 
                            onClick={handleClick} 
                            className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Join our team →
                        </button>
                    </div>

                    {/* Trusted by section */}
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 px-4">
                        <div className="flex -space-x-3">
                            {['A', 'B', 'C', 'D', 'E'].map((letter, index) => (
                                <div 
                                    key={index}
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r border-2 border-white flex items-center justify-center"
                                    style={{
                                        background: index === 0 ? 'linear-gradient(to right, #ec4899, #ef4444)' :
                                                  index === 1 ? 'linear-gradient(to right, #60a5fa, #a855f7)' :
                                                  index === 2 ? 'linear-gradient(to right, #4ade80, #3b82f6)' :
                                                  index === 3 ? 'linear-gradient(to right, #f59e0b, #f97316)' :
                                                  'linear-gradient(to right, #a855f7, #ec4899)'
                                    }}
                                >
                                    <span className="text-white font-bold text-xs sm:text-sm">{letter}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-white font-medium text-base sm:text-lg">
                            100+ people trust us
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}