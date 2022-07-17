<template>
    <q-page>
        <div class="q-pa-md">
            <div class="row">
                <div class="col-md-12">
                    <p>Order</p>
                </div>
                <!-- Completed Mode -->
                <div class="col-md-12 q-pa-sm">
                    <q-card class="my-card">
                        <q-card-section>
                            <div class="row no-wrap items-center">
                                <div class="col text-h6 ellipsis">
                                    Open Orders
                                </div>
                            </div>
                        </q-card-section>
                        <q-separator />

                        <div class="row">
                            <div class="q-pa-md col-md-3" v-for="(item, index) in orders" :key="index">
                                <q-card class="my-card bg-primary">
                                    <q-card-section>
                                        <div class="text-h6">
                                            <q-btn flat>#{{ item.order_name }}</q-btn>
                                        </div>
                                        <div class="text-subtitle2">£{{ item.formatted_total }}</div>
                                    </q-card-section>
                                    <q-markup-table>
                                        <thead>
                                            <tr>
                                                <th class="text-left">Name</th>
                                                <th class="text-right">Qty</th>
                                                <th class="text-right">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in item.lines" :key="index">
                                                <td class="text-left">{{ item.name }}</td>
                                                <td class="text-right">{{ item.qty }}</td>
                                                <td class="text-right">£{{ item.formatted_final_price }}</td>
                                            </tr>
                                        </tbody>
                                    </q-markup-table>
                                </q-card>
                            </div>
                        </div>
                    </q-card>
                </div>
            </div>
        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-fab v-model="fabRight" vertical-actions-align="right" color="primary" glossy icon="keyboard_arrow_up"
                direction="up">
                <q-fab-action label-position="left" color="primary" @click="createNewOrder" icon="mail"
                    label="New Order" />
            </q-fab>
        </q-page-sticky>

    </q-page>

</template>

<script setup>
// import the endpoint
import { url } from "../../boot/endpoint";
// Import the axios
import { api } from "../../boot/axiosAuth";
const axios = api;
// Import the quasar framework notifier
import { Notify } from 'quasar';
import { useRoute, useRouter } from 'vue-router'
// Route Reference
const route = useRoute();
const router = useRouter();
// Import vue onMounted
import { onMounted, watch } from "vue";

import { mdiPrinterCheck } from '@mdi/js';

// The section or till
let orders = $ref([]);

const loadOrder = async () => {
    await axios.get(url('order/index'))
        .then(function (response) {
            orders = response.data.data;
        });
};
loadOrder();

const createNewOrder = async () => {
    // Redirect to the new order page
    router.push({
        name: 'order-create'
    });
};

</script>


