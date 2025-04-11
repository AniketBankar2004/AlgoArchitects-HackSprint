import React from 'react';
import '../styling/about.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>📄 ResumeAI - Your Smart Resume Screener</h1>
      <p>
        ResumeAI is a web-based AI assistant that streamlines the resume screening process by
        automatically analyzing and ranking resumes based on job requirements.
      </p>

      <section>
        <h2>✨ Key Features</h2>
        <ul>
          <li>Upload resumes in PDF or DOC/DOCX format</li>
          <li>Extracts key details: Skills, Education, Experience</li>
          <li>Ranks candidates based on job description</li>
          <li>Displays required and matched skills</li>
          <li>Simple, clean, and responsive UI</li>
        </ul>
      </section>

      <section>
        <h2>🛠 Technologies Used</h2>
        <ul>
          <li>React.js (Frontend)</li>
          <li>Node.js & Express (Backend)</li>
          <li>Python or AI API (for Resume Parsing & Ranking)</li>
          <li>File Upload with PDF/DOC support</li>
          <li>CSS & GSAP for styling and animations</li>
        </ul>
      </section>

      <section>
        <h2>🧠 How It Works</h2>
        <ol>
          <li>User uploads multiple resumes</li>
          <li>Job description & required skills are provided</li>
          <li>System parses each resume using AI models</li>
          <li>It compares resume data to job requirements</li>
          <li>Candidates are ranked based on best match</li>
        </ol>
      </section>

      <section>
        <h2>🚀 Future Improvements</h2>
        <ul>
          <li>Support for OCR (scanned resume reading)</li>
          <li>Machine learning based ranking refinement</li>
          <li>Admin dashboard for hiring teams</li>
          <li>Download shortlisted resume summary</li>
          <li>Integration with LinkedIn/ATS platforms</li>
        </ul>
      </section>

      <footer>
        <p>© 2025 ResumeAI. Built with ❤️ to simplify hiring.</p>
      </footer>
    </div>
  );
};

export default About;
