<script setup>
import $ from 'jquery';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { ErrorMessage, Form } from 'vee-validate';
import { useAdStore } from '../stores/ads';
import Tags from './Tags.vue';

const adStore = useAdStore();
const route = useRoute();

const searchText = ref(undefined);
const minPrice = ref(undefined);
const maxPrice = ref(undefined);
const tags = ref([undefined]);
const orderByPrice = ref('no');

watch(
  () => route.query.page,
  () => {
    search();
  }
);

const search = (values, actions) => {
  $('#advanced-search-btn').addClass('collapsed');
  $('#advanced-search').removeClass('show');
  adStore
    .searchAds({
      search: searchText.value,
      minPrice: minPrice.value,
      maxPrice: maxPrice.value,
      tags: tags.value,
      orderByPrice: orderByPrice.value,
      page: route.query.page,
    })
    .catch((err) => {
      actions.setErrors(err.errors);
      $('#advanced-search-btn').removeClass('collapsed');
      $('#advanced-search').addClass('show');
    });
};
</script>

<template>
  <Form
    @submit="search"
    v-slot="{ errors }"
    class="container justify-content-center"
  >
    <div class="row justify-content-center mb-2">
      <div class="col-12 col-md-9 mb-1 mb-md-0">
        <input
          name="search"
          v-model="searchText"
          class="form-control me-2"
          :class="{ 'is-invalid': errors.search }"
          type="search"
          placeholder="Search"
        />
        <ErrorMessage name="search" class="invalid-feedback" />
      </div>
      <div class="col-12 col-md-3 d-grid">
        <button
          class="btn btn-outline-success"
          :class="{ disabled: adStore.loading }"
          type="submit"
        >
          Search
        </button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="accordion" id="accordion-search">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button"
                :class="{ 'is-invalid': errors.search }"
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
                        :class="{ 'is-invalid': errors.minPrice }"
                        placeholder="Min"
                      />
                      <ErrorMessage name="minPrice" class="invalid-feedback" />
                    </div>
                  </div>
                  <div class="col-12 col-sm-6">
                    <div class="input-group">
                      <span class="input-group-text">€ Max.</span>
                      <input
                        name="maxPrice"
                        type="text"
                        v-model="maxPrice"
                        class="form-control"
                        :class="{ 'is-invalid': errors.maxPrice }"
                        placeholder="Max"
                      />
                      <ErrorMessage name="maxPrice" class="invalid-feedback" />
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
                      :class="{ 'is-invalid': errors.orderByPrice }"
                    >
                      <option selected value="no">Choose...</option>
                      <option value="asc">Price (Ascendant)</option>
                      <option value="desc">Price (Descendant)</option>
                    </select>
                    <ErrorMessage
                      name="orderByPrice"
                      class="invalid-feedback"
                    />
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
  </Form>
</template>

<style>
#advanced-search-btn {
  padding: 9px 20px;
}
</style>
