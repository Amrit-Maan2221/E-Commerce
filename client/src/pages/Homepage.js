import React from 'react'
import HeroSection from '../components/HeroSection'
import Services from '../components/Services'
import Trusted from '../components/Trusted'

function Homepage() {
    const heroData = {
        name: "A-Plus",
        imageURL: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    }
  return (<>
     <HeroSection myData={heroData}/>
     <Services/>
     <Trusted/>
    </>
  )
}

export default Homepage