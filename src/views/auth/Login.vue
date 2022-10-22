<script setup>
import { ref } from 'vue';
import $ from 'jquery';
import router from '../../router/index'
import { useUserStore } from '../../stores/user';

const userStore = useUserStore();

const email = ref(undefined);
const password = ref(undefined);
const loading = ref(false);
const error = ref(null);

const login = () => {
  $('input, .btn').prop('disabled', true);
  loading.value = true;
  userStore.login(email.value, password.value)
    .then(() => {
      router.push({ path: '/' });
    })
    .catch((err) => (error.value = err))
    .finally(() => {
      $('input, .btn').prop('disabled', false);
      loading.value = false;
    });
};
</script>

<template>
  <form class="container mt-4" @submit.prevent="login" style="max-width: 500px">
    <div v-if="error" class="alert alert-danger alert-dismissible fade show">
      {{ error }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
    <div class="card">
      <div class="card-header">Login</div>
      <div class="card-body container">
        <div class="row">
          <div class="col">
            <div class="form-floating mb-3">
              <input
                type="email"
                v-model="email"
                class="form-control"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email address</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-floating mb-3">
              <input
                autocomplete="on"
                type="password"
                v-model="password"
                class="form-control"
                placeholder="Password"
              />
              <label for="floatingPassword">Password</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 d-grid">
            <button type="submit" class="btn btn-primary" style="height: 58px">
              <span
                v-if="loading"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span v-if="loading" class="ms-1">Loading...</span>
              <span v-if="!loading">Login</span>
            </button>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-12 d-grid">
            <input
              type="button"
              class="btn btn-secondary"
              style="height: 58px"
              @click="$router.push('/register')"
              value="Don't have an account? Register"
            />
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
