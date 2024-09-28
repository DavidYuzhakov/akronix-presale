import axios from "axios";

const instance = axios.create({
  baseURL: 'https://socket.akronix.io'
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token && config.headers) {
    config.headers.authorization = `Bearer ${token}`
  }

  return config
})

export default instance