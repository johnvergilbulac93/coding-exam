import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Http.interceptors.request.use(
//   (config) => {
//     // Called on request
//     // NProgress.start()

//     return config;
//   },
//   (error) => {
//     // NProgress.done()

//     return Promise.reject(error);
//   }
// );
// Http.interceptors.response.use(
//   (response) => {
//     // Called on response
//     // NProgress.done()

//     return response;
//   },
//   (error) => {
//     // NProgress.done()

//     // store.commit("CHECK_SESSION", true);

//     const { status } = error.response;

//     const UNAUTHORIZED = 401;

//     if (status === UNAUTHORIZED) {
//       Message.error({
//         background: true,
//         content: "Session Expired. Please reload the page to continue.",
//       });
//     }
//     return Promise.reject(error);
//   }
// );
let Http = function () {
  let token = localStorage.getItem("token");

  if (token) {
    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return Api;
};

export default Http;
