const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('./userschema')
const axios = require('axios')
require('dotenv').config()
const multer = require('multer')

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.status(401).json({ msg: 'Unauthorized' })
}

router.post('/logout', async (req, res) => {
  try {
    req.logOut((err) => {
      if (err) return res.status(500).json({ msg: 'Logout failed' })
      res.json({ msg: 'Logged out successfully' })
    })
  } catch (error) {}
})

router.post('/register', async (req, res) => {
  const { username, password, confirmpassword } = req.body

  const existinguser = await User.findOne({ username })
  if (existinguser) {
    return res.status(403).json({ msg: 'User already exists' })
  }

  const hashedpassword = await bcrypt.hash(password, 10)

  const new_user = new User({
    username,
    password: hashedpassword,
  })

  await new_user.save()
  res.status(200).json({ msg: 'User registered successfully' })
})

router.post('/login', isAuth, (req, res) => {
  res.json({ msg: 'Logged in successfully' })
})

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ]

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only PDF, Word, or Text files are allowed!'), false)
    }
  },
})

const FormData = require('form-data')

router.post('/upload', upload.array('files'), async (req, res) => {
  const { job_description, skills } = req.body

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded.' })
  }

  try {
    const formData = new FormData()

    // Append each PDF
    req.files.forEach((file, index) => {
      formData.append('files', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      })
    })

    // Append text fields
    formData.append('job_description', job_description)
    formData.append('skills', skills)

    const flaskResponse = await axios.post(
      'http://127.0.0.1:5000/upload',
      formData,
      {
        headers: formData.getHeaders(),
      }
    )

    res.json(flaskResponse.data)
  } catch (error) {
    console.error('Error uploading files:', error)
    res.status(500).json({ error: 'Upload failed', details: error.message })
  }
})

module.exports = router
