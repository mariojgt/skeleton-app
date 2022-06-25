<template>
    <q-page>
        <div class="q-pa-md">
            <div class="row">
                <div class="col">
                    <div>
                        <q-splitter v-model="splitterModel">

                            <template v-slot:before>
                                <q-tabs v-model="tab" vertical class="text-teal">
                                    <q-tab name="details" icon="face" label="Details" />
                                    <q-tab name="password" icon="key" label="Password" />
                                </q-tabs>
                            </template>

                            <template v-slot:after>
                                <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up"
                                    transition-next="jump-up">
                                    <q-tab-panel name="details">
                                        <div class="text-h4 q-mb-md">Details</div>
                                        <div class="q-pa-md">
                                            <q-form @submit="onSubmit" @reset="onReset">
                                                <q-avatar size="100px">
                                                    <img :src="userInfo.avatar">
                                                </q-avatar>
                                                <q-input filled v-model="userInfo.first_name" label="First Name"
                                                    class="q-pa-sm" />
                                                <q-input filled v-model="userInfo.last_name" label="Last Name"
                                                    class="q-pa-sm" />
                                                <q-input filled v-model="userInfo.email" label="Email"
                                                    class="q-pa-sm" />
                                                <q-btn label="Update" type="submit" color="orange" />
                                            </q-form>
                                        </div>
                                    </q-tab-panel>

                                    <q-tab-panel name="password">
                                        <div class="text-h4 q-mb-md">Password</div>
                                        <q-form @submit="onSubmit" @reset="onReset">
                                            <q-input filled v-model="password" label="Password" type="password"
                                                class="q-pa-sm" />
                                            <q-input filled v-model="password_confirm" label="Confirm Password"
                                                type="password" class="q-pa-sm" />
                                            <q-btn label="Update" type="submit" color="orange" />
                                        </q-form>
                                    </q-tab-panel>
                                </q-tab-panels>
                            </template>

                        </q-splitter>
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from 'vue-router'

// Import the storage
import * as storage from "../../boot/storage";

// User basic info
let userInfo = storage.getUserInfo();
// User password
let password = $ref('');
let password_confirm = $ref('');

// Route Reference
const route = useRoute();
const router = useRouter();

let test = $ref("asdsa");

let tab = $ref('details');
let splitterModel = $ref(20);

</script>
