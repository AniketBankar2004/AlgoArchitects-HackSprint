import React, { useState } from 'react'
import '../styling/resume.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { scanResumes } from '../services'

const Resume = () => {
  const [jobDesc, setJobDesc] = useState('')
  const [skill, setSkill] = useState('')
  const [skills, setSkills] = useState(['JavaScript', 'React', 'Node.js'])
  const [files, setFiles] = useState([])
  const [scanResults, setScanResults] = useState([])

  const removeSkill = (index) => {
    const updatedSkills = [...skills]
    updatedSkills.splice(index, 1)
    setSkills(updatedSkills)
  }

  const handleAddSkill = () => {
    if (skill.trim() !== '' && !skills.includes(skill)) {
      setSkills([...skills, skill])
      setSkill('')
    }
  }

  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)])
  }

  const removeFile = (index) => {
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setFiles(updatedFiles)
  }

  const handleScan = async () => {
    const formData = new FormData()
    files.forEach((file) => formData.append('files', file))
    formData.append('job_description', jobDesc)
    formData.append('skills', skills.join(','))

    try {
      const result = await scanResumes(formData)
      setScanResults(result) // store response in state
      console.log('Scan Result:', result)
    } catch (error) {
      console.error(error)
      alert('Scan failed.')
    }
  }

  return (
    <div className='resume-container'>
      <header>
        <h2>ResumeAI</h2>
        <div className='user-actions'>
          <span>👤 Account</span>
          <button className='logout'>↪ Logout</button>
        </div>
      </header>

      <section className='job-description'>
        <label>Job Description</label>
        <textarea
          placeholder='Enter the job description here...'
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
        />
      </section>

      <section className='skills'>
        <label>Required Skills</label>
        <div className='skill-tags'>
          {skills.map((s, i) => (
            <span key={i} className='tag'>
              {s}
              <button onClick={() => removeSkill(i)} className='remove-btn'>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </span>
          ))}
        </div>
        <div className='add-skill'>
          <input
            type='text'
            value={skill}
            placeholder='Add a skill...'
            onChange={(e) => setSkill(e.target.value)}
          />
          <button onClick={handleAddSkill}>+ Add</button>
        </div>
      </section>

      <section className='upload-section'>
        <label>Upload Resumes</label>
        <div className='upload-box'>
          <p>📤 Drag and drop your resumes here or click to browse</p>
          <input
            type='file'
            onChange={handleFileChange}
            multiple
            accept='.pdf,.doc,.docx'
            id='file-upload'
            style={{ display: 'none' }}
          />
          <button
            onClick={() => document.getElementById('file-upload').click()}
          >
            📁 Browse Files
          </button>
        </div>

        <div className='file-list'>
          {files.map((file, index) => (
            <div key={index} className='file-item'>
              📄 {file.name}
              <button onClick={() => removeFile(index)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className='scan-button'>
        <button onClick={handleScan}>🔍 Scan Resumes</button>
      </div>

      {scanResults.length > 0 && (
        <section className='results'>
          <h3>Top Matching Resumes</h3>
          <ul>
            {scanResults.map((res, i) => (
              <li key={i} className='result-item'>
                <strong>{res.filename}</strong>
                <br />
                Similarity Score: {res.score} <br />
                Matching Skills: {res.skill_count}
                <br />
                <div className='skill-match'>
                  {Object.entries(res.skills).map(([skill, present]) => (
                    <span
                      key={skill}
                      className={`skill-badge ${
                        present ? 'match' : 'no-match'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer>© 2025 ResumeAI. All rights reserved.</footer>
    </div>
  )
}

export default Resume
