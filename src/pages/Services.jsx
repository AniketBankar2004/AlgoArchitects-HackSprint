import React from 'react';
import '../styling/Services.css';

const servicesData = [
  {
    title: 'Resume Parsing',
    description: 'Reads and parses resumes in PDF/DOC format to extract data.',
    icon: '📄',
  },
  {
    title: 'Skill & Experience Extraction',
    description: 'Extracts skills, education, and experience with AI.',
    icon: '🧠',
  },
  {
    title: 'Job Matching',
    description: 'Ranks resumes based on relevance to job descriptions.',
    icon: '🎯',
  },
  {
    title: 'Keyword Filtering',
    description: 'Detects missing or matching keywords automatically.',
    icon: '🔍',
  },
  {
    title: 'Smart Recommendations',
    description: 'Recommends top candidates instantly.',
    icon: '⭐',
  },
];

const Services = () => {
  return (
    <section className="services" id="services">
      <h2 className="services-title">Our Services</h2>
      <div className="services-grid">
        {servicesData.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;

