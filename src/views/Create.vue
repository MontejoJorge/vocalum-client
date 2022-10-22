<script setup>
import $ from 'jquery';
import { ref } from 'vue';
import { useAdStore } from '../stores/ads';
import Tags from '../components/Tags.vue';

const adStore = useAdStore();
const ad = ref({
  title: '',
  description: '',
  price: '',
  photo: '',
  tags: [''],
});

const successMsg = ref(undefined);
const loading = ref(false);
const error = ref(false);

function createAd(event) {
  $('input, .btn, textarea').prop('disabled', true);
  loading.value = true;
  adStore.createAd(ad.value)
    .then(() => {
      ad.value.title = '';
      ad.value.description = '';
      ad.value.price = '';
      ad.value.photo = '';
      $("[type='file']").val(null);
      ad.value.tags = [''];
      successMsg.value = 'Ad posted successfully.';
    })
    .catch((err) => error.value = err)
    .finally(() => {
      $('input, .btn, textarea').prop('disabled', false);
      loading.value = false;
    });
}

function onChangeFileUpload(event) {
  ad.value.photo = event.target.files[0];
}
</script>

<template>
  <form class="container mt-3" @submit.prevent="createAd" style="max-width: 800px">
    <div class="row">
      <div class="col">
        <h3>Product information</h3>
      </div>
    </div>
    <div v-if="error || successMsg" class="row">
      <div v-if="error" class="col">
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          {{ error }}
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
      </div>
      <div v-if="successMsg" class="col">
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          {{ successMsg }}
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="input-group mb-3">
          <span class="input-group-text">Title</span>
          <input type="text" v-model="ad.title" class="form-control" placeholder="In some words...">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Description</span>
          <textarea class="form-control" v-model="ad.description" placeholder="Add relevant information such as condition, model, color..."></textarea>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Price</span>
          <input type="number" v-model="ad.price" class="form-control" placeholder="Price in Euros">
          <span class="input-group-text">€</span>
        </div>
        <div class="input-group mb-3">
          <label class="input-group-text">Photo</label>
          <input type="file" @change="onChangeFileUpload" class="form-control">
        </div>
        <Tags :tags="ad.tags" />
      </div>
    </div>
    <div class="row">
      <div class="col d-grid">
        <button type="submit" class="btn btn-primary">Create</button>
      </div>
    </div>
  </form>
</template>
