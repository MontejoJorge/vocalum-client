<script>
import { useUserStore } from '../../stores/user';
export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      user: {
        name: '',
        surname: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
      },
      error: null,
    };
  },
  methods: {
    register() {
      this.userStore
        .register(this.user)
        .then(this.$router.push({ path: '/' }))
        .catch((err) => (this.error = err));
    },
  },
};
</script>

<template>
  <h2>Register</h2>
  <form @submit.prevent="register">
    <label>Name</label>
    <input type="text" v-model="user.name" />
    <label>Surname</label>
    <input type="text" v-model="user.surname" />
    <label>Email</label>
    <input type="text" v-model="user.email" />
    <label>Phone</label>
    <input type="text" v-model="user.phone" />
    <label>Password</label>
    <input type="password" v-model="user.password" />
    <p>{{ this.error }}</p>
    <button type="submit">Login</button>
  </form>
</template>
