<script setup>
import CardContainer from '../components/CardContainer.vue';
import SearchFilters from '../components/SearchFilters.vue';

import { useAdStore } from '../stores/ads';

const adStore = useAdStore();
</script>

<template>
  <SearchFilters class="mt-3" />
  <CardContainer :ads="adStore.ads" />
</template>
