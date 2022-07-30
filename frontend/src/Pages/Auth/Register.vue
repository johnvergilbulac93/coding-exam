<script setup>
import GuestLayout from "@/Layouts/Guest.vue";
import Button from "@/Components/Button.vue";
import Input from "@/Components/Input.vue";
import Label from "@/Components/Label.vue";
import ValidationErrors from "@/Components/ValidationErrors.vue";
import { computed, onMounted, reactive, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const form = reactive({
  fullname: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const loading = computed(() => {
  return store.state.loading;
});

const handleReset = () => {
  form.fullname = "";
  form.email = "";
  form.password = "";
  form.password_confirmation = "";
};

const handleSubmit = () => {
  const payload = {
    name: form.fullname,
    email: form.email,
    password: form.password,
    password_confirmation: form.password_confirmation,
  };
  store.dispatch("User/register", payload).then(() => {
    handleReset();
  });
};

onMounted(() => {
  store.commit("CLEAR_ERRORS");
});
</script>
<template>
  <GuestLayout title="registration form">
    <ValidationErrors class="mb-4" />
    <form @submit.prevent="handleSubmit" class="space-y-2">
      <div>
        <Label for="fname" value="Full Name" />
        <Input type="text" class="mt-1 block w-full" v-model="form.fullname" />
      </div>
      <div>
        <Label for="login" value="Email" />
        <Input type="text" class="mt-1 block w-full" v-model="form.email" />
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
      <div>
        <Label for="password_confirmation" value="Confirm Password" />
        <Input
          type="password"
          class="mt-1 block w-full"
          autocomplete="current-password"
          v-model="form.password_confirmation"
        />
      </div>

      <div class="flex items-center justify-between mt-4 gap-2">
        <div class="flex gap-1 items-center text-sm">
          Already register?
          <router-link to="/login" class="underline text-blue-500">
            Click here</router-link
          >
        </div>

        <Button
          class="ml-4"
          :class="{ 'opacity-25': loading }"
          :disabled="loading"
        >
          Submit
        </Button>
      </div>
    </form>
  </GuestLayout>
</template>
