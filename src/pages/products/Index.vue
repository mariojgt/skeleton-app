<template>
    <q-page>
        <div class="q-pa-lg">
            <div class="row">
                <div class="col">
                    <q-card class="my-card q-pa-lg" flat bordered>
                        <q-list>
                            <q-item-label header>Filters</q-item-label>
                            <q-item>
                                <q-item-section>
                                    <q-item-label>
                                        <q-input v-model="search" debounce="500" filled placeholder="Search"
                                            label="Search" color="orange" />
                                    </q-item-label>
                                    <q-item-label caption>
                                        <q-select v-model="pagination" :options="[5, 10, 25, 50, 100]"
                                            label="Pagination" />
                                    </q-item-label>
                                </q-item-section>
                            </q-item>

                            <div v-for="(item, index) in product" :key="index">
                                <q-item>
                                    <q-item-section avatar>
                                        <q-avatar square>
                                            <img :src="item.main_image.url.default">
                                        </q-avatar>
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>
                                            {{ item.name }}
                                        </q-item-label>
                                        <q-item-label caption lines="2">
                                            <div class="q-pa-md q-gutter-md">
                                                <q-badge color="red" :label="item.category.name" />
                                                <q-badge color="blue" :label="'stock:' + item.stock" />
                                                <q-badge color="purple" :label="'code:' + item.sku_code" />
                                            </div>
                                        </q-item-label>
                                        <q-expansion-item expand-separator :icon="mdiFood" label="Allergies">
                                            <q-card>
                                                <q-card-section>
                                                    <div class="q-pa-md q-gutter-md">
                                                        <q-badge v-for="(allergie, key) in item.allergies" :key="key"
                                                            color="green">
                                                            {{ allergie }}
                                                        </q-badge>
                                                    </div>
                                                </q-card-section>
                                            </q-card>
                                        </q-expansion-item>
                                    </q-item-section>

                                    <q-item-section side top>
                                        <q-btn color="orange" text-color="black" label="Edit" :to="
                                        {
                                            name: 'product-edit',
                                            query: {
                                                product: item.id
                                            }
                                        }" />
                                    </q-item-section>
                                </q-item>
                                <q-separator spaced inset />
                            </div>

                        </q-list>

                    </q-card>
                </div>
            </div>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-fab v-model="fabRight" vertical-actions-align="right" color="orange" glossy icon="keyboard_arrow_up"
                direction="up">
                <q-fab-action label-position="left" color="orange" :to="{ name: 'product-create', }" icon="mail"
                    label="New Product" />
            </q-fab>
        </q-page-sticky>
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

let search = $ref('');
let pagination = $ref(10);

// Watch pagination
watch(
    () => pagination,
    (v) => {
        // Search the products in here
        loadProducts();
    }
);

// Watch the search
watch(
    () => search,
    (v) => {
        // Search the products in here
        loadProducts();
    }
);

// Product Options
let product = $ref([]);
const loadProducts = async () => {
    await axios.post(url('product'), {
        search: search,
        pagination: pagination
    })
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
