<template>
    <q-page>
        <div class="q-pa-md">
            <q-list bordered padding>
                <q-item clickable v-ripple>
                    <q-item-section>
                        <q-item-label>Search</q-item-label>
                        <q-item-label caption>
                            <q-input v-model="searchProductCode" filled color="orange" label="Search Product" />
                        </q-item-label>
                        <q-item-label caption>
                            <q-btn color="teal" class="full-width" label="Search" @click="productSearch" />
                        </q-item-label>
                    </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                    <q-item-section>
                        <q-item-label>Table</q-item-label>
                        <q-item-label caption>
                            <q-input v-model="orderName" color="orange" label="Order Name" />
                        </q-item-label>
                    </q-item-section>
                </q-item>
                <q-separator spaced />
                <product-item v-for="(item, index) in products" :key="index" :qtyEdit="false" :productInfo="item"
                    :newProduct="false" @removeProduct="removeProduct" />
            </q-list>
        </div>
    </q-page>
</template>

<script setup>
import { defineComponent, watch } from "vue";
import { mdiPrinterCheck } from '@mdi/js';
import productItem from "./components/ProductLine";

// import the endpoint
import { url } from "../../boot/endpoint";
// Import the axios
import { api } from "../../boot/axiosAuth";
const axios = api;
// Import the quasar framework notifier
import { Notify } from 'quasar';

let orderName = $ref(null);
let searchProductCode = $ref(null);

// Product list
let products = $ref([]);

// load the search results
const productSearch = async () => {
    await axios.post(url('product/search'), {
        search: searchProductCode
    })
        .then(function (response) {
            // extraOptions = response.data.data;
            if (response.data.status == false) {
                Notify.create({
                    message: 'Product not found',
                    color: 'red'
                });
            } else {
                products.push(response.data.data);
                Notify.create({
                    message: 'Extras loaded',
                    color: 'green'
                });
            }
        });
};

// Remove product from the list
const removeProduct = (uniqueKey) => {
    for (const [key, value] of Object.entries(products)) {
        if (value.unique_key === uniqueKey) {
            products.splice(key, 1);
        }
    }
};

</script>


