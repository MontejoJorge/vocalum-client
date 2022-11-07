import { defineStore } from 'pinia';
import api from './services/axios';
import { getToken, setToken, removeToken } from '../util/auth';
import router from '../router';

export const useUserStore = defineStore('user', {
  state: () => ({
    name: undefined,
    surname: undefined,
    email: undefined,
    phone: undefined,
    google: undefined,
    token: getToken(),
  }),
  getters: {},
  actions: {
    login(email, password) {
      return new Promise(async (resolve, reject) => {
        await api
          .post('/auth/login', {
            email,
            password,
          })
          .then((res) => {
            this.token = res.data.token;
            setToken(this.token);
            this.fetchUser();
            resolve();
          })
          .catch((err) => reject(err.response.data));
      });
    },
    register({ name, surname, email, phone, password, password_confirmation }) {
      return new Promise(async (resolve, reject) => {
        await api
          .post('/auth/register', {
            name,
            surname,
            email,
            phone,
            password,
            password_confirmation,
          })
          .then((res) => {
            this.token = res.data.token;
            setToken(this.token);
            this.fetchUser();
            resolve();
          })
          .catch((err) => reject(err.response.data));
      });
    },
    googleAuth(token) {
      return new Promise(async (resolve, reject) => {
        await api
          .post('/auth/google', {
            google_token: token,
          })
          .then((res) => {
            this.token = res.data.token;
            setToken(this.token);
            this.fetchUser();
            resolve();
          })
          .catch((err) => reject(err.response.data));
      });
    },
    update({ name, surname, email, phone }) {
      return new Promise(async (resolve, reject) => {
        await api
          .post('/user', {
            name,
            surname,
            email,
            phone,
          })
          .then((res) => {
            this.fetchUser();
            resolve();
          })
          .catch((err) => reject(err.response.data));
      });
    },
    fetchUser() {
      return new Promise(async (resolve, reject) => {
        await api
          .get('/user')
          .then((res) => {
            const { name, surname, email, phone, google } = res.data;
            this.name = name;
            this.surname = surname;
            this.email = email;
            this.phone = phone;
            this.google = google;
            resolve();
          })
          .catch((err) => {
            this.logOut();
            reject(err.response.data);
          });
      });
    },
    logOut() {
      removeToken();
      this.name = undefined;
      this.surname = undefined;
      this.email = undefined;
      this.phone = undefined;
      this.token = undefined;
      router.push({ path: '/' });
    },
  },
});
