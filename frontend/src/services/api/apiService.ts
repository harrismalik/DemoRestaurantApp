import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create();
axiosInstance.defaults.baseURL = process.env.ENV === 'production' ? 'https://url.com/api' : 'http://localhost:8000/api'

export default axiosInstance;
