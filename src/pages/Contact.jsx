import React, { useState } from 'react';
import '../styling/contact.css';

const teamMembers = {
  'Aniket Bankar': {
    email: 'aniket.bankar@resumeai.com',
    phone: '+91 99999 11111',
    address: '123 AI Street, Pune, India',
    github: 'https://github.com/aniketbankar',
  },
  'Aditya Birajdar': {
    email: 'aditya.birajdar@resumeai.com',
    phone: '+91 88888 22222',
    address: '456 Resume Road, Mumbai, India',
    github: 'https://github.com/adityabirajdar',
  },
  'Yuvraj Pawar': {
    email: 'yuvraj.pawar@resumeai.com',
    phone: '+91 77777 33333',
    address: '789 Dev Block, Nashik, India',
    github: 'https://github.com/yuvrajpawar',
  },
};

const Contact = () => {
  const [selectedMember, setSelectedMember] = useState('Aniket Bankar');
  const member = teamMembers[selectedMember];

  return (
    <div className="contact-page">
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <h3>Send a Message 😊</h3>
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" rows="4" required></textarea>
        <button type="submit">Send Message</button>
      </form>

      <h2>Contact Us</h2>

      <div className="dropdown-section">
        <label>Select a Team Member:</label>
        <select
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
        >
          {Object.keys(teamMembers).map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </div>

      <div className="contact-details">
        <p><strong>Email:</strong> {member.email}</p>
        <p><strong>Phone:</strong> {member.phone}</p>
        <p><strong>Address:</strong> {member.address}</p>
        <p>
          <strong>GitHub:</strong>{' '}
          <a href={member.github} target="_blank" rel="noreferrer">
            {member.github}
          </a>
        </p>
      </div>

      <footer className="footer">
        <p>© 2025 ResumeAI | Built with ❤️ by Team</p>
      </footer>
    </div>
  );
};

export default Contact;
