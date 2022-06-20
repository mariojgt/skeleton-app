// import the endpoint
import { url } from "../boot/endpoint.js";
// Import the axios
import { api } from "../boot/axiosAuth.js";
const axios = api;

export default [
    {
        name: "login",
        path: "/login",
        component: () => import("layouts/Login.vue"),
        children: [{ path: "", component: () => import("pages/auth/Login.vue") }],
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
