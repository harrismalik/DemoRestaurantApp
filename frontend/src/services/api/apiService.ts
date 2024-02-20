import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create();
axiosInstance.defaults.baseURL = 'https://test-rest.asfarelectronics.com/api'
// axiosInstance.defaults.baseURL = 'http://localhost:8000/api'

export default axiosInstance;
