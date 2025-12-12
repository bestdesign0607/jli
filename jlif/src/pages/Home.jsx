import React from 'react'
import Hero from '../components/Hero'
import FeaturesSection from '../components/FeaturesSection'
import SupportSection from '../components/SupportSection'
import ClientStories from '../components/ClientStories'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <hr />
        <FeaturesSection />
        <hr />
        <SupportSection />
        <ClientStories />
        <CallToAction />
        <Footer />
    </div>
  )
}

export default Home