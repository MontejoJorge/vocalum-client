<script setup>
  import getPhotoURL from '../util/photo';
  const props = defineProps({
    title: String,
    description: String,
    price: Number,
    photo: String
  });
</script>

<template>
  <div class="card" style="width: 18rem;">
    <img :src="getPhotoURL(photo)" class="card-img-top" style="max-width: 300px;">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">{{ description }}</p>
      <p class="btn btn-primary">{{ price }}</p>
    </div>
  </div>
</template>