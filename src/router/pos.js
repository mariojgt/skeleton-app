// import the endpoint
import { url } from "../boot/endpoint.js";
// Import the axios
import { api } from "../boot/axiosAuth.js";
const axios = api;

async function checkAuth(to) {
    let canContinue = false;
    // Does a axios request to check if the token is valid
    await axios.post(url('user/info'))
        .then(function (response) {
            canContinue = true;
        })
        .catch(function (error) {
            canContinue = false;
        });
    // Wait for the response
    if (canContinue == false) {
        return {
            path: '/login',
            query: {},
        };
    }
}

export default [
    // Users routes
    {
        path: "/user/view",
        parameters: { user: String },
        component: () => import("layouts/MainLayout.vue"),
        children: [
            { path: "", component: () => import("src/pages/user/View.vue") },
        ],
        beforeEnter: [checkAuth]
    },
    // The main page need to be login to access
    {
        path: "/pos",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            { path: "", component: () => import("src/pages/pos/Index.vue") },
        ],
        beforeEnter: [checkAuth]
    }
];
