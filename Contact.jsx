import React from "react";

const Contact = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Contact Us</h1>
      
      <section className="contact-section mb-4">
        <h2 className="h3">Get in Touch</h2>
        <p>
          If you have any questions or need assistance, please feel free to reach out to us. We are here to help you.
        </p>
      </section>
      
      <section className="contact-section mb-4">
        <h2 className="h3">Contact Information</h2>
        <ul className="list-unstyled">
          <li>
            <strong>Email:</strong> support@trafficoffense.com
          </li>
          <li>
            <strong>Phone:</strong> +263 080 123 456
          </li>
          <li>
            <strong>Address:</strong> 123 Traffic Ave, Harare, Zimbabwe
          </li>
        </ul>
      </section>

      <section className="contact-section mb-4">
        <h2 className="h3">Send Us a Message</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input type="email" className="form-control" id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Your Message</label>
            <textarea className="form-control" id="message" rows="4" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </section>

      <div className="text-center">
        <button className="btn btn-secondary" onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Contact;
