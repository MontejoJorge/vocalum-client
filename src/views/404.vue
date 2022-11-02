<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12 text-center mt-5">
        <span class="display-1 d-block">404</span>
        <div class="mb-4 lead">Not found</div>
        <RouterLink to="/" class="btn btn-primary">Back to Home</RouterLink>
      </div>
    </div>
  </div>
</template>
