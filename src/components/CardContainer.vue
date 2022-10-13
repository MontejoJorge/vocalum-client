<script setup>
  import { useAdStore } from "../stores/ads";
  import AdCard from "../components/AdCard.vue";

  const adStore = useAdStore();
  adStore.getAds();

</script>

<template>
  <div class="container mt-5">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5">
      <div  v-for="ad in adStore.ads" class=" d-flex justify-content-center">
        <AdCard
          class="mb-4"
          :title="ad.title" 
          :description="ad.description"
          :price="ad.price" 
          :photo="ad.photo"
          :url="ad.url"
          />
      </div>
    </div>
  </div>
</template>
