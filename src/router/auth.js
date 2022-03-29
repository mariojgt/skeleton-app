export default [
  {
    path: "/login",
    component: () => import("layouts/Login.vue"),
    children: [{ path: "", component: () => import("pages/auth/Login.vue") }],
  },
];
