const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/Pages/Auth/Login.vue"),
    meta: { guest: true },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/Pages/Auth/Register.vue"),
    meta: { guest: true },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/Pages/Dashboard.vue"),
    meta: { admin: true },
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/Pages/Users.vue"),
    meta: { admin: true },
  },
  {
    path: "/role",
    name: "role",
    component: () => import("@/Pages/Roles.vue"),
    meta: { admin: true },
  },
];

export default routes;
