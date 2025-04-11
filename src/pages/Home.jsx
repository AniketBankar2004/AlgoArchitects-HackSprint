import React from "react";
import "../styling/home.css";
import { FileText, SearchCheck, Filter, BadgeCheck } from "lucide-react";
import Navbar from "./Navbar";
import ThemeToggle from "./ThemeToggle";

export default function Home() {
    

  return (
    <div className="homepage-container">
      {
      <Navbar />
      }
      <div className="hero-section">
        <h1 className="hero-title">
          AI-Powered <span className="highlight">Resume Screening</span>
        </h1>
        <p className="hero-subtitle">Upload resumes and match the best candidates with your job requirements using AI</p>
        <button className="cta-button">Upload Resume</button>
      </div>

      <section className="section">
        <h2 className="section-title">How It Works</h2>
        <div className="template-gallery">
          {[
            { title: "Upload", desc: "Upload PDF or DOC resumes." },
            { title: "Extract", desc: "We extract skills, education, and experience." },
            { title: "Match", desc: "Resumes are ranked against job descriptions." },
          ].map((step) => (
            <div key={step.title} className="template-card">
              <h3 className="template-title">{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="features-section">
        <FeatureCard icon={<FileText />} title="Resume Parsing" desc="Reads and parses resumes in PDF/DOC format." />
        <FeatureCard icon={<SearchCheck />} title="Smart Matching" desc="Ranks resumes based on job relevance." />
        <FeatureCard icon={<Filter />} title="Keyword Filtering" desc="Detects missing or matching keywords automatically." />
        <FeatureCard icon={<BadgeCheck />} title="Shortlist Recommendations" desc="Recommends top candidates instantly." />
      </section>
      <section className="section">
        <h2 className="section-title">Why Users Love It </h2>
        <div className="testimonial-box">
          <p className="testimonial-text">
            "This AI assistant helped us reduce resume screening time by 80%. It's a game-changer for hiring!!"
          </p>
        </div>
      </section>
      <section className="cta-section">
        <h2 className="cta-heading">Start Screening Smarter</h2>
        <button className="cta-button">Try Now</button>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-desc">{desc}</p>
      </div>
    </div>
  );
}
