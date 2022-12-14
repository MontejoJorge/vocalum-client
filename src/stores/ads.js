import { defineStore } from 'pinia';
import api from './services/axios';

export const useAdStore = defineStore('ads', {
  state: () => ({
    current_page: undefined,
    last_page: undefined,
    total: undefined,
    loading: false,
    ads: [],
  }),
  getters: {},
  actions: {
    searchAds(filter = undefined) {
      this.loading = true;
      return new Promise(async (resolve, reject) => {
        await api
          .get('/items', {
            params: {
              page: filter?.page || 1,
              search: filter?.search,
              minPrice: filter?.minPrice,
              maxPrice: filter?.maxPrice,
              tags: filter?.tags,
              orderByPrice: filter?.orderByPrice,
              user_email: filter?.user_email,
            },
          })
          .then((res) => {
            this.loading = false;
            this.ads = res.data.ads;
            this.total = res.data.total;
            this.ads = res.data.data;
            this.current_page = res.data.current_page;
            this.last_page = res.data.last_page;
            resolve();
          })
          .catch((err) => {
            this.loading = false;
            reject(err.response.data);
          });
      });
    },
    createAd({ title, description, price, photo, tags }) {
      return new Promise(async (resolve, reject) => {
        await api
          .post('/items', {
            title,
            description,
            price,
            photo,
            tags,
          })
          .then((res) => resolve(res.data))
          .catch((err) => {
            reject(err.response.data);
          });
      });
    },
    deleteAd(url) {
      return new Promise(async (resolve, reject) => {
        await api
          .delete(`/items/${url}`)
          .then(() => {
            const index = this.ads.findIndex((ad) => ad.url === url);
            this.ads.splice(index, 1);
            this.count--;
            resolve();
          })
          .catch((err) => reject(err.data));
      });
    },
  },
});

export const useAdInfoStore = defineStore('ad', {
  state: () => ({
    title: undefined,
    description: undefined,
    price: undefined,
    photo: undefined,
    created_at: undefined,
    tags: undefined,
    user: undefined,
  }),
  getters: {},
  actions: {
    getAdInfo(url) {
      return new Promise(async (resolve, reject) => {
        await api
          .get(`/items/${url}`)
          .then((res) => {
            Object.assign(this, res.data);
          })
          .catch((err) => {
            reject(err.response);
          });
      });
    },
  },
});
