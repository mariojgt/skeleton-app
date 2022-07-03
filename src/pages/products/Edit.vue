<template>
    <q-page>
        <div class="q-pa-md">
            <div class="row">
                <div class="col">
                    <q-card class="my-card q-pa-md" flat bordered>

                        <q-form @submit="submitProduct" @reset="onReset" class="q-gutter-md">

                            <q-splitter v-model="splitterModel">

                                <template v-slot:before>
                                    <q-tabs v-model="tab" vertical class="text-orange">
                                        <q-tab name="required" :icon="mdiAsterisk" label="Required" />
                                        <q-tab name="Price" :icon="mdiCurrencyUsd" label="Price" />
                                    </q-tabs>
                                </template>

                                <template v-slot:after>
                                    <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up"
                                        transition-next="jump-up">
                                        <q-tab-panel name="required">
                                            <q-input label="Name" v-model="name" color="orange" />
                                            <div class="text-h4">
                                                Description
                                                <q-editor v-model="description" min-height="5rem"
                                                    toolbar-color="orange" />
                                            </div>
                                            <q-input label="Sku Code" v-model="skuCode" color="orange" />
                                            <q-file filled bottom-slots v-model="files" label="Product Images" multiple
                                                color="orange">
                                                <template v-slot:append>
                                                    <q-icon v-if="files !== null" name="close"
                                                        @click.stop="files = null" class="cursor-pointer" />
                                                    <q-icon name="create_new_folder" @click.stop />
                                                </template>
                                            </q-file>

                                            <div class="row">
                                                <div class="col-3 q-pa-md" v-for="(item, index) in productImages"
                                                    :key="index">
                                                    <q-card class="my-card">
                                                        <img :src="item.url.medium">

                                                        <q-card-section>
                                                            <div class="text-h6">{{ item.name }}</div>
                                                        </q-card-section>

                                                        <q-card-section class="q-pt-none q-gutter-md">
                                                            <q-btn color="orange" v-if="item.id == productMainImage.id">
                                                                Main Image</q-btn>
                                                            <q-btn color="green"
                                                                @click="updateProductMainImage(item.id)" v-else>
                                                                Select</q-btn>
                                                            <q-btn color="red" @click="productImages.splice(index, 1)">
                                                                Remove
                                                            </q-btn>
                                                        </q-card-section>
                                                    </q-card>
                                                </div>
                                            </div>

                                        </q-tab-panel>

                                        <q-tab-panel name="Price">
                                            <q-toggle v-model="useStock" label="Use Stock" color="orange" />
                                            <q-input label="Stock Quantity" v-if="useStock" v-model="stockQty"
                                                color="orange" />

                                            <q-select filled v-model="allergies" multiple :options="allergiesOptions"
                                                use-chips stack-label label="Allergies" color="orange" />

                                            <q-toggle v-model="isActive" label="Is Active" color="orange" />

                                            <q-input v-model="price" type="number" step="0.01" label="Price"
                                                color="orange" />
                                            <q-input v-model="costPrice" type="number" step="0.01" label="Cost Price"
                                                color="orange" />

                                            <q-select filled v-model="category" :options="categoryOptions" use-chips
                                                stack-label label="Category" color="orange" />
                                        </q-tab-panel>
                                    </q-tab-panels>
                                </template>
                            </q-splitter>

                            <q-card-actions align="right">
                                <q-btn label="Submit" type="update" color="orange" />
                                <q-btn label="Reset" type="reset" color="orange" flat class="q-ml-sm" />
                            </q-card-actions>
                        </q-form>
                    </q-card>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { mdiAsterisk, mdiCurrencyUsd } from '@mdi/js';
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

let productImages = $ref([]);
let productMainImage = $ref([]);
let productInfo = $ref([]);

// Preload the product
onMounted(async () => {
    loadProductInfo();
});

const loadProductInfo = async () => {
    await axios.post(url('product/search'), {
        search: route.query.product
    })
        .then(function (response) {
            productInfo = response.data.data;
            // load the product images
            productMainImage = productInfo.main_image;
            productImages = productInfo.images;

            // Set the product info
            name = productInfo.name;
            description = productInfo.description;
            skuCode = productInfo.sku_code;
            useStock = productInfo.use_stock ? true : false;
            isActive = productInfo.is_active ? true : false;
            stockQty = productInfo.stock;
            allergies = productInfo.allergies;
            price = productInfo.formatted_price;
            costPrice = productInfo.formatted_cost_price;
            category = {
                label: productInfo.category.name,
                value: productInfo.category.id
            };

            Notify.create({
                message: 'Product loaded',
                color: 'green'
            });
        });
};

// Update the product main image
const updateProductMainImage = async (media_id) => {
    await axios.post(url('product/update/main/image'), {
        product: productInfo.id,
        media_id: media_id,
    })
        .then(function (response) {
            Notify.create({
                message: 'Product image updated',
                color: 'green'
            });
        });
    // Reload the product info
    loadProductInfo();
};

// Tabs
let splitterModel = $ref(null);
let tab = $ref('required');

// Options
let allergiesOptions = ['milk', 'eggs', 'nuts', 'fish', 'soy', 'gluten', 'peanuts', 'sesame', 'wheat', 'shellfish'];
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

// Product Information
let files = $ref(null);
let name = $ref('');
let description = $ref(null);
let skuCode = $ref(null);
let useStock = $ref(true);
let isActive = $ref(true);
let stockQty = $ref(1);
let allergies = $ref(null);
let price = $ref(null);
let costPrice = $ref(null);
let category = $ref(null);

const submitProduct = async () => {

    let formData = new FormData();
    // Append the files to formData
    if (files) {
        for (const [key, file] of Object.entries(files)) {
            formData.append('files[]', file);
        }
    }
    // Append the normal data to formData
    formData.append('product', productInfo.id);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('sku_code', skuCode);
    formData.append('use_stock', useStock);
    formData.append('is_active', isActive);
    formData.append('stock', stockQty);
    formData.append('allergies', allergies);
    formData.append('price', price);
    formData.append('cost_price', costPrice);
    // Loop all the current medias and append to formData
    if (productImages) {
        for (const [key, value] of Object.entries(productImages)) {
            formData.append('medias[]', value.id);
        }
    }
    // Append the category to formData
    if (category) {
        formData.append('category_id', category.value);
    }

    // Upload with headers
    await axios.post(url('product/update'), formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(function (response) {
            Notify.create({
                message: 'Product successfully created',
                color: 'green'
            });
        });

    // Reload the product info
    loadProductInfo();
};

</script>
