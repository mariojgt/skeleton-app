<template>
    <q-page>
        <div class="q-pa-md">
            <div class="row">
                <div class="col">
                    <q-card class="my-card q-pa-md" flat bordered>
                        <q-markup-table flat bordered>
                            <thead>
                                <tr>
                                    <th colspan="5">
                                        <div class="row no-wrap items-center">
                                            <q-icon :name="mdiCashRegister" color="orange" size="70px" />
                                            <div class="text-h4 q-ml-md text-white">Product</div>
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
                                    <td class="text-right">
                                        {{ item.section }}
                                    </td>
                                    <td class="text-right">
                                        <q-toggle v-model="tills[index].is_active" label="Is Enable"
                                            @click="updateInformation(index)" />
                                    </td>
                                </tr>
                            </tbody>
                        </q-markup-table>
                    </q-card>
                </div>
            </div>
        </div>
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

// Category Options
let categoryOptions = $ref([]);
const loadCategory = async () => {
    await axios.post(url('category'))
        .then(function (response) {
            categoryOptions = [];
            for (const [key, value] of Object.entries(response.data.data)) {
                categoryOptions.push({
                    label: value.name,
                    value: value.id
                });
            }
            Notify.create({
                message: 'Category loaded',
                color: 'green'
            });
        });
};
loadCategory();

</script>
