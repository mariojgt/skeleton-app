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
                                    <th class="text-left">Image</th>
                                    <th class="text-left">Name</th>
                                    <th class="text-left">Sku Code</th>
                                    <th class="text-left">Category</th>
                                    <th class="text-right">Price</th>
                                    <th class="text-right">Allergies</th>
                                    <th class="text-right">Use Stock</th>
                                    <th class="text-right">Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in product" :key="index">
                                    <td class="text-left">
                                        <q-avatar square>
                                            <img :src="item.main_image.url.default">
                                        </q-avatar>
                                    </td>
                                    <td class="text-left">
                                        {{ item.name }}
                                    </td>
                                    <td class="text-left">
                                        {{ item.sku_code }}
                                    </td>
                                    <td class="text-left">
                                        {{ item.category.name }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.formatted_price }}
                                    </td>
                                    <td class="text-right">
                                        <div class="q-pa-md q-gutter-md">
                                            <q-badge v-for="(allergie, key) in item.allergies" :key="key" color="blue">
                                                {{ allergie }}
                                            </q-badge>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        {{ item.use_stock }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.stock }}
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

// Product Options
let product = $ref([]);
const loadProducts = async () => {
    await axios.post(url('product'))
        .then(function (response) {
            product = [];
            product = response.data.data;
            Notify.create({
                message: 'Product loaded',
                color: 'green'
            });
        });
};
loadProducts();

</script>
