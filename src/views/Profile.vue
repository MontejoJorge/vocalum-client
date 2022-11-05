<script setup>
import { ref } from 'vue';
import { watch, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { ErrorMessage, Form } from 'vee-validate';
import { useUserStore } from '../stores/user';
import CardContainer from '../components/CardContainer.vue';
import { useAdStore } from '../stores/ads';

const userStore = useUserStore();
const route = useRoute();
const adStore = useAdStore();

const successMsg = ref(undefined);

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

function updateUser(values, actions) {
  let { name, surname, email, phone } = userStore;
  if (userStore.google) email = undefined;

  userStore
    .update({ name, surname, email, phone })
    .then(() => {
      successMsg.value = 'Profile updated successfully';
    })
    .catch((err) => {
      actions.setErrors(err.errors);
    });
}

watch(
  () => route.query.page,
  () => {
    adStore.searchAds({
      user_email: userStore.email,
      page: route.query.page,
    });
  }
);
</script>

<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header">Profile</div>
      <Form
        @submit="updateUser"
        v-slot="{ errors }"
        class="card-body container"
      >
        <div
        v-if="successMsg"
          class="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {{ successMsg }}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
          ></button>
        </div>
        <div class="row row-cols-1 row-cols-md-2">
          <div class="col">
            <div class="input-group mb-3">
              <span class="input-group-text">Name</span>
              <input
                type="text"
                name="name"
                maxlength="20"
                v-model="userStore.name"
                class="form-control"
              />
              <ErrorMessage name="name" class="invalid-feedback" />
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <span class="input-group-text">Surname</span>
              <input
                type="text"
                name="surname"
                maxlength="40"
                v-model="userStore.surname"
                class="form-control"
                :class="{ 'is-invalid': errors.surname }"
              />
              <ErrorMessage name="surname" class="invalid-feedback" />
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <span class="input-group-text">Email</span>
              <input
                type="text"
                name="email"
                v-model="userStore.email"
                class="form-control"
                :class="{ 'is-invalid': errors.email }"
                :disabled="userStore.google == 1"
              />
              <ErrorMessage name="email" class="invalid-feedback" />
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <span class="input-group-text">Phone</span>
              <input
                type="text"
                name="phone"
                maxlength="9"
                v-model="userStore.phone"
                class="form-control"
                :class="{ 'is-invalid': errors.phone }"
              />
              <ErrorMessage name="phone" class="invalid-feedback" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button type="submit" class="btn btn-primary">Update</button>
          </div>
        </div>
        <CardContainer :ads="adStore.ads" />
      </Form>
    </div>
  </div>
</template>
