import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { LocalStorageVariable } from '../enums/localStorageVariable';
import {
  deleteAccessToken,
  getLocalStorageItem,
  setAccessToken,
} from '../services/localStorageService';
import { toast } from "react-toastify";

const baseApi = process.env.REACT_APP_API_URL;
const prefixApi = process.env.REACT_APP_PREFIX;

const axiosApiInstance = axios.create({
  baseURL: `${baseApi}${prefixApi}`,
  withCredentials: true,
});

const axiosRefresh = axios.create({
  baseURL: `${baseApi}${prefixApi}`,
  withCredentials: true,
});

axiosApiInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (getLocalStorageItem(LocalStorageVariable.accessToken)) {
      config.headers['Authorization'] = `Bearer ${getLocalStorageItem(
        LocalStorageVariable.accessToken,
      )}`;
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
    if (!!config.data.accessToken) {
      setAccessToken(config.data.accessToken);
    }
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response: AxiosResponse = await axiosRefresh.get<
          AxiosResponse<Tokens>
        >(`/auth/refresh`, { withCredentials: true });
        setAccessToken(response.data.accessToken);
        if (response.status === 401) {
          deleteAccessToken();
        }
        return axiosApiInstance.request(originalRequest);
      } catch (error:any) {
        toast.error(error.response.data.message);
      }
    }
    throw error;
  },
);

export default axiosApiInstance;
