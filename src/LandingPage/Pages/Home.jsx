import React from 'react'
import LandingHeader from '../Components/Header'
import LandigPageHero from '../Components/Home/HeroSection'
import ServicesSection from '../Components/Home/CardSection'
import StatsTestimonialSection from '../Components/Home/StatsTestimonials'
import TestimonialSection from '../Components/Home/Testimonials'

function LandingHome() {
    return (
        <div  className="pt-[72px]">
            <LandingHeader></LandingHeader>
            <section id="home">
                <LandigPageHero />
            </section>

            <section id="about">
                <ServicesSection />
            </section>

            {/* <StatsTestimonialSection></StatsTestimonialSection>
            <TestimonialSection></TestimonialSection> */}
        </div>
    )
}

export default LandingHome