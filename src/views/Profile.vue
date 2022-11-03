<script setup>
import { watch, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '../stores/user';
import CardContainer from '../components/CardContainer.vue';
import { useAdStore } from '../stores/ads';

const userStore = useUserStore();
const route = useRoute();
const adStore = useAdStore();

onBeforeMount(() => {
  adStore.$reset();
  adStore.loading = true;
});

if (!userStore.email) {
  userStore.fetchUser().then(() => {
    adStore.searchAds({
      user_email: userStore.email,
      page: route.query.page,
    });
  });
} else {
  adStore.searchAds({
    user_email: userStore.email,
    page: route.query.page,
  });
}

watch(
  () => route.query.page,
  () => {
    adStore.searchAds({
      user_email: userStore.email,
      page: route.query.page
    });
  }
);
</script>

<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header">Profile</div>
      <form class="card-body container">
        <div class="row row-cols-1 row-cols-md-2">
          <div class="col">
            <div class="input-group mb-3">
              <span class="input-group-text">Name</span>
              <input type="text" class="form-control" :value="userStore.name" />
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <span class="input-group-text">Surname</span>
              <input
                type="text"
                class="form-control"
                :value="userStore.surname"
              />
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <span class="input-group-text">Email</span>
              <input
                type="text"
                class="form-control"
                :value="userStore.email"
              />
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <span class="input-group-text">Phone</span>
              <input
                type="text"
                class="form-control"
                :value="userStore.phone"
              />
            </div>
          </div>
        </div>
        <CardContainer :ads="adStore.ads" />
      </form>
    </div>
  </div>
</template>
