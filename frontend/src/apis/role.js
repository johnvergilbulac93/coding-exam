import Api from "./baseAPI";

export default {
  roles() {
    return Api().get("/role/show");
  },
};
