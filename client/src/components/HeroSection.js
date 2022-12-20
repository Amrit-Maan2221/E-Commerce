import React from 'react';
import { NavLink } from 'react-router-dom';

function HeroSection({myData}) {
    const { name, imageURL } = myData;
  return (
    <section id="hero-section">
    <div className="container">
      <div className="grid grid-two-column">
        <div className="hero-section-data">
          <p className="intro-data">Welcome to </p>
          <h1> {name} </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            atque temporibus veniam doloribus libero ad error omnis voluptates
            animi! Suscipit sapiente.
          </p>
          <NavLink>
            <button className='btn'>show now</button>
          </NavLink>
        </div>
        {/* our homepage image  */}
        <div className="hero-section-image">
          <figure>
            <img
              src={imageURL}
              alt="hero-section-photo"
              className="img-style"
            />
          </figure>
        </div>
      </div>
    </div>
  </section>
  )
}

export default HeroSection