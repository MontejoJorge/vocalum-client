<script setup>
  import { useAdStore } from "../stores/ads";
  import Tags from "../components/Tags.vue";
  import { ref } from 'vue';

  const adStore = useAdStore();
  const ad = ref({
    title: "",
    description: "",
    price: "",
    photo: "",
    tags: ['']
  });

  function createAd() {
    adStore.createAd(ad.value);
  }
  function onChangeFileUpload(event) {
    ad.value.photo = event.target.files[0];
  }
</script>

<template>
  <h2>Create</h2>
  <form @submit.prevent="createAd">
    <label>Title</label>
    <input type="text" v-model="ad.title" />
    <label>Desc</label>
    <input type="text" v-model="ad.description" />
    <label>Price</label>
    <input type="text" v-model="ad.price" />
    <label>Photo</label>
    <input type="file" @change="onChangeFileUpload"/>

    <Tags :tags="ad.tags"/>

    <button type="submit">Crear</button>
  </form>
</template>