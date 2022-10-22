<script setup>
import $ from 'jquery';
import getPhotoURL from '../util/photo';
import { useUserStore } from '../stores/user';
import { useAdStore } from '../stores/ads';

const adStore = useAdStore();
const userStore = useUserStore();

const props = defineProps({
  title: String,
  description: String,
  price: Number,
  photo: String,
  url: String,
  tags: Array,
  user: Object
});

function deleteAd(event) {
  $(event.target).prop('disabled', true);
  adStore.deleteAd(props.url)
    .then(() => console.log('del'))
    .catch((err) => {
      $(event.target).prop('disabled', false);
    })
}
</script>

<template>
  <div class="card" style="width: 18rem">
    <RouterLink :to="{ name: 'item', params: { id: url } }">
      <img :src="getPhotoURL(photo)" class="card-img-top" />
    </RouterLink>
    <div class="card-body container d-flex flex-column justify-content-between">
      <div class="row">
        <div class="col">
          <RouterLink
            :to="{ name: 'item', params: { id: url } }"
            class="card-title"
          >
            <h5 class="card-title text-truncate" :title="title">{{ title }}</h5>
          </RouterLink>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <p class="card-text crop-text-2">{{ description }}</p>
        </div>
      </div>
      <div class="mb-1">
        <div v-for="tag in tags">
          <span class="badge bg-secondary float-start me-1 mb-1">{{ tag.name }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <RouterLink :to="{ name: 'item', params: { id: url } }">
            <p class="btn btn-primary mb-0">{{ price }} €</p>
          </RouterLink>
        </div>
        <div v-if="user.email == userStore.email" class="col-4">
          <button @click="deleteAd" class="btn btn-danger mb-0">D</button>
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

</style>
