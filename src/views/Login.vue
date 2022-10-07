<script>
import { useUserStore } from "../stores/user";
export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    login() {
      this.userStore.login(this.email, this.password)
        .then(() => {
          this.$router.push({ path: '/' });
        })
        .catch(err => {
          this.error = err;
        })
    },
  },
};
</script>

<template>
  <form @submit.prevent="login">
    <label>Email</label>
    <input type="text" v-model="email" />
    <label>Password</label>
    <input type="password" v-model="password" />
    <p>{{ this.error }}</p>
    <button type="submit">Login</button>
  </form>
</template>