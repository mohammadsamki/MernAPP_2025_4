import axios from "axios";


const api  = axios.create({
    baseURL : "http://localhost:5004/api",
    timeout : 15000,
})
// login interceptor to add token to headers
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['auth'] = token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
