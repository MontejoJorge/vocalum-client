<script setup>
import { Collapse } from 'bootstrap';
import { useAdStore } from '../stores/ads';
import { onMounted, ref } from 'vue';
import Tags from './Tags.vue';

const adStore = useAdStore();

const searchText = ref(undefined);
const minPrice = ref(undefined);
const maxPrice = ref(undefined);
const tags = ref([undefined]);
const orderByPrice = ref('no');

const collapse = ref(undefined);

onMounted(() => {
  collapse.value = new Collapse('#advanced-search', {
    toggle: false,
  });
});

const search = () => {
  collapse.value.hide();
  adStore.searchAds({
    search: searchText.value,
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
    tags: tags.value,
    orderByPrice: orderByPrice.value,
  });
};
</script>

<template>
  <form @submit.prevent="search" class="container justify-content-center">
    <div class="row justify-content-center mb-2">
      <div class="col-12 col-md-9 mb-1 mb-md-0">
        <input
          name="search"
          v-model="searchText"
          class="form-control me-2"
          type="search"
          placeholder="Search"
        />
      </div>
      <div class="col-12 col-md-3 d-grid">
        <button 
          class="btn btn-outline-success"
          :class="{ 'disabled': adStore.loading }"
          type="submit"
        >Search</button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="accordion" id="accordion-search">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button"
                type="button"
                id="advanced-search-btn"
                data-bs-toggle="collapse"
                data-bs-target="#advanced-search"
              >
                Advanced search
              </button>
            </h2>
            <div
              id="advanced-search"
              class="collapse show"
              data-bs-parent="#accordion-search"
            >
              <div class="accordion-body">
                <div class="row mb-3">
                  <div class="col-12 col-sm-6 mb-2 mb-md-0">
                    <div class="input-group">
                      <span class="input-group-text">€ Min.</span>
                      <input
                        name="price_min"
                        type="text"
                        v-model="minPrice"
                        class="form-control"
                        placeholder="Min"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-sm-6">
                    <div class="input-group">
                      <span class="input-group-text">€ Max.</span>
                      <input
                        name="price_max"
                        type="text"
                        v-model="maxPrice"
                        class="form-control"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col">
                    <h6>Order By</h6>
                    <select
                      name="orderByPrice"
                      v-model="orderByPrice"
                      class="form-select"
                    >
                      <option selected value="no">Choose...</option>
                      <option value="asc">Price (Ascendant)</option>
                      <option value="desc">Price (Descendant)</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <h6>Serach by tags</h6>
                    <Tags :tags="tags" />
                  </div>
                </div>
                <div class="row">
                  <div class="col d-flex justify-content-between">
                    <button type="submit" class="btn btn-primary">Apply</button>
                    <button type="button" class="btn btn-danger">
                      Remove filters
                    </button>
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
