<script setup>
import { ref, onMounted } from 'vue';
import $ from 'jquery';
import { useRoute } from 'vue-router';
import { ErrorMessage, Form } from 'vee-validate';
import router from '../../router/index';
import { useUserStore } from '../../stores/user';

const userStore = useUserStore();
const route = useRoute();

const user = ref({
  name: undefined,
  surname: undefined,
  email: undefined,
  phone: undefined,
  password: undefined,
  password_confirmation: undefined,
});

const loading = ref(false);

onMounted(() => {
  google.accounts.id.initialize({
    client_id:
      '191398710109-rp9vj85bpvp661vndon6j9d5qh3bcaj4.apps.googleusercontent.com',
    callback: onSignIn,
  });
  google.accounts.id.renderButton(document.getElementById('googleButton'), {
    theme: 'outline',
    size: 'large',
    with: 400,
  });
});

function onSignIn(response) {
  $('input, .btn').prop('disabled', true);
  loading.value = true;
  if (response.credential) {
    userStore
      .googleAuth(response.credential)
      .then(() => {
        router.push(route.query.redirect || '/');
      })
      .finally(() => {
        $('input, .btn').prop('disabled', false);
        loading.value = false;
      });
  }
}

function register(values, actions) {
  $('input, .btn').prop('disabled', true);
  loading.value = true;
  userStore
    .register(user.value)
    .then(() => router.push({ path: '/' }))
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
  <Form
    @submit="register"
    v-slot="{ errors }"
    class="container mt-4 needs-validation"
    style="max-width: 500px"
  >
    <div class="card">
      <div class="card-header">Register</div>
      <div class="card-body container">
        <div class="row">
          <div class="col">
            <div class="form-floating mb-3">
              <input
                name="name"
                type="text"
                v-model="user.name"
                class="form-control"
                :class="{ 'is-invalid': errors.name }"
                placeholder="Name"
              />
              <ErrorMessage name="name" class="invalid-feedback" />
              <label for="floatingInput">Name</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-floating mb-3">
              <input
                name="surname"
                type="text"
                v-model="user.surname"
                class="form-control"
                :class="{ 'is-invalid': errors.surname }"
                placeholder="Surname"
              />
              <ErrorMessage name="surname" class="invalid-feedback" />
              <label for="floatingInput">Surname</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-floating mb-3">
              <input
                name="phone"
                type="number"
                v-model="user.phone"
                class="form-control"
                :class="{ 'is-invalid': errors.phone }"
                placeholder="Phone number"
              />
              <ErrorMessage name="phone" class="invalid-feedback" />
              <label for="floatingInput">Phone number</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-floating mb-3">
              <input
                name="email"
                type="email"
                v-model="user.email"
                class="form-control"
                :class="{ 'is-invalid': errors.email }"
                placeholder="name@example.com"
              />
              <ErrorMessage name="email" class="invalid-feedback" />
              <label for="floatingInput">Email address</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-floating mb-3">
              <input
                name="password"
                autocomplete="on"
                type="password"
                v-model="user.password"
                class="form-control"
                :class="{ 'is-invalid': errors.password }"
                placeholder="Password"
              />
              <ErrorMessage name="password" class="invalid-feedback" />
              <label for="floatingInput">Password</label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="form-floating mb-3">
              <input
                name="password_confirmation"
                autocomplete="on"
                type="password"
                v-model="user.password_confirmation"
                class="form-control"
                :class="{ 'is-invalid': errors.password_confirmation }"
                placeholder="Password"
              />
              <ErrorMessage
                name="password_confirmation"
                class="invalid-feedback"
              />
              <label for="floatingPassword">Repeat the password</label>
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
              <span v-if="!loading">Register</span>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-12 d-flex justify-content-center">
            <div id="googleButton" data-auto_prompt="false"></div>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-12 d-grid">
            <input
              type="button"
              class="btn btn-secondary"
              style="height: 58px"
              @click="$router.push('/login')"
              value="Already have an account? Log in"
            />
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>
