export default [
  {
    name: "login",
    path: "/login",
    component: () => import("layouts/Login.vue"),
    children: [{ path: "", component: () => import("pages/auth/Login.vue") }],
  },
  {
    name: "register",
    path: "/register",
    component: () => import("layouts/Login.vue"),
    children: [
      { path: "", component: () => import("pages/auth/Register.vue") },
    ],
  },
  {
    name: "forgot_password",
    path: "/forgot_password",
    component: () => import("layouts/Login.vue"),
    children: [
      { path: "", component: () => import("pages/auth/Forgot.vue") },
    ],
  },
  {
    name: "reset",
    path: "/reset",
    parameters: { token: String },
    component: () => import("layouts/Login.vue"),
    children: [
      { path: "", component: () => import("pages/auth/Reset.vue") },
    ],
  },
];
