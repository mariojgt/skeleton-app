
// import the endpoint
import { url } from "../endpoint";
// Import the axios
import { api } from "../axiosAuth";
const axios = api;
// Import the storage
import * as storage from "../storage";
// Import the quasar framework notifier
import { Notify } from 'quasar';

/**
 * Check if the user is logged in if yes, save the info in the storage else redirect to the login page
 *
 * @param {*} to // Vue
 * @returns
 */
export const checkAuth = async (to) => {
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
        // Reset the storage
        storage.setUserInfo(null);
        return {
            path: '/login',
            query: {},
        };
    }
}

/**
 * Check if the user has been previously logged in
 *
 * @param {*} to
 * @returns
 */
export const isAuthenticated = async (to) => {
    // Wait for the response
    if (storage.getUserInfo()) {
        // Redirect to the dashboard
        Notify.create({
            message: 'Welcome back',
            color: 'green'
        });
        return {
            path: '/pos',
            query: {},
        };
    }
}
