<script setup>
  const props = defineProps({
    tags: {
      type: Array,
      default: ['']
    }
  });

  const addField = () => {
    if (props.tags.length >= 3) return;

    props.tags.push('');
  }

  const removeField = (n) => {
    props.tags.splice(n, 1);
  }

</script>

<template>
  <div class="container mb-3">
    <div v-for="(tag, i) in props.tags" class="row mb-2">
      <div :class="(i == 0 ) ? 'col-12' : 'col-9'">
        <input type="text" v-model="props.tags[i]" name="tags[]" class="form-control mb-0" placeholder="Tag"/>
      </div>
      <div v-if="i!=0" class="col-3 d-grid">
        <div @click="removeField(i)" class="btn btn-danger">Remove</div>
      </div>
    </div>
    <div v-if="props.tags.length < 3" class="row">
      <div class="col d-grid">
        <div @click="addField" class="btn btn-success">Add more tags</div>
      </div>
    </div>
  </div>
</template>