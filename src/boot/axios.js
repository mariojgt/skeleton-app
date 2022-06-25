import axios from "axios";
// Import the quasar framework notifier
import { Notify } from 'quasar';

const api = axios.create({});

// Add XMLHttpRequest to axios
api.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// Add a response interceptor
api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        const status = error.response.status;
        if (status === 401) {
            // Display a notification
            Notify.create({
                message: error.response.data.data,
                color: 'orange'
            });
        } else if (
            status === 402) {
            console.log("402");
        } else if (
            status === 403
        ) {
            console.log("403");
        } else if (status === 400) {
            // Validation error manually handled
            for (const [key, value] of Object.entries(error.response.data)) {
                // Display a notification
                Notify.create({
                    message: value[0],
                    color: 'red'
                });
            }
        } else if (status === 422) {
            // Validation error automatically handled
            for (const [key, value] of Object.entries(error.response.data.errors)) {
                // Display a notification
                Notify.create({
                    message: value[0],
                    color: 'red'
                });
            }
        }

        return Promise.reject(error);
    }
);

export { api, axios };
