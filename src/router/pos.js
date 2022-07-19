// import the middleware to check if the user is logged in
import * as auth from "../boot/middleware/auth";

export default [
    // Users routes
    {
        path: "/user",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            {
                path: "profile",
                component: () => import("src/pages/user/View.vue"),
                parameters: { user: String },
            },
        ],
        beforeEnter: [auth.checkAuth]
    },
    // The main page need to be login to access
    {
        path: "/pos",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            { path: "", component: () => import("src/pages/pos/Index.vue") },
        ],
        beforeEnter: [auth.checkAuth]
    },
    // Till routes
    {
        path: "/till",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            { path: "index", component: () => import("src/pages/till/Index.vue") },
        ],
        beforeEnter: [auth.checkAuth]
    },
    {
        path: "/product",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            { path: "index", component: () => import("src/pages/products/Index.vue") },
            { name: "product-create", path: "create", component: () => import("src/pages/products/Create.vue") },
            {
                name: "product-edit",
                path: "edit", component: () => import("src/pages/products/Edit.vue"),
                parameters: { product: String },
            },
        ],
        beforeEnter: [auth.checkAuth]
    },
    {
        path: "/category",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            { path: "index", component: () => import("src/pages/category/Create.vue") },
        ],
        beforeEnter: [auth.checkAuth]
    },
    // System Mode
    {
        path: "/mode",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            { name: "system-mode", path: "index", component: () => import("src/pages/systemMode/Index.vue") },
        ],
        beforeEnter: [auth.checkAuth]
    },
    // Order Mode
    {
        path: "/order",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            { name: 'order-index', path: "index", component: () => import("src/pages/orderMode/Index.vue") },
            {
                path: "create-edit",
                name: "order-create",
                component: () => import("src/pages/orderMode/CreateEdit.vue"),
                parameters: { order: String },
            },
        ],
        beforeEnter: [auth.checkAuth]
    }
];
