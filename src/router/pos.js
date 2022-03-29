export default [
  {
    path: "/pos",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/pos/Index.vue") },
    ],
  },
];
