import React, { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    eventDetails: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  
 
  const message = `New Inquiry from Caterkart:
  
*Name:* ${formData.firstName} ${formData.lastName}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Event Details:* ${formData.eventDetails}`;

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Construct WhatsApp URL with the phone number and message
  const whatsappUrl = `https://wa.me/917907005511?text=${encodedMessage}`;
  
  // Open the URL in a new tab
  window.open(whatsappUrl, '_blank');
  
  // Reset the form if needed
  setFormData({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    eventDetails: ''
  });
};

  return (
    <div className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
            <span className="text-gray-600 font-medium text-lg md:text-xl font-serif">Contact us</span>
            
          </div>
          
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Heading */}
            <h2 className="font-serif text-4xl md:text-5xl font-light text-orange-500 leading-tight mb-8">
              Let's plan something unforgettable!
            </h2>

            <p className="text-blue-600 text-sm mb-8 font-serif">
              We'll get back to you within 24 hours. Let's create a flawless event together!
            </p>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h4 className="text-gray-600 font-medium mb-2 font-serif">Phone:</h4>
                <a href="tel:+919876543210" className="text-blue-600 hover:underline font-serif">
                  +91 7907005511
                </a>
              </div>

              <div>
                <h4 className="text-gray-600 font-medium mb-2 font-serif">Email:</h4>
                <a href="mailto:hello@cateringkart.com" className="font-serif text-blue-600 hover:underline">
                  hello@caterkart.com
                </a>
              </div>

              <div>
                <h4 className="text-gray-600 font-medium mb-2 font-serif">Office:</h4>
                <div className="text-blue-600 font-serif">
                  <p>Cateringkart HQ,</p>
                  <p>Cherpulassery, Kerala, India</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8">
              <div className="w-full h-48 bg-gray-300 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15642.736472315834!2d76.31089!3d10.87463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ee15ed42d1dd%3A0x8a405ca67d5f6d4e!2sCherpulassery%2C%20Kerala!5e0!3m2!1sen!2sin!4v1642435234567!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="CateringCart Office Location"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            {/* Have an event section with arrow */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-0.5 bg-blue-500 mr-2"></div>
                <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              
              <p className="text-gray-600 text-lg font-serif">
                Have an event in mind? We'd love to hear from you! Whether it's a wedding, a corporate gathering, or a private celebration, our team at CateringCart is ready to bring your vision to life.
              </p>
            </div>

            {/* Contact Form */}
            <div className="bg-blue-700 rounded-lg p-8">
              <h3 className="text-white text-2xl font-medium mb-8 font-serif">Contact</h3>
            
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="font-serif w-full bg-transparent border-b border-blue-300 text-white placeholder-blue-200 pb-2 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="font-serif w-full bg-transparent border-b border-blue-300 text-white placeholder-blue-200 pb-2 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="font-serif w-full bg-transparent border-b border-blue-300 text-white placeholder-blue-200 pb-2 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="font-serif w-full bg-transparent border-b border-blue-300 text-white placeholder-blue-200 pb-2 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Event Details */}
              <div>
                <textarea
                  name="eventDetails"
                  placeholder="Event details"
                  value={formData.eventDetails}
                  onChange={handleInputChange}
                  rows={6}
                  className="font-serif w-full bg-transparent border-b border-blue-300 text-white placeholder-blue-200 pb-2 focus:outline-none focus:border-white transition-colors resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="font-serif w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 mt-8"
              >
                Send Your Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactSection;
