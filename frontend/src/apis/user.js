import Api from "./baseAPI";

export default {
  register(form) {
    return Api().post("/auth/register", form);
  },
  login(form) {
    return Api().post("/auth/login", form);
  },
  authenticatedUser() {
    return Api().get("/auth/user");
  },
  logout() {
    return Api().post("/user/logout");
  },
  show(page, filter) {
    return Api().get(`/user?page=${page}`, { params: filter });
  },
  create(form) {
    return Api().post("/user", form);
  },
  update(form) {
    return Api().patch("/user", form);
  },
  remove(id) {
    return Api().delete(`/user/${id}`);
  },
};
