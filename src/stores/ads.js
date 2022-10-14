import { defineStore } from 'pinia';
import api from './services/axios';

export const useAdStore = defineStore('ads', {
  state: () => ({
    count: 0,
    ads: [],
  }),
  getters: {},
  actions: {
    async getAds() {
      await api.get('/ads').then((res) => {
        this.totalCount = res.data.count;
        this.ads = res.data.ads;
      });
    },
    async searchAds(filter) {
      await api
        .get('/ads', {
          params: {
            search: filter.search,
            minPrice: filter.minPrice,
            maxPrice: filter.maxPrice,
            tags: filter.tags,
            orderByPrice: filter.orderByPrice,
          },
        })
        .then((res) => {
          this.totalCount = res.data.count;
          this.ads = res.data.ads;
        });
    },
    createAd({ title, description, price, photo, tags }) {
      return new Promise(async (resolve, reject) => {
        await api
          .post('/ads', {
            title,
            description,
            price,
            photo,
            tags,
          })
          .then((res) => {
            console.log(res);
          });
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
          .get(`/ads/${url}`)
          .then((res) => {
            Object.assign(this, res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
