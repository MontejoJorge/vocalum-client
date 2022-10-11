<script setup >
import { useAdStore } from "../stores/ads";
import AdCard from "../components/AdCard.vue";

const adStore = useAdStore();
adStore.getAds();

</script>

<template>
  <h1>Home</h1>

  <div v-for="ad in adStore.ads">
    <AdCard 
      :title="ad.title" 
      :description="ad.description"
      :price="ad.price" 
      :photo="ad.photo"/>
    <p></p>
  </div>
</template>