<script setup>
  import { useAdStore } from "../stores/ads";
  import AdCard from "../components/AdCard.vue";

  const adStore = useAdStore();
  adStore.getAds();

</script>

<template>
  <div id="cardcontainer">
    <AdCard v-for="ad in adStore.ads"
      :title="ad.title" 
      :description="ad.description"
      :price="ad.price" 
      :photo="ad.photo"
      />
  </div>
</template>

<style scoped>
#cardcontainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, 320px);
  justify-content: space-evenly;
  row-gap: 10px;
  justify-items: center;
  justify-content: center;
}
</style>