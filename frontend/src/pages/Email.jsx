import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';

const Contact = () => {
  const [selectedMember, setSelectedMember] = useState('Aniket Bankar');
  const [formStatus, setFormStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_12345',
      'template_67890',
      e.target,
      'public_abcXYZ'
    )
    .then(
      (result) => {
        setFormStatus('Message sent successfully!');
        e.target.reset();
      },
      (error) => {
        setFormStatus('Something went wrong. Please try again.');
      }
    );
  };

  return (
    <div className="contact-page">

      <form className="contact-form" onSubmit={sendEmail}>
        <h3>Send a Message</h3>
        <input type="text" name="from_name" placeholder="Your Name" required />
        <input type="email" name="from_email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" rows="4" required></textarea>
        <button type="submit">Send Message</button>
        {formStatus && <p className="form-status">{formStatus}</p>}
      </form>
    </div>
  );
};

export default Contact;
