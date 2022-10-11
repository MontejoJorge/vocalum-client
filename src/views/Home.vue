<script setup >
import { useAdStore } from "../stores/ads";

const adStore = useAdStore();
adStore.getAds();

const url = import.meta.env.VITE_STORAGE_URL;

</script>

<template>
  <h1>Home</h1>

  <div v-for="ad in adStore.ads">
    <h4>{{ ad.title }}</h4>
    <p>{{ ad.description }}</p>
    <p>{{ ad.price }}</p>
    <img :src="`${url}/${ad.photo}.jpg`" style="max-width: 100px;">
    <p></p>
  </div>
</template>