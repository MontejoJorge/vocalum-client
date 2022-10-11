<script setup>
import { RouterLink, RouterView } from "vue-router";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <header>
    <NavBar/>
  </header>

  <RouterView />
</template>
