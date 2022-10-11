import { defineStore } from 'pinia';
import api from './services/axios';
import { getToken, setToken, removeToken } from '../util/auth';

export const useUserStore = defineStore('user', {
  state: () => ({
    name: undefined,
    surname: undefined,
    email: undefined,
    phone: undefined,
    token: getToken()
  }),
  getters: {},
  actions: {
    login(email, password) {
      return new Promise(async (resolve, reject) => {
        await api.post('/auth/login', {
          email,
          password
        })
        .then(res => {
          this.token = res.data.token;
          setToken(this.token);
          this.fetchUser();
          resolve();
        }).catch(err => reject(err.response.data.message));

      })
    },
    register({name, surname, email, phone, password}) {
      return new Promise(async (resolve, reject) => {
        await api.post('/auth/register', {
          name,
          surname,
          email,
          phone,
          password
        })
        .then(res => {
          this.token = res.data.token;
          setToken(this.token);
          this.fetchUser();
          resolve();
        }).catch(err => reject(err.response.data.message));

      })
    },
    async fetchUser() {
      await api.get('/user')
        .then(res => {
          const { name, surname, email, phone } = res.data;
          this.name = name;
          this.surname = surname;
          this.email = email;
          this.phone = phone;
        })
    }
  },
});
