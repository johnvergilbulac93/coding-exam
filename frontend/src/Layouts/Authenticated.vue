<script setup>
import Dropdown from "@/Components/Dropdown.vue";
import NavLink from "@/Components/NavLink.vue";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.vue";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const showingNavigationDropdown = ref(false);

const user = computed(() => {
  return store.getters["User/authenticated"];
});

const handleLogout = () => {
  store.dispatch("User/logout");
};
onMounted(() => {
  store.dispatch("User/getAuthenticatedUser");
});
</script>

<template>
  <div>
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white border-b border-gray-200">
        <!-- Primary Navigation Menu -->
        <div class="max-w-7xl mx-auto px-2">
          <div class="flex justify-between h-16">
            <div class="flex item-center justify-between w-1/2">
              <div class="shrink-0 flex items-center">
                <router-link
                  to="/dashboard"
                  class="font-bold text-gray-500 text-2xl hover:text-gray-700 transition ease-in-out duration-150"
                >
                  Coding Exam
                </router-link>
              </div>

              <div class="shrink-0 flex gap-4 items-center">
                <router-link
                  to="/user"
                  class="font-semibold text-gray-500 hover:text-gray-700 transition ease-in-out duration-150"
                >
                  User
                </router-link>
                <router-link
                  to="/role"
                  class="font-semibold text-gray-500 hover:text-gray-700 transition ease-in-out duration-150"
                >
                  Role
                </router-link>
              </div>
            </div>

            <div class="hidden sm:flex sm:items-center sm:ml-6">
              <!-- Settings Dropdown -->
              <div class="ml-3 relative">
                <Dropdown align="right" width="48">
                  <template #trigger>
                    <span class="inline-flex rounded-md">
                      <button
                        type="button"
                        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                      >
                        <span v-if="user" class="capitalize">
                          {{ user.name }}</span
                        >

                        <svg
                          class="ml-2 -mr-0.5 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </template>

                  <template #content>
                    <span
                      @click="handleLogout"
                      class="block cursor-pointer w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                    >
                      Logout</span
                    >
                  </template>
                </Dropdown>
              </div>
            </div>

            <!-- Hamburger -->
            <div class="-mr-2 flex items-center sm:hidden">
              <button
                @click="showingNavigationDropdown = !showingNavigationDropdown"
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              >
                <svg
                  class="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    :class="{
                      hidden: showingNavigationDropdown,
                      'inline-flex': !showingNavigationDropdown,
                    }"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    :class="{
                      hidden: !showingNavigationDropdown,
                      'inline-flex': showingNavigationDropdown,
                    }"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Responsive Navigation Menu -->
        <div
          :class="{
            block: showingNavigationDropdown,
            hidden: !showingNavigationDropdown,
          }"
          class="sm:hidden"
        >
          <div class="pt-2 pb-3 space-y-1">
            <span
              class="block pl-3 pr-4 py-2 border-l-4 cursor-pointer border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
              >User</span
            >
            <span
              class="block pl-3 pr-4 py-2 border-l-4 cursor-pointer border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
              >Role</span
            >
          </div>

          <!-- Responsive Settings Options -->
          <div class="pt-4 pb-1 border-t border-gray-200">
            <div class="px-4">
              <div class="font-medium text-base text-gray-800">
                <span v-if="user"> {{ user.email }}</span>
              </div>
              <div class="font-medium text-sm text-gray-500">
                <span v-if="user" class="capitalize"> {{ user.name }}</span>
              </div>
            </div>

            <div class="mt-3 space-y-1">
              <span
                @click="handleLogout"
                class="block pl-3 pr-4 py-2 border-l-4 cursor-pointer border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
              >
                Log Out</span
              >
            </div>
          </div>
        </div>
      </nav>

      <!-- Page Content -->
      <main
        class="mt-4 max-w-7xl mx-auto bg-white rounded-lg shadow p-6 space-y-2"
      >
        <slot />
      </main>
    </div>
  </div>
</template>
