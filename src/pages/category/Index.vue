<template>
    <q-page>
        <div class="q-pa-md">
            <div class="row">
                <div class="col">
                    <div class="q-pa-md">
                        <q-markup-table flat bordered>
                            <thead>
                                <tr>
                                    <th colspan="5">
                                        <div class="row no-wrap items-center">
                                            <q-icon :name="mdiCashRegister" color="orange" size="70px" />
                                            <div class="text-h4 q-ml-md text-white">Category</div>
                                        </div>
                                    </th>
                                </tr>
                                <tr>
                                    <th class="text-left">Name</th>
                                    <th class="text-right">Is Active</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in categories" :key="index">
                                    <td class="text-left">
                                        <q-input filled v-model="categories[index].name" label="Till Name"
                                            @blur="updateInformation(index)" />
                                    </td>
                                    <td class="text-right">
                                        <q-toggle v-model="categories[index].is_active" label="Is Enable"
                                            @click="updateInformation(index)" />
                                    </td>
                                </tr>
                            </tbody>
                        </q-markup-table>
                    </div>
                </div>
            </div>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-fab vertical-actions-align="right" color="primary" glossy icon="keyboard_arrow_up" direction="up">
                <q-fab-action label-position="left" color="primary" @click="createNew = true" icon="mail"
                    label="Create new" />
            </q-fab>
        </q-page-sticky>

        <q-dialog v-model="createNew">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Create new</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input filled v-model="name" label="Name" />
                    <q-toggle label="Is Enable" v-model="isActive" />

                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="OK" color="primary" @click="createInformation" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script setup>
import { mdiCashRegister } from '@mdi/js';
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from 'vue-router'

// import the endpoint
import { url } from "../../boot/endpoint";
// Import the axios
import { api } from "../../boot/axiosAuth";
const axios = api;
// Import the quasar framework notifier
import { Notify } from 'quasar';
// Import the storage
import * as storage from "../../boot/storage";
// User basic info
let userInfo = $ref(storage.getUserInfo());

// Route Reference
const route = useRoute();
const router = useRouter();

let categories = $ref([]);
const loadInformation = async () => {
    await axios.post(url('category'))
        .then(function (response) {
            categories = response.data.data;
            Notify.create({
                message: 'Category loaded',
                color: 'green'
            });
        });
};

onMounted(() => {
    loadInformation();
});


const updateInformation = async (arrayIndex) => {
    await axios.patch(url('category/update/' + categories[arrayIndex].id), {
        name: categories[arrayIndex].name,
        is_active: categories[arrayIndex].is_active,
    })
        .then(function (response) {
            Notify.create({
                message: 'Category updated',
                color: 'green'
            });
        });
};

// Create new modal
let createNew = $ref(false);

let name = $ref('');
let isActive = $ref(true);

const createInformation = async () => {
    await axios.post(url('category/create'), {
        name: name,
        is_active: isActive
    })
        .then(function (response) {
            Notify.create({
                message: 'Category updated',
                color: 'green'
            });
        });
    loadInformation();
};
</script>
