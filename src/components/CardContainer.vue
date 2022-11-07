<script setup>
import { useRoute } from 'vue-router';
import AdCard from '../components/AdCard.vue';
import Pagination from './Pagination.vue';
import { useAdStore } from '../stores/ads';

const adStore = useAdStore();
const route = useRoute();

const props = defineProps({ ads: Array });
</script>

<template>
  <div class="container mt-3">
    <div
      class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5"
    >
      <div
        v-if="!adStore.loading && adStore.ads.length != 0"
        v-for="ad in props.ads"
        :key="ad.url"
        class="d-flex justify-content-center"
      >
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
      <div
        v-if="adStore.loading"
        v-for="i in 25"
        class="d-flex justify-content-center"
      >
        <AdCard class="mb-4" :loading="adStore.loading"> </AdCard>
      </div>
    </div>
    <Pagination v-if="adStore.ads.length != 0" />
  </div>
  <div
    v-if="
      adStore.ads.length === 0 && !adStore.loading && route.name === 'profile'
    "
    class="col-12"
  >
    <div class="alert alert-warning" role="alert">No items to display.</div>
  </div>
</template>
