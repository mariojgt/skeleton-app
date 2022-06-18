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

    // Kitchen mode
    {
        path: "/kitchen",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            { path: "", component: () => import("src/pages/kitchenMode/index.vue") },
        ],
    },

    // Order Mode
    {
        path: "/order",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            { path: "", component: () => import("src/pages/orderMode/index.vue") },
        ],
    },
    {
        path: "/order/view",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            { path: "", component: () => import("src/pages/orderMode/view.vue") },
        ],
    },
    {
        path: "/order/create",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            { path: "", component: () => import("src/pages/orderMode/create.vue") },
        ],
    },
];
