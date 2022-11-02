<script setup>
const props = defineProps({
  tags: {
    type: Array,
    default: [''],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const addField = () => {
  if (props.tags.length >= 3) return;

  props.tags.push('');
};

const removeField = (n) => {
  props.tags.splice(n, 1);
};

const parseTag = (i) => {
  if (!props.tags[i]) return;
  props.tags[i] = props.tags[i].trim().toLowerCase().replace(/\s+/g, '-');
};
</script>

<template>
  <div class="mb-3">
    <div v-for="(tag, i) in props.tags" class="row mb-2">
      <div :class="i == 0 ? 'col-12' : 'col-9'">
        <input
          type="text"
          v-model="props.tags[i]"
          name="tags[]"
          class="form-control mb-0"
          placeholder="Tag"
          @focusout="parseTag(i)"
        />
      </div>
      <div v-if="i != 0" class="col-3 d-grid">
        <div
          @click="removeField(i)"
          class="btn btn-danger"
          :class="{ disabled: props.disabled }"
        >
          <i class="bi bi-trash3"></i>
        </div>
      </div>
    </div>
    <div v-if="props.tags.length < 3" class="row">
      <div class="col d-grid">
        <div
          @click="addField"
          class="btn btn-success"
          :class="{ disabled: props.disabled }"
        >
          Add more tags
        </div>
      </div>
    </div>
  </div>
</template>
