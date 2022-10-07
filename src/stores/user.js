import { defineStore } from 'pinia';
import api from './services/axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    name: undefined,
    surname: undefined,
    email: undefined,
    phone: undefined,
    token: undefined
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
          resolve();
        }).catch(err => reject(err.response.data.message));

      })
    }
  },
});
