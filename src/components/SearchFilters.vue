<script setup>
  import { useAdStore } from "../stores/ads";
  import { ref } from 'vue'

  const adStore = useAdStore();

  const searchText = ref('');

  const search = () => {
    console.log(searchText)
    adStore.searchAds({
      search: searchText.value
    });
  }
</script>

<template>
  <form @submit.prevent="search" class="container justify-content-center">
    <div class="row justify-content-center mb-1">
      <div class="col-10 col-md-8 mb-1 mb-md-0">
          <input name="search" v-model="searchText" class="form-control me-2" type="search" placeholder="Search">
      </div>
      <div class="col-10 col-md-2 d-grid">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </div>
    </div>
    <div class="row justify-content-center mb-1">
      <div class="col-10">
        <div class="accordion" id="accordion-search">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" id="advanced-search-btn"
                data-bs-toggle="collapse" data-bs-target="#advanced-search">
                Advanced search
              </button>
            </h2>
            <div id="advanced-search" class="collapse" data-bs-parent="#accordion-search">
              <div class="accordion-body">
                <button type="button" class="btn btn-primary">Apply</button>
                <button type="button" class="btn btn-danger">Remove filters</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style>
#advanced-search-btn {
  padding: 9px 20px;
}
</style>