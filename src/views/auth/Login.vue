<script>
import { useUserStore } from '../../stores/user';
import $ from 'jquery';

export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      error: null,
    };
  },
  methods: {
    login() {
      $('input, .btn').prop('disabled', true);
      this.loading = true;
      this.userStore
        .login(this.email, this.password)
        .then(() => {
          this.$router.push({ path: '/' });
        })
        .catch((err) => (this.error = err))
        .finally(() => {
          $('input, .btn').prop('disabled', false);
          this.loading = false;
        });
    },
  },
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
                id="floatingInput"
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
                type="password"
                v-model="password"
                class="form-control"
                id="floatingPassword"
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
            <button
              type="submit"
              class="btn btn-secondary"
              style="height: 58px"
            >
              Don't have an account? Register
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
