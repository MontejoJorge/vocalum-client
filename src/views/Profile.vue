<script setup >
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
userStore.fetchUser()

</script>

<template>
  <h2>Profile</h2>
  <p>{{ userStore.name }}</p>
  <p>{{ userStore.surname }}</p>
  <p>{{ userStore.email }}</p>
  <p>{{ userStore.phone }}</p>
</template>