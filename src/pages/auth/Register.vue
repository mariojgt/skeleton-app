<template>
    <q-page class="window-height window-width row justify-center items-center">
        <div class="column">
            <div class="row">
                <h5 class="text-h5 text-white q-my-md">Register</h5>
            </div>
            <div class="row">
                <q-card square bordered class="q-pa-lg shadow-1">
                    <q-card-section>
                        <q-form class="q-gutter-lg">
                            <q-input square filled clearable v-model="first_name" type="text" label="First Name"
                                color="orange" />
                            <q-input square filled clearable v-model="last_name" type="text" label="Last Name"
                                color="orange" />
                            <q-input square filled clearable v-model="email" type="email" label="Email"
                                color="orange" />
                            <q-input square filled clearable v-model="password" type="password" label="Password"
                                color="orange" />
                            <q-input square filled clearable v-model="password_confirmation" type="password"
                                label="Password Confirm" color="orange" />
                        </q-form>
                    </q-card-section>
                    <q-card-actions class="q-px-md">
                        <q-btn unelevated color="orange" size="lg" class="full-width" label="Register"
                            @click="submitCreateUser" />
                    </q-card-actions>
                    <q-card-section class="text-center q-pa-none">
                        <q-btn flat color="orange" label="Login" to="login" />
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
import { useRoute, useRouter } from 'vue-router'
// Route Reference
const route = useRoute();
const router = useRouter()

let first_name = $ref('');
let last_name = $ref('');
let email = $ref('');
let password = $ref('');
let password_confirmation = $ref('');

const submitCreateUser = async () => {
    axios.post(url('backend/register'), {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
    })
        .then(function (response) {
            console.log(response);
            // Display a notification
            Notify.create({
                message: 'Login Successful',
                color: 'green'
            });
            router.push('/login');
        });
};

</script>
