import User from "../../apis/user";
import router from "../../router/index";
export default {
  namespaced: true,
  state: {
    title: "User Module",
    user: null,
    users: [],
  },
  mutations: {
    SET_AUTH_USER(state, payload) {
      state.user = payload;
    },
    SET_USERS(state, payload) {
      state.users = payload;
    },
  },
  actions: {
    async register({ commit }, payload) {
      commit("SET_LOADING", true, { root: true });
      try {
        const { status, data } = await User.register(payload);
        if (status == 201) {
          commit("SET_LOADING", false, { root: true });
          commit("CLEAR_ERRORS", "", {
            root: true,
          });
        }
      } catch (error) {
        commit("SET_LOADING", false, { root: true });
        const { status, data } = error.response;
        switch (status) {
          case 422:
            let err = [];
            let errors = [];
            for (let msg in data.errors) {
              err.push(data.errors[msg]);
            }
            err.forEach((data) => {
              errors.push(data[0]);
            });
            commit("SET_ERRORS", errors, {
              root: true,
            });
            break;
          default:
            break;
        }
      }
    },
    async login({ commit }, payload) {
      commit("SET_LOADING", true, { root: true });
      try {
        const { status, data } = await User.login(payload);
        if (status == 200) {
          commit("SET_LOADING", false, { root: true });
          commit("CLEAR_ERRORS", "", {
            root: true,
          });
          commit("SET_TOKEN", data, { root: true });
          localStorage.setItem("token", data);
          router.push("/dashboard");
        }
      } catch (error) {
        commit("SET_LOADING", false, { root: true });
        const { status, data } = error.response;
        switch (status) {
          case 422:
            let err = [];
            let errors = [];
            for (let msg in data.errors) {
              err.push(data.errors[msg]);
            }
            err.forEach((data) => {
              errors.push(data[0]);
            });
            commit("SET_ERRORS", errors, {
              root: true,
            });
            break;
          default:
            break;
        }
      }
    },
    async logout({ commit }) {
      commit("SET_LOADING", true, { root: true });
      try {
        const { status } = await User.logout();
        if (status == 200) {
          commit("SET_LOADING", false, { root: true });
          localStorage.removeItem("token");
          router.push("/login");
        }
      } catch (error) {
        commit("SET_LOADING", false, { root: true });
      }
    },
    async getAuthenticatedUser({ commit }) {
      commit("SET_LOADING", true, { root: true });
      try {
        const { status, data } = await User.authenticatedUser();
        if (status == 200) {
          commit("SET_LOADING", false, { root: true });
          commit("SET_AUTH_USER", data);
        }
      } catch (error) {
        commit("SET_LOADING", false, { root: true });
      }
    },
    async getUser({ commit }, { page, filter }) {
      commit("SET_LOADING", true, { root: true });
      try {
        const { status, data } = await User.show(page, filter);
        if (status == 200) {
          commit("SET_LOADING", false, { root: true });
          commit("SET_USERS", data.data);
          commit("SET_PAGINATION", data, { root: true });
        }
      } catch (error) {
        commit("SET_LOADING", false, { root: true });
      }
    },
    async createUser({ commit }, payload) {
      commit("SET_LOADING", true, { root: true });
      try {
        const { status, data } = await User.create(payload);
        if (status == 201) {
          commit("SET_LOADING", false, { root: true });
          commit("MODAL", false, { root: true });
          alert(`${data.message}`);
        }
      } catch (error) {
        commit("SET_LOADING", false, { root: true });
        const { status, data } = error.response;
        switch (status) {
          case 422:
            commit("SET_ERRORS", data.errors, {
              root: true,
            });
            break;
          default:
            break;
        }
      }
    },
    async updateUser({ commit }, payload) {
      commit("SET_LOADING", true, { root: true });
      try {
        const { status, data } = await User.update(payload);
        if (status == 200) {
          commit("SET_LOADING", false, { root: true });
          commit("MODAL", false, { root: true });
          alert(`${data.message}`);
        }
      } catch (error) {
        commit("SET_LOADING", false, { root: true });
        const { status, data } = error.response;
        switch (status) {
          case 422:
            commit("SET_ERRORS", data.errors, {
              root: true,
            });
            break;
          default:
            break;
        }
      }
    },
    async deleteUser({ commit }, id) {
      let result = confirm("Do you want to delete this user?");
      if (result == true) {
        try {
          const { status, data } = await User.remove(id);
          if (status == 200) {
            alert(`${data.message}`);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("You canceled!");
      }
    },
  },

  getters: {
    authenticated(state) {
      return state.user;
    },
    users(state) {
      return state.users;
    },
  },
};
