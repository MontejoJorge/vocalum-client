<script setup>
  import { onUnmounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { useAdInfoStore } from '../stores/ads';
  import { timeSince } from '../util/date';
  import genPhotoUrl from '../util/photo';

  const route = useRoute();
  const adInfoStore = useAdInfoStore();

  adInfoStore.getAdInfo(route.params.id);

  const { title, description, price, photo, created_at, tags, user } =
    storeToRefs(adInfoStore);

  onUnmounted(() => {
    adInfoStore.$reset();
  });
</script>

<template>
  <div class="container d-flex justify-content-center mt-4">
    <div class="card mb-3" style="max-width: 1000px">
      <div class="row">
        <div class="col-xl-4 col-xxl-5">
          <img :src="genPhotoUrl(photo)" class="img-fluid rounded" alt="..." />
        </div>
        <div class="col">
          <div class="card-body container">
            <h3 class="card-title">{{ title }}</h3>
            <div class="row mb-2">
              <div class="col">
                <p class="card-text">{{ description }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <p class="btn btn-primary">{{ price }} €</p>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col">
                <span v-for="tag in tags" class="badge bg-secondary me-1">
                  {{ tag.name }}
                </span>
              </div>
            </div>
            <hr />
            <div v-if="user" class="row row-cols-1 row-cols-xl-3">
              <div class="col">
                <p>{{ user.name }}</p>
              </div>
              <div class="col">
                <p>{{ user.email }}</p>
              </div>
              <div class="col">
                <p>{{ user.phone }}</p>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col">
                <p class="text-muted">Created: {{ timeSince(created_at) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  height: 100%;
  max-height: 70vh;
  width: 100%;
  object-fit: cover;
}
</style>
