import React from 'react'
import LandingHeader from '../Components/Header'
import LandigPageHero from '../Components/Home/HeroSection'
import ServicesSection from '../Components/Home/CardSection'
import StatsTestimonialSection from '../Components/Home/StatsTestimonials'
import TestimonialSection from '../Components/Home/Testimonials'
import AboutCaterkart from '../Components/Home/AboutUs'
import ContactSection from '../Components/Home/ContactUs'
import GallerySlider from '../Components/Home/Gallery'
import Footer from '../Components/Footer'
import TestimonialsImageSection from '../Components/Home/TestimonialsImages'

function LandingHome() {
    return (
        <div  className="pt-[72px]">
            <LandingHeader></LandingHeader>
            <section id="home">
                <LandigPageHero />
            </section>

            <section >
                <ServicesSection />
            </section>
 <section id="about"><AboutCaterkart></AboutCaterkart></section>
            <StatsTestimonialSection></StatsTestimonialSection>
           <section id='gallery'> <GallerySlider></GallerySlider></section>
            <TestimonialsImageSection></TestimonialsImageSection>
            <TestimonialSection></TestimonialSection>
           
            
            <section id="contact"><ContactSection></ContactSection></section>
            <Footer></Footer>
        </div>
    )
}

export default LandingHome