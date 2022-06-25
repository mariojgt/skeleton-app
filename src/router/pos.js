// import the endpoint
import { url } from "../boot/endpoint";
// Import the axios
import { api } from "../boot/axiosAuth";
const axios = api;
// Import the storage
import * as storage from "../boot/storage";

async function checkAuth(to) {
    let canContinue = false;
    // Does a axios request to check if the token is valid
    await axios.post(url('user/info'))
        .then(function (response) {
            canContinue = true;
            storage.setUserInfo(response.data.data);
        })
        .catch(function (error) {
            canContinue = false;
            storage.setUserInfo(null);
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
        path: "/user",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            {
                path: "profile",
                component: () => import("src/pages/user/View.vue"),
                parameters: { user: String },
            },
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
