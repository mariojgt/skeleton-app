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
                                            <q-img style="width: 70px" :ratio="1" class="rounded-borders"
                                                src="https://cdn.quasar.dev/img/donuts.png" />
                                            <div class="text-h4 q-ml-md text-white">Tills</div>
                                        </div>
                                        <div class="text-h4 q-ml-md text-white text-right">
                                            <q-select v-model="filter" :options="tillOptions" @blur="loadInformation"
                                                label="Filter" />
                                        </div>
                                    </th>
                                </tr>
                                <tr>
                                    <th class="text-left">Name</th>
                                    <th class="text-right">Section</th>
                                    <th class="text-right">Is Active</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in tills" :key="index">
                                    <td class="text-left">
                                        <q-input filled v-model="tills[index].name" label="Till Name"
                                            @blur="updateInformation(index)" />
                                    </td>
                                    <td class="text-right">bar</td>
                                    <td class="text-right">
                                        <q-toggle v-model="tills[index].is_active" label="Is Enable"
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

const tillOptions = ['bar', 'kitchen', 'all'];
let filter = $ref('bar');

let tills = $ref([]);
const loadInformation = async () => {
    await axios.post(url('tills'), {
        section: filter
    })
        .then(function (response) {
            tills = response.data.data;
            Notify.create({
                message: 'Till loaded',
                color: 'green'
            });
        });
};

onMounted(() => {
    loadInformation();
});


const updateInformation = async (arrayIndex) => {
    await axios.patch(url('tills/update/' + tills[arrayIndex].id), {
        name: tills[arrayIndex].name,
        is_active: tills[arrayIndex].is_active,
    })
        .then(function (response) {
            Notify.create({
                message: 'Till updated',
                color: 'green'
            });
        });
};

// Create new modal
let createNew = $ref(false);

let name = $ref('');
let isActive = $ref(true);

const createInformation = async () => {
    await axios.post(url('tills/create'), {
        name: name,
        is_active: isActive,
        section: filter
    })
        .then(function (response) {
            Notify.create({
                message: 'Till updated',
                color: 'green'
            });
        });
    loadInformation();
};
</script>
