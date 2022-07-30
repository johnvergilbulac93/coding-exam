import Api from "./baseAPI";

export default {
  roles() {
    return Api().get("/role/show");
  },
  show(page, filter) {
    return Api().get(`/role?page${page}`, { params: filter });
  },
  create(form) {
    return Api().post("/role", form);
  },
  update(form) {
    return Api().patch("/role", form);
  },
  remove(id) {
    return Api().delete(`/role/${id}`);
  },
};
