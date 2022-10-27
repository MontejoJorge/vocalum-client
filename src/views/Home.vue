<script setup>
import CardContainer from '../components/CardContainer.vue';
import { useAdStore } from '../stores/ads';

const adStore = useAdStore();
adStore.getAds();
</script>

<template>
  <CardContainer :ads="adStore.ads"/>
</template>
