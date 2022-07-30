<script setup>
import { computed } from "vue";

defineProps({
  pagination: Object,
});
</script>
<template>
  <div class="flex justify-between items-center p-2 text-gray-600">
    <span class="text-sm"
      >Showing {{ !pagination.from ? 0 : pagination.from }} to
      {{ !pagination.to ? 0 : pagination.to }} of
      {{ pagination.total }} entries</span
    >
    <div class="inline-flex">
      <button
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l text-xs uppercase font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="!pagination.prevPageUrl"
        @click="$emit('prev')"
      >
        Prev
      </button>
      <button
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r text-xs uppercase font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="!pagination.nextPageUrl"
        @click="$emit('next')"
      >
        Next
      </button>
    </div>
  </div>
</template>
