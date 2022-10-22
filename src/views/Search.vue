<script setup>
import CardContainer from '../components/CardContainer.vue';
import SearchFilters from '../components/SearchFilters.vue';

import { useAdStore } from '../stores/ads';

const adStore = useAdStore();
</script>

<template>
  <h1>Search</h1>
  <SearchFilters />
  <CardContainer :ads="adStore.ads"/>
</template>
