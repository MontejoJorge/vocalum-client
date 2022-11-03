<script setup>
import { ref, onMounted } from 'vue';
import $ from 'jquery';
import { useRoute } from 'vue-router';
import { ErrorMessage, Form } from 'vee-validate';
import router from '../../router/index';
import { useUserStore } from '../../stores/user';

const userStore = useUserStore();
const route = useRoute();

const email = ref(undefined);
const password = ref(undefined);
const loading = ref(false);

onMounted(() => {
  google.accounts.id.initialize({
    client_id:
      '191398710109-rp9vj85bpvp661vndon6j9d5qh3bcaj4.apps.googleusercontent.com',
    callback: onSignIn,
  });
  google.accounts.id.renderButton(document.getElementById('buttonDiv'), {
    theme: 'outline',
    size: 'large',
    with: 400,
  });
});

function onSignIn(response) {
  $('input, .btn').prop('disabled', true);
  loading.value = true;
  if (response.credential) {
    userStore.googleAuth(response.credential)
    .then(() => {
      router.push(route.query.redirect || '/' );
    })
    .finally(() => {
      $('input, .btn').prop('disabled', false);
      loading.value = false;
    });
  }
}

function login(values, actions) {
  $('input, .btn').prop('disabled', true);
  loading.value = true;
  userStore.login(email.value, password.value)
    .then(() => {
      router.push(route.query.redirect || '/' );
    })
    .catch((err) => {
      actions.setErrors(err.errors);
    })
    .finally(() => {
      $('input, .btn').prop('disabled', false);
      loading.value = false;
    });
}
</script>

<template>
  <Form @submit="login" v-slot="{ errors }" class="container mt-4 needs-validation" style="max-width: 500px">
    <div v-if="errors.login" class="alert alert-danger fade show" role="alert">
      {{ errors.login }}
    </div>
    <div class="card">
      <div class="card-header">Login</div>
      <div class="card-body container">
        <div class="row">
          <div class="col">
            <div class="form-floating mb-3">
              <input
                name="email"
                type="email"
                v-model="email"
                class="form-control"
                :class="{ 'is-invalid': errors.email }"
                placeholder="name@example.com"
              />
              <ErrorMessage name="email" class="invalid-feedback"/>
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
                name="password"
                v-model="password"
                class="form-control"
                :class="{ 'is-invalid': errors.password }"
                placeholder="Password"
              />
              <ErrorMessage name="password" class="invalid-feedback"/>
              <label for="floatingPassword">Password</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 d-grid mb-3">
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
        <div class="row">
          <div class="col-12 d-flex justify-content-center">
            <div id="buttonDiv" data-auto_prompt="false"></div>
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
  </Form>
</template>
