import axios from 'axios'

const URl = 'http://localhost:5000/api'

const uploadManually = async (data) => {
  return await axios.post(`${URl}/manualupload`, data)
}

const uploadImage = async (data) => {
  return await axios.post(`${URl}/upload`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  })
}

const registerNewUser = async (data) => {
  console.log('Sending registration data:', data)
  return await axios.post(`${URl}/register`, data, {
    withCredentials: true,
  })
}

const scanResumes = async (formData) => {
  return await axios.post(`${URl}/scan`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  })
}

const logout = async () => {
  return await axios.post(`${URl}/logout`, {}, { withCredentials: true })
}

const login = async (data) => {
  try {
    const response = await axios.post(`${URl}/login`, data, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export {
  uploadManually,
  uploadImage,
  registerNewUser,
  logout,
  login,
  scanResumes,
}
