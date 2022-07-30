<script setup>
import Authenticated from "@/Layouts/Authenticated.vue";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const user = computed(() => {
  return store.getters["User/authenticated"];
});
</script>
<template>
  <Authenticated>
    <label for="dashboard" class="block text-xl font-bold text-gray-600"
      >DASHBOARD</label
    >
    <div class="flex gap-2 items-center">
      <span v-if="user" class="text-xl font-semibold text-gray-600 capitalize"
        >WELCOME, {{ user.name }}</span
      >
    </div>
  </Authenticated>
</template>
