<script setup>
import { ref } from 'vue';
import $ from 'jquery';
import router from '../../router/index'
import { useUserStore } from '../../stores/user';

const userStore = useUserStore();

const user = ref({
  name: undefined,
  surname: undefined,
  email: undefined,
  phone: undefined,
  password: undefined,
  password_confirmation: undefined,
});

const loading = ref(false);
const error = ref(null);

const register = () => {
  $('input, .btn').prop('disabled', true);
  loading.value = true;
  userStore.register(user.value)
    .then(() => router.push({ path: '/' }))
    .catch((err) => (error.value = err))
    .finally(() => {
      $('input, .btn').prop('disabled', false);
      loading.value = false;
    });
}

</script>

<template>
  <form class="container mt-4" @submit.prevent="register" style="max-width: 500px">
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
      <div class="card-header">Register</div>
      <div class="card-body container">
        <div class="row">
          <div class="col">
            <div class="form-floating mb-3">
              <input
                type="text"
                v-model="user.name"
                class="form-control"
                placeholder="Name"
              />
              <label for="floatingInput">Name</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-floating mb-3">
              <input
                type="text"
                v-model="user.surname"
                class="form-control"
                placeholder="Surname"
              />
              <label for="floatingInput">Surname</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-floating mb-3">
              <input
                type="number"
                v-model="user.phone"
                class="form-control"
                placeholder="Phone number"
              />
              <label for="floatingInput">Phone number</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-floating mb-3">
              <input
                type="email"
                v-model="user.email"
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
                v-model="user.password"
                class="form-control"
                placeholder="Password"
              />
              <label for="floatingInput">Password</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-floating mb-3">
              <input
              autocomplete="on"
                type="password"
                v-model="user.password_confirmation"
                class="form-control"
                placeholder="Password"
              />
              <label for="floatingPassword">Repeat the password</label>
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
              <span v-if="!loading">Register</span>
            </button>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-12 d-grid">
            <button
              type="submit"
              class="btn btn-secondary"
              style="height: 58px"
              @click="$router.push('/login')"
            >
              Already have an account? Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
