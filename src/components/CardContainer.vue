<script setup>
import AdCard from '../components/AdCard.vue';

const props = defineProps({ads: Array});
</script>

<template>
  <div class="container mt-3">
    <div
      class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5"
    >
      <div v-for="ad in props.ads" :key="ad.url" class="d-flex justify-content-center">
        <AdCard
          class="mb-4"
          :title="ad.title"
          :description="ad.description"
          :price="ad.price"
          :photo="ad.photo"
          :url="ad.url"
          :tags="ad.tags"
          :user="ad.user"
        />
      </div>
    </div>
  </div>
</template>
