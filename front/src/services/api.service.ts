import axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('API Error: ', error.response.data.message || error.message)
    } else {
      console.error('Network Error: ', error.message)
    }
    return Promise.reject(error)
  },
)

export default api
