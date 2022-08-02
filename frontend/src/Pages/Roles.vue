<script setup>
import Authenticated from "@/Layouts/Authenticated.vue";
import Pagination from "@/components/Pagination.vue";
import Button from "@/Components/Button.vue";
import Input from "@/Components/Input.vue";
import Label from "@/Components/Label.vue";

import _ from "lodash";
import { computed, onMounted, reactive, ref, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
const store = useStore();

const roles = computed(() => {
  return store.getters["Role/roles"];
});
const perPage = computed(() => {
  return store.state.perPage;
});
const modal = computed(() => {
  return store.state.modal;
});
const errors = computed(() => {
  return store.state.errors;
});
const loading = computed(() => {
  return store.state.loading;
});

const filter = reactive({
  length: "10",
  search: "",
  dir: "desc",
});
const form = reactive({
  currentPage: 1,
  id: "",
  name: "",
  description: "",
});

const editMode = ref(false);

const pagination = computed(() => {
  return store.state.pagination;
});

const handleCreate = () => {
  const payload = {
    name: form.name,
    description: form.description,
  };
  store.dispatch("Role/createRole", payload).then(() => {
    showRoles();
  });
};
const handleUpdate = () => {
  const payload = {
    id: form.id,
    name: form.name,
    description: form.description,
  };
  store.dispatch("Role/updateRole", payload).then(() => {
    showRoles();
  });
};

const handleDelete = (id) => {
  store.dispatch("Role/deleteRole", id).then(() => {
    showRoles();
  });
};
watch(
  filter,
  _.throttle(function () {
    showRoles();
  }, 2000)
);

const showRoles = () => {
  let filterData = {
    length: filter.length,
    search: filter.search,
    dir: filter.dir,
  };
  store.dispatch("Role/getRoles", {
    filter: filterData,
    page: form.currentPage,
  });
};
const handleReset = () => {
  form.id = "";
  form.name = "";
  form.description = "";
};
const addUser = () => {
  editMode.value = false;
  store.commit("MODAL", true);
  store.commit("CLEAR_ERRORS");
  handleReset();
};
const editUser = (param) => {
  editMode.value = true;
  store.commit("MODAL", true);
  store.commit("CLEAR_ERRORS");
  handleReset();
  form.id = param.id;
  form.name = param.name;
  form.description = param.description;
};
const clear = () => {
  filter.search = "";
};
const closeModal = () => {
  store.commit("MODAL", false);
};

const nextPage = () => {
  form.currentPage++;
  showRoles();
};
const prevPage = () => {
  form.currentPage--;
  showRoles();
};
onMounted(() => {
  showRoles();
});
</script>
<template>
  <Authenticated>
    <div class="flex justify-between items-center">
      <label for="" class="text-lg font-semibold text-gray-600">Role List</label>
      <button @click="addUser"
        class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150">
        Add
      </button>
    </div>

    <div class="flex items-center justify-between">
      <div class="relative">
        <label for="table-search" class="sr-only">Search</label>
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"></path>
          </svg>
        </div>

        <button class="absolute inset-y-0 right-2 flex items-center pl-3 cursor-pointer group" v-if="filter.search"
          @click="clear">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500 group-hover:text-red-500"
            viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
        </button>
        <input v-model="filter.search" type="text" id="table-search"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-80 pl-10 p-2.5"
          placeholder="Search for role" />
      </div>
      <div class="flex gap-2 items-center text-gray-600">
        <span class="text-sm">Show</span>
        <select v-model="filter.length"
          class="py-1 border-gray-300 text-base font-medium whitespace-nowrap text-gray-600 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm">
          <option :value="page" v-for="(page, i) in perPage" :key="i">
            {{ page }}
          </option>
        </select>
        <span class="text-sm">Entries</span>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="!roles.length">
          <td class="text-center" colspan="4">No matching records found</td>
        </tr>

        <tr v-for="(role, i) in roles" :key="i">
          <td>{{ i + 1 }}</td>
          <td scope="row">
            {{ role.name }}
          </td>
          <td>
            {{ role.description }}
          </td>
          <td class="flex gap-2">
            <span @click="editUser(role)" class="font-medium text-indigo-600 hover:underline cursor-pointer">Edit</span>
            |
            <span @click="handleDelete(role.id)"
              class="font-medium text-indigo-600 hover:underline cursor-pointer">Delete</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pagination="pagination" @prev="prevPage(pagination.prevPageUrl)"
      @next="nextPage(pagination.nextPageUrl)" />
    <Teleport to="body">
      <div class="fixed inset-0 bg-black/50 flex justify-center items-center" v-if="modal">
        <div class="w-1/2 bg-white rounded">
          <div class="p-2 text-gray-600 flex justify-between items-center border-b">
            <label for="" class="text-xl font0-semibold">{{
                editMode ? "Update Role" : "Create Role"
            }}</label>
            <svg @click="closeModal" xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 cursor-pointer hover:text-gray-700 transition duration-300" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <form @submit.prevent="editMode ? handleUpdate() : handleCreate()">
            <div class="flex justify-center items-center p-5 space-y-2">
              <div class="w-3/4">
                <div>
                  <Label for="name" value="Role Name" />
                  <Input type="text" class="mt-1 block w-full" v-model="form.name"
                    :class="{ 'border-red-500': errors.name }" />
                  <span v-if="errors.name" class="text-xs text-red-500">{{
                      errors.name[0]
                  }}</span>
                </div>
                <div>
                  <Label for="description" value="Role Description" />
                  <Input type="text" class="mt-1 block w-full" :class="{ 'border-red-500': errors.description }"
                    v-model="form.description" />
                  <span v-if="errors.description" class="text-xs text-red-500">{{ errors.description[0] }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-end mt-4 gap-2 p-2 border-t">
              <Button class="ml-4" :class="{ 'opacity-25': loading }" :disabled="loading">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </Authenticated>
</template>
