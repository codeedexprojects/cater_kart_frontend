import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

export default function EventLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
            <span className="text-gray-600 font-medium">Why choose us</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-gray-900 leading-tight">
            We Turn Every Occasion<br />
            Into a Signature Experience.
          </h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Seamless Service */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Seamless Service</h2>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Every event we manage is designed to bring elegance, efficiency, and unforgettable memories.
            </p>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our dedicated team has successfully catered hundreds of events with flawless execution and attention to detail.
            </p>
            
            {/* Stats */}
            <div className="space-y-6">
              <div>
                <div className="text-4xl font-bold text-orange-400 mb-2">500+</div>
                <p className="text-gray-600">successful events organized</p>
              </div>
              
              <div>
                <div className="text-4xl font-bold text-orange-400 mb-2">95%</div>
                <p className="text-gray-600">
                  Clients report 95% satisfaction rates with our premium catering and service teams.
                </p>
              </div>
            </div>
          </div>

          {/* Center Column - Image */}
          <div className="lg:col-span-1">
            <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Professional catering service" 
                className="w-full h-96 lg:h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Client Stats */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="mb-8">
              <div className="text-4xl font-bold text-orange-400 mb-4">85%</div>
              <p className="text-gray-600 leading-relaxed">
                Client retention due to exceptional quality, premium setups, and dedicated staff.
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Client Approved</h3>
              <p className="text-gray-600 leading-relaxed">
                Recognized for reliability and quality, with glowing reviews from families, corporates, and wedding planners.
              </p>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-4xl font-bold text-orange-400">4.9</span>
                <Star className="w-8 h-8 text-orange-400 fill-current" />
              </div>
              <p className="text-gray-600">average client rating</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 flex items-center gap-3 mx-auto">
            Explore Our Event Packages
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}