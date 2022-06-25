// import the endpoint
import { url } from "../boot/endpoint";
// Import the axios
import { api } from "../boot/axiosAuth";
const axios = api;

// import the middleware to check if the user is logged in
import * as auth from "../boot/middleware/auth";

export default [
    {
        name: "login",
        path: "/login",
        component: () => import("layouts/Login.vue"),
        children: [
            { path: "", component: () => import("pages/auth/Login.vue") }
        ],
        beforeEnter: [auth.isAuthenticated]
    },
    {
        name: "logout",
        path: "/logout",
        beforeEnter: (to) => {
            // Does a axios request to check if the token is valid
            axios.post(url('backend/logout'));
            return {
                path: '/login',
                query: {},
            };
        }
    },
    {
        name: "register",
        path: "/register",
        component: () => import("layouts/Login.vue"),
        children: [
            { path: "", component: () => import("pages/auth/Register.vue") },
        ],
        beforeEnter: [auth.isAuthenticated]
    },
    {
        name: "forgot_password",
        path: "/forgot_password",
        component: () => import("layouts/Login.vue"),
        children: [
            { path: "", component: () => import("pages/auth/Forgot.vue") },
        ],
        beforeEnter: [auth.isAuthenticated]
    },
    {
        name: "reset",
        path: "/reset",
        parameters: { token: String },
        component: () => import("layouts/Login.vue"),
        children: [
            { path: "", component: () => import("pages/auth/Reset.vue") },
        ],
        beforeEnter: [auth.isAuthenticated]
    },
];
