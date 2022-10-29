<script setup>
import CardContainer from '../components/CardContainer.vue';
import { useAdStore } from '../stores/ads';

const adStore = useAdStore();
adStore.searchAds();
</script>

<template>
  <CardContainer :ads="adStore.ads"/>
</template>
