import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/'
});
console.log()
axiosInstance.defaults.headers.common['Authorization'] = localStorage.getItem('token');

// 
// 401 // dispatch(logout())
// 
export default axiosInstance;