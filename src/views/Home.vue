<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import CardContainer from '../components/CardContainer.vue';
import { useAdStore } from '../stores/ads';

const adStore = useAdStore();
const route = useRoute();

route.query.page = route.query.page || 1;
adStore.searchAds({page: route.query.page});

watch(
  () => route.query.page,
  () => {
    adStore.searchAds({page: route.query.page});
  }
);
</script>

<template>
  <CardContainer :ads="adStore.ads"/>
</template>
