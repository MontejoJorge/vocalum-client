import axios from 'axios';

import { useUserStore } from '../user';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const userStore = useUserStore();
  config.headers = {
    'x-auth-token': userStore.token,
    'content-type': 'multipart/form-data',
  };
  return config;
});

export default api;
