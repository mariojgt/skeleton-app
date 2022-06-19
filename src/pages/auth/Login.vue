<template>
    <q-page class="window-height window-width row justify-center items-center">
        <div class="column">
            <div class="row">
                <h5 class="text-h5 text-white q-my-md">Skeleton Pos </h5>
            </div>
            <div class="row">
                <q-card square bordered class="q-pa-lg shadow-1">
                    <q-card-section>
                        <q-form class="q-gutter-md">
                            <q-input square filled clearable v-model="email" type="email" label="Email"
                                color="orange" />
                            <q-input square filled clearable v-model="password" type="password" label="Password"
                                color="orange" />
                        </q-form>
                    </q-card-section>
                    <q-card-actions class="q-px-md">
                        <q-btn unelevated color="orange" size="lg" class="full-width" label="Login"
                            @click="submitLogin" />
                    </q-card-actions>
                    <q-card-section class="text-center q-pa-none">
                        <q-btn flat color="orange" label="Register" to="register" />
                        <q-btn flat color="orange" label="Reset Password" to="forgot_password" />
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script setup>
// import the vue component
import { defineComponent } from "vue";
// Import the quasar framework notifier
import { Notify } from 'quasar';
// Import the axios
import { api } from "../../boot/axios";
const axios = api;
// Import the storage
import * as storage from "../../boot/storage";
// import the endpoint
import { url } from "../../boot/endpoint";
// Import the router
import { router } from 'vue-router';
let email = $ref('');
let password = $ref('');
console.log(router);
const submitLogin = async () => {
    axios.post(url('backend/login'), {
        email: email,
        password: password,
        device_name: 'mobile',
    })
        .then(function (response) {
            // Handle success
            storage.setAuthToken(response.data.raw_token);
            // Display a notification
            Notify.create({
                message: 'Login Successful',
                color: 'green'
            });
        });
};

</script>
