<script setup>
  import { useAdStore } from "../stores/ads";
  import { ref } from 'vue'

  const adStore = useAdStore();

  const searchText = ref('');
  const minPrice = ref(undefined);
  const maxPrice = ref(undefined);

  const search = () => {
    adStore.searchAds({
      search: searchText.value,
      minPrice: minPrice.value,
      maxPrice: maxPrice.value
    });
  }
</script>

<template>
  <form @submit.prevent="search" class="container justify-content-center">
    <div class="row justify-content-center mb-2">
      <div class="col-12 col-md-9 mb-1 mb-md-0">
          <input name="search" v-model="searchText" class="form-control me-2" type="search" placeholder="Search">
      </div>
      <div class="col-12 col-md-3 d-grid">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12">
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
                <div class="row">
                  <div class="col-12 col-sm-6">
                    <div class="input-group mb-3">
                      <span class="input-group-text">€ Min.</span>
                      <input name="price_min" type="text" v-model="minPrice" class="form-control" placeholder="Min">
                    </div>
                  </div>
                  <div class="col-12 col-sm-6">
                    <div class="input-group mb-3">
                      <span class="input-group-text">€ Max.</span>
                      <input name="price_max" type="text" v-model="maxPrice" class="form-control" placeholder="Max">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col d-flex justify-content-between">
                    <button type="submit" class="btn btn-primary">Apply</button>
                    <button type="button" class="btn btn-danger">Remove filters</button>
                  </div>
                </div>
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