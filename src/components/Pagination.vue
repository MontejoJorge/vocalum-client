<script setup>
import { computed } from '@vue/reactivity';
import { RouterLink, useRoute } from 'vue-router';
import { useAdStore } from '../stores/ads';

const adStore = useAdStore();

const pages = computed(() => {
  const start = adStore.current_page - 2;
  const end = adStore.current_page + 2;
  const pages = [];
  for (let i = start; i <= end; i++) {
    if (i > 0 && i <= adStore.last_page) {
      pages.push(i);
    }
  }
  return pages;
});
</script>

<template>
  <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item">
      <RouterLink
        class="page-link"
        :class="{ disabled: (adStore.current_page === 1) || adStore.loading }"
        :to="`?page=${adStore.current_page - 1}`"
        >Previous
      </RouterLink>
    </li>
    <li v-for="i in pages" :key="i" class="page-item">
      <RouterLink
        v-if="i != adStore.current_page"
        :to="`?page=${i}`"
        class="page-link"
        :class="{ active: adStore.current_page === i, disabled: adStore.loading }"
        >{{ i }}
      </RouterLink>
      <span
        v-else="i === adStore.current_page"
        :to="`?page=${i}`"
        class="page-link"
        :class="{ active: adStore.current_page === i }"
        >{{ i }}
      </span>
    </li>
    <li class="page-item">
      <RouterLink
        class="page-link"
        :class="{ disabled: (adStore.current_page === adStore.last_page) || adStore.loading }"
        :to="`?page=${adStore.current_page + 1}`"
        >Next</RouterLink
      >
    </li>
  </ul>
</nav>
</template>