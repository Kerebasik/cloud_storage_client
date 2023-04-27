import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const baseApi = process.env.REACT_APP_API_URL;
const prefixApi = process.env.REACT_APP_PREFIX;

const axiosApiInstance = axios.create({
  baseURL: `${baseApi}${prefixApi}`,
  withCredentials: true,
});

axiosApiInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (localStorage.getItem('token')) {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

axiosApiInstance.interceptors.response.use(
  (config: AxiosResponse) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response: AxiosResponse = await axios.get<AxiosResponse<Tokens>>('/auth/refresh', { withCredentials: true });
        localStorage.setItem('token', response.data.accessToken);
        return axiosApiInstance.request(originalRequest);
      } catch (e) {
        console.log(error.response.message)
      }
    }

    throw error;
  },
);

export default axiosApiInstance;
