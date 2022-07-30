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
    <div class="flex gap-2 items-center">
      <span class="text-2xl font-bold text-gray-600">Hello</span>
      <span v-if="user" class="text-xl font-bold text-gray-600">{{
        user.name
      }}</span>
    </div>
  </Authenticated>
</template>
