<script setup>
import $ from 'jquery';
import getPhotoURL from '../util/photo';
import { useUserStore } from '../stores/user';
import { useAdStore } from '../stores/ads';
import PlaceholderSvg from './PlaceholderSvg.vue';

const adStore = useAdStore();
const userStore = useUserStore();

const props = defineProps({
  loading: Boolean,
  title: String,
  description: String,
  price: Number,
  photo: String,
  url: String,
  tags: Array,
  user: Object,
});

function deleteAd(event) {
  $(event.target).prop('disabled', true);
  adStore
    .deleteAd(props.url)
    .then(() => console.log('del'))
    .catch((err) => {
      $(event.target).prop('disabled', false);
    });
}
</script>

<template>
  <div v-if="!props.loading" class="card" style="width: 18rem">
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
          <span class="badge bg-secondary float-start me-1 mb-1">{{
            tag.name
          }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <RouterLink :to="{ name: 'item', params: { id: url } }">
            <p class="btn btn-primary mb-0">{{ price }} €</p>
          </RouterLink>
        </div>
        <div v-if="user.email == userStore.email" class="col-4">
          <div class="btn btn-danger mb-0" data-bs-toggle="modal" data-bs-target="#deleteModal">
            <i class="bi bi-trash3"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Are you sure?</h1>
            <div type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></div>
          </div>
          <div class="modal-body">
            You are sure you want to delete the ad: {{ title }} ?
          </div>
          <div class="modal-footer">
            <div type="button" class="btn btn-secondary" data-bs-dismiss="modal">No, cancel.</div>
            <div @click="deleteAd" class="btn btn-danger" data-bs-dismiss="modal">Yes, delete.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="card" style="width: 18rem">
    <span>
      <PlaceholderSvg />
    </span>
    <div class="card-body container d-flex flex-column justify-content-between">
      <div class="row">
        <div class="col">
          <span class="card-title">
            <h5 class="card-title text-truncate placeholder-glow">
              <span class="placeholder col-9"></span>
            </h5>
          </span>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <p class="card-text placeholder-glow">
            <span class="placeholder col-8"></span>
            <span class="placeholder col-5"></span>
            <span class="placeholder col-6"></span>
          </p>
        </div>
      </div>
      <div class="mb-1">
        <div>
          <span class="badge bg-secondary float-start me-1 mb-1"></span>
        </div>
      </div>
      <div class="row">
        <div class="col-7">
          <span>
            <p class="btn btn-primary mb-0 disabled placeholder col-9"></p>
          </span>
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
