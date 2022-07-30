<script setup>
import GuestLayout from "@/Layouts/Guest.vue";
import Button from "@/Components/Button.vue";
import Input from "@/Components/Input.vue";
import Label from "@/Components/Label.vue";
import ValidationErrors from "@/Components/ValidationErrors.vue";

import { onMounted, computed, reactive } from "vue";
import { useStore } from "vuex";

const store = useStore();

const form = reactive({
  email: "",
  password: "",
});

const loading = computed(() => {
  return store.state.loading;
});

const handleLogin = () => {
  const payload = {
    email: form.email,
    password: form.password,
  };
  store.dispatch("User/login", payload);
};
onMounted(() => {
  store.commit("CLEAR_ERRORS");
});
</script>
<template>
  <GuestLayout title="login form">
    <ValidationErrors class="mb-4" />

    <form @submit.prevent="handleLogin" class="space-y-2">
      <div>
        <Label for="login" value="Email" />
        <Input
          type="text"
          class="mt-1 block w-full"
          autofocus
          v-model="form.email"
        />
      </div>

      <div>
        <Label for="password" value="Password" />
        <Input
          type="password"
          class="mt-1 block w-full"
          autocomplete="current-password"
          v-model="form.password"
        />
      </div>

      <div class="flex items-center justify-between mt-4 gap-2">
        <div class="flex gap-1 items-center text-sm">
          Not yet register?
          <router-link to="/register" class="underline text-blue-500">
            Click here</router-link
          >
        </div>
        <Button
          class="ml-4"
          :class="{ 'opacity-25': loading }"
          :disabled="loading"
        >
          Log in
        </Button>
      </div>
    </form>
  </GuestLayout>
</template>
