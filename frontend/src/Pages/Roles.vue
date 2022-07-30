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
  <Authenticated> role component </Authenticated>
</template>
