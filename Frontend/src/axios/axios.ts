import axios from 'axios';
const api = axios.create({
    baseURL: "http://localhost:5000/api/users",
    withCredentials:true
});

export default api;