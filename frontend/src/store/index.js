import { createStore } from "vuex";
import User from "./modules/User";
import Role from "./modules/Role";
import Http from "../apis/role";

const store = createStore({
  state: {
    errors: {},
    loading: false,
    token: null || localStorage.getItem("token"),
    perPage: ["10", "25", "50", "100"],
    pagination: {
      lastPage: "",
      currentPage: "",
      total: "",
      lastPageUrl: "",
      nextPageUrl: "",
      prevPageUrl: "",
      from: "",
      to: "",
    },
    roles: [],
    modal: false,
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_ERRORS(state, payload) {
      state.errors = payload;
    },
    CLEAR_ERRORS(state) {
      state.errors = {};
    },
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    SET_PAGINATION(state, pagination) {
      state.pagination = {
        lastPage: pagination.last_page,
        currentPage: pagination.current_page,
        total: pagination.total,
        lastPageUrl: pagination.last_page_url,
        nextPageUrl: pagination.next_page_url,
        prevPageUrl: pagination.prev_page_url,
        from: pagination.from,
        to: pagination.to,
      };
    },
    SET_ROLES(state, payload) {
      state.roles = payload;
    },
    MODAL(state, payload) {
      state.modal = payload;
    },
  },
  actions: {
    async getRoles({ commit }) {
      try {
        const { status, data } = await Http.roles();
        if (status == 200) {
          commit("SET_ROLES", data);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  modules: {
    User,
    Role,
  },
});

export default store;
