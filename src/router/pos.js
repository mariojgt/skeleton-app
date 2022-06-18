export default [
    {
        path: "/pos",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            { path: "", component: () => import("src/pages/pos/index.vue") },
        ],
    },

    // Bar mode
    {
        path: "/bar",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            { path: "", component: () => import("src/pages/barMode/index.vue") },
        ],
    },
];
