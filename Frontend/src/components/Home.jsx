import React from 'react'
import Hero from './Hero'
import FeaturedDestination from './FeaturedDestination'
import ExclusiveOffers from './ExclusiveOffers'
import Testimonial from './Testimonial'
import NewsLetter from './NewsLetter'
import RecommendedHotels from './RecommendedHotel'

const Home = () => {
  return (
    <>
        <Hero/>
        <RecommendedHotels/>
        <FeaturedDestination/>
        <ExclusiveOffers/>
        <Testimonial/>
        <NewsLetter/>
    </>
  )
}

export default Home