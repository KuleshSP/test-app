import axios, {AxiosError, AxiosInstance, AxiosResponse} from 'axios';

export const instance: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

(function createAxiosInterceptor() {
  instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => Promise.reject(error?.response?.data || error.toString()),
  );
})();
