import Role from "../../apis/role";
export default {
  namespaced: true,
  state: {
    title: "Role Module",
    roles: [],
  },
  mutations: {
    SET_ROLES(state, payload) {
      state.roles = payload;
    },
  },
  actions: {
    async getRoles({ commit }, { page, filter }) {
      commit("SET_LOADING", true, { root: true });
      try {
        const { status, data } = await Role.show(page, filter);
        if (status == 200) {
          commit("SET_LOADING", false, { root: true });
          commit("SET_ROLES", data.data);
          commit("SET_PAGINATION", data, { root: true });
        }
      } catch (error) {
        commit("SET_LOADING", false, { root: true });
      }
    },
    async createRole({ commit }, payload) {
      commit("SET_LOADING", true, { root: true });
      try {
        const { status, data } = await Role.create(payload);
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
    async updateRole({ commit }, payload) {
      commit("SET_LOADING", true, { root: true });
      try {
        const { status, data } = await Role.update(payload);
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
    async deleteRole({ commit }, id) {
      let result = confirm("Do you want to delete this user?");
      if (result == true) {
        try {
          const { status, data } = await Role.remove(id);
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
    roles(state) {
      return state.roles;
    },
  },
};
