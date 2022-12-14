<script setup>
import { onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import router from '../router';
import { useAdInfoStore } from '../stores/ads';
import { timeSince } from '../util/date';
import genPhotoUrl from '../util/photo';
import PlaceholderSvg from '../components/PlaceholderSvg.vue';

const route = useRoute();
const adInfoStore = useAdInfoStore();

adInfoStore.getAdInfo(route.params.id).catch((err) => {
  if (err.status === 404) {
    router.push({ name: 'not-found' });
  }
});

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
          <button
            type="button"
            id="modalButton"
            class=""
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <PlaceholderSvg v-if="!photo" />
            <img v-else :src="genPhotoUrl(photo)" class="img-fluid rounded" />
          </button>
          <div class="modal fade" id="exampleModal" tabindex="-1">
            <div class="modal-dialog" id="modalDialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5">{{ title }}</h1>
                </div>
                <div class="modal-body" id="modalImg">
                  <img
                    v-if="photo"
                    :src="genPhotoUrl(photo)"
                    class="img-fluid rounded"
                  />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card-body container">
            <h3 v-if="!title" class="card-title placeholder-glow">
              <span class="placeholder col-6"></span>
            </h3>
            <h3 v-else class="card-title">{{ title }}</h3>
            <div class="row mb-2">
              <div class="col">
                <p v-if="!description" class="card-text placeholder-glow">
                  <span class="placeholder col-7"></span>
                  <span class="placeholder col-4"></span>
                  <span class="placeholder col-4"></span>
                  <span class="placeholder col-6"></span>
                  <span class="placeholder col-8"></span>
                </p>
                <p
                  v-else
                  class="card-text"
                  style="max-height: 300px; overflow-y: auto"
                >
                  {{ description }}
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <p v-if="!price" class="btn btn-primary disabled placeholder">
                  -- ???
                </p>
                <p v-else class="btn btn-primary">{{ price }} ???</p>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col">
                <p v-if="!tags" class="card-text placeholder-glow">
                  <span class="placeholder col-3"></span>
                </p>
                <span
                  v-else
                  v-for="tag in tags"
                  class="badge bg-secondary me-1"
                >
                  {{ tag.name }}
                </span>
              </div>
            </div>
            <hr />
            <div v-if="!user" class="row row-cols-1">
              <div class="col placeholder-glow">
                <span class="placeholder col-7"></span>
              </div>
              <div class="col">
                <span class="placeholder col-7"></span>
              </div>
              <div class="col">
                <span class="placeholder col-7"></span>
              </div>
            </div>
            <div v-else class="row row-cols-1">
              <div class="col">
                <p><i class="bi bi-person-fill"></i> {{ user.name }}</p>
              </div>
              <div class="col">
                <p><i class="bi bi-envelope-fill"></i> {{ user.email }}</p>
              </div>
              <div v-if="user.phone" class="col">
                <p><i class="bi bi-telephone-fill"></i> {{ user.phone }}</p>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col">
                <p v-if="!created_at" class="text-muted">
                  <span class="placeholder col-4"></span>
                </p>
                <p v-else class="text-muted">
                  <i class="bi bi-clock-history"></i> Created:
                  {{ timeSince(created_at) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img,
#modalButton {
  height: 100%;
  max-height: 70vh;
  width: 100%;
  object-fit: cover;
}

#modalButton {
  border: none;
  background: none;
  color: inherit;
  padding: 0;
  outline: inherit;
}

.btn,
.btn:hover,
.btn:focus,
.btn:active {
  cursor: default;
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: white;
  text-decoration: none;
  opacity: 1;
  box-shadow: none;
}
</style>
