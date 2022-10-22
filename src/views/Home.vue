<script setup>
import CardContainer from '../components/CardContainer.vue';
import { useAdStore } from '../stores/ads';

const adStore = useAdStore();
adStore.getAds();
</script>

<template>
  <h1>Home</h1>

  <CardContainer :ads="adStore.ads"/>
</template>
