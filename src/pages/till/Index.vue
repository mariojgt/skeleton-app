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
                                            @blur="updateInformation" />
                                    </td>
                                    <td class="text-right">bar</td>
                                    <td class="text-right">
                                        <q-toggle v-model="tills[index].is_active" label="Is Enable"
                                            @click="updateInformation" />
                                    </td>
                                </tr>
                            </tbody>
                        </q-markup-table>
                    </div>
                </div>
            </div>
        </div>
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


const updateInformation = async () => {
    await axios.patch(url('tills/update'), {
        tills: tills
    })
        .then(function (response) {
            Notify.create({
                message: 'Till updated',
                color: 'green'
            });
        });
};

</script>
