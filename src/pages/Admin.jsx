import React from "react";

const About = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">About Traffic Offense Manager</h1>
      
      <section className="about-section mb-4">
        <h2 className="h3">What the System is About</h2>
        <p>
          Traffic Offense Manager is designed to simplify the process of logging
          and managing traffic offenses. It captures details about offenses,
          assigns penalty points, and calculates fines dynamically based on the
          offense severity. The system aims to ensure transparency, efficiency,
          and fairness in managing traffic violations.
        </p>
      </section>
      
      <section className="about-section mb-4">
        <h2 className="h3">How the Point Multiplier Works</h2>
        <p>
          The point multiplier system assigns penalty points based on the
          severity of an offense. Repeat offenders are subjected to higher fines
          as their points accumulate. Over time, points decay if no further
          offenses are committed, encouraging better driving behavior. The
          system adjusts fines using a multiplier, ensuring that
          offenders are penalized fairly.
        </p>
      </section>

      <div className="text-center">
        <button className="btn btn-primary">Learn More</button>
      </div>
    </div>
  );
};

export default About;
