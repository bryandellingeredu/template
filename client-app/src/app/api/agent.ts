import axios, { AxiosResponse } from 'axios';
import { AppUser } from '../models/appUser';
import { store } from '../stores/stores';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use((config) => {
    const token = store.userStore.token;
    console.log("Token:", token);
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
  };

  const AppUsers = {
    login: () => requests.post<AppUser>('/appusers/login', {}),
  }

  
  const agent = {
    AppUsers
  }

  export default agent;