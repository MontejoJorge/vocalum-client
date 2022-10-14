<script setup>
  import getPhotoURL from '../util/photo';

  const props = defineProps({
    title: String,
    description: String,
    price: Number,
    photo: String,
    url: String
  });

</script>

<template>
  <div class="card contai" style="width: 18rem;">
    <RouterLink :to="{ name: 'item', params: { id: url }}">
      <img :src="getPhotoURL(photo)" class="card-img-top">
    </RouterLink>
    <div class="card-body container d-flex flex-column justify-content-between">
      <div class="row">
        <div class="col">
          <RouterLink :to="{ name: 'item', params: { id: url }}" class="card-title">
            <h5 class="card-title text-truncate" :title="title">{{ title }}</h5>
          </RouterLink>  
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <p class="card-text crop-text-2">{{ description }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="btn btn-primary mb-0">{{ price }} €</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  height: 200px;
  object-fit: cover;
}

a {
  text-decoration: none;
}
.crop-text-2 {
  -webkit-line-clamp: 2;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>