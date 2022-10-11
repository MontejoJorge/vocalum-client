<script>
import { useAdStore } from "../stores/ads";
export default {
  setup() {
    const adStore = useAdStore();
    return { adStore };
  },
  data() {
    return {
      ad: {
        title: "",
        description: "",
        price: "",
        photo: "",
      },
      error: null,
    };
  },
  methods: {
    createAd() {
      this.adStore.createAd(this.ad)
    },
    onChangeFileUpload(event) {
      this.ad.photo = event.target.files[0];
    }
  },
};
</script>

<template>
  <h2>Create</h2>
  <form @submit.prevent="createAd">
    <label>Title</label>
    <input type="text" v-model="ad.title" />
    <label>Desc</label>
    <input type="text" v-model="ad.description" />
    <label>Price</label>
    <input type="text" v-model="ad.price" />
    <label>Photo</label>
    <input type="file" @change="onChangeFileUpload"/>
    <p>{{ this.error }}</p>
    <button type="submit">Crear</button>
  </form>
</template>