<template>
    <q-page class="window-height window-width row justify-center items-center">
        <div class="column">
            <div class="row">
                <h5 class="text-h5 text-white q-my-md">Reset password</h5>
            </div>
            <div class="row">
                <q-card square bordered class="q-pa-lg shadow-1">
                    <q-card-section>
                        <q-form class="q-gutter-lg">
                            <q-input square filled clearable v-model="email" type="email" label="Email"
                                color="orange" />
                        </q-form>
                    </q-card-section>
                    <q-card-actions class="q-px-md">
                        <q-btn unelevated color="orange" size="lg" class="full-width" label="Reset"
                            @click="submitResetPassword" />
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
import { useRouter } from 'vue-router'
// Route Reference
const router = useRouter()

let email = $ref('');

const submitResetPassword = async () => {
    axios.post(url('backend/forgot'), {
        email: email
    })
        .then(function (response) {
            // Display a notification
            Notify.create({
                message: 'An email has been sent to you with a link to reset your password',
                color: 'green'
            });
            router.push('/login');
        });
};

</script>
