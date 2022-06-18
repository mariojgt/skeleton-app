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
];
