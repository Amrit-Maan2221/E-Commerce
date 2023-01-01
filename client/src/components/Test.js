import React, { useEffect } from 'react';
import './Test.scss';

function Hero() {
  useEffect(() => {
    const hero = document.querySelector('.hero');
    hero.classList.add('hero-fade-in');
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Introducing the new iPhone</h1>
        <p className="hero-description">
          The most powerful and advanced iPhone ever.
        </p>
        <button className="hero-button">Learn more</button>
      </div>
      <div className="hero-image">
        <img src="/images/iphone.png" alt="iPhone" />
      </div>
    </section>
  );
}

export default Hero;
