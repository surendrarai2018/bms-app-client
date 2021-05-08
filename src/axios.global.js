import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9090/'
});
axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');

// 
// 401 // dispatch(logout())
// 
export default axiosInstance;