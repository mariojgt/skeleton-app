<template>
    <q-page>
        <div class="q-pa-md">
            <div class="row">
                <div class="col">
                    <q-card class="my-card q-pa-md" flat bordered>
                        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                            <q-file filled bottom-slots v-model="files" label="Product Images" multiple color="orange">
                                <template v-slot:append>
                                    <q-icon v-if="files !== null" name="close" @click.stop="files = null"
                                        class="cursor-pointer" />
                                    <q-icon name="create_new_folder" @click.stop />
                                </template>
                            </q-file>

                            <q-input label="Name" color="orange" />
                            <q-input label="Sku Code" color="orange" />

                            <q-toggle v-model="useStock" label="Use Stock" color="orange" />
                            <q-input label="Stock Quantity" v-if="useStock" v-model="stockQty" color="orange" />

                            <q-select filled v-model="allergies" multiple :options="allergiesOptions" use-chips
                                stack-label label="Allergies" color="orange" />

                            <q-toggle v-model="isActive" label="Is Active" color="orange" />

                            <q-input v-model="price" type="number" step="0.01" label="Price" color="orange" />
                            <q-input v-model="costPrice" type="number" step="0.01" label="Cost Price" color="orange" />

                            <q-select filled v-model="category" :options="categoryOptions" use-chips stack-label
                                label="Category" color="orange" />

                            <q-card-actions align="right">
                                <q-btn label="Submit" type="submit" color="orange" />
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

// Options
let allergiesOptions = ['milk', 'eggs', 'nuts', 'fish', 'soy', 'gluten', 'peanuts', 'sesame', 'wheat', 'shellfish'];
// Category Options
let categoryOptions = $ref([]);
const loadInformation = async () => {
    await axios.post(url('category'))
        .then(function (response) {
            categoryOptions = [];
            for (const [key, value] of Object.entries(response.data.data)) {
                categoryOptions.push(value.name);
            }
            Notify.create({
                message: 'Category loaded',
                color: 'green'
            });
        });
};
loadInformation();
// Create Form
let useStock = $ref(true);
let isActive = $ref(true);
let stockQty = $ref(1);
let allergies = $ref(null);
let price = $ref(null);
let costPrice = $ref(null);
let category = $ref(null);

</script>
