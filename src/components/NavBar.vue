<script setup>
  import { RouterLink, RouterView } from "vue-router";
  import { useUserStore } from "../stores/user";
  const userStore = useUserStore();
</script>

<template>
  <nav class="navbar navbar-expand-sm bg-light">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">
        Vocalum
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/create" class="nav-link">
              Create
            </RouterLink>
          </li>
        </ul>
        <ul class="nav navbar-nav ml-auto w-100 justify-content-end">
          <li v-if="userStore.name" class="nav-item">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                <span class="d-inline ps-2">{{ userStore.name }}</span>  
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                  <li><RouterLink class="dropdown-item" to="/logout">Logout</RouterLink></li>
              </ul>
            </li>
          </li>
          <li v-else class="nav-item">
            <RouterLink to="/login" class="nav-link">
              <span class="d-inline">Login | Register</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>