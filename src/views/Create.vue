<script setup>
import $ from 'jquery';
import { ref } from 'vue';
import { ErrorMessage, Form } from 'vee-validate';
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

function createAd(values, actions) {
  $('input, .btn, textarea').prop('disabled', true);
  loading.value = true;
  adStore
    .createAd(ad.value)
    .then(() => {
      ad.value.title = '';
      ad.value.description = '';
      ad.value.price = '';
      ad.value.photo = '';
      $("[type='file']").val(null);
      ad.value.tags = [''];
      successMsg.value = 'Ad posted successfully.';
    })
    .catch((err) => {
      actions.setErrors(err.errors)
    })
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
  <Form @submit="createAd" v-slot="{ errors }" class="container mt-3" style="max-width: 800px">
    <div class="row">
      <div class="col">
        <h3>Product information</h3>
      </div>
    </div>
    <div v-if="successMsg" class="row">
      <div class="col">
        <div
          class="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {{ successMsg }}
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
          ></button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="input-group mb-3">
          <span class="input-group-text">Title</span>
          <input
            name="title"
            type="text"
            v-model="ad.title"
            class="form-control"
            :class="{ 'is-invalid': errors.title }"
            placeholder="In some words..."
          />
          <ErrorMessage name="title" class="invalid-feedback"/>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Description</span>
          <textarea
            name="description"
            v-model="ad.description"
            class="form-control"
            :class="{ 'is-invalid': errors.description }"
            placeholder="Add relevant information such as condition, model, color..."
          ></textarea>
          <ErrorMessage name="description" class="invalid-feedback"/>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Price</span>
          <input
            name="price"
            type="number"
            v-model="ad.price"
            class="form-control"
            :class="{ 'is-invalid': errors.price }"
            placeholder="Price in Euros"
          />
          <span class="input-group-text">€</span>
          <ErrorMessage name="price" class="invalid-feedback"/>
        </div>
        <div class="input-group mb-3">
          <label class="input-group-text">Photo</label>
          <input
            name="photo"
            type="file"
            @change="onChangeFileUpload"
            class="form-control"
            :class="{ 'is-invalid': errors.photo }"
          />
          <ErrorMessage name="photo" class="invalid-feedback"/>
        </div>
        <Tags :tags="ad.tags" />
      </div>
    </div>
    <div class="row">
      <div class="col d-grid">
        <button type="submit" class="btn btn-primary">Create</button>
      </div>
    </div>
  </Form>
</template>
