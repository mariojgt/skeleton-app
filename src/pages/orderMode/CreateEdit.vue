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
                        <q-item-label>Order / Table name</q-item-label>
                        <q-item-label caption>
                            <q-input v-model="orderName" color="orange" label="Order Name" />
                        </q-item-label>
                    </q-item-section>
                </q-item>
                <!-- Discount -->
                <!-- <q-expansion-item expand-separator :icon="mdiCircleEditOutline" label="Discount">
                    <q-card>
                        <q-card-section>

                        </q-card-section>
                    </q-card>
                </q-expansion-item> -->
                <q-separator spaced />
                <!-- Product list -->
                <product-item v-for="(item, index) in products" :key="index" :qtyEdit="false" :productInfo="item"
                    :newProduct="false" @removeProduct="removeProduct" @productSync="syncProduct" />
                <q-item>
                    <q-item-section>
                        <q-item-label>Totals</q-item-label>
                        <q-item>
                            <q-item-section>Total</q-item-section>
                            <q-item-section avatar>
                                £{{ total }}
                            </q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section>Sub Total</q-item-section>
                            <q-item-section avatar>
                                £{{ subTotal }}
                            </q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section>Tax</q-item-section>
                            <q-item-section avatar>
                                £{{ totalTax }}
                            </q-item-section>
                        </q-item>
                    </q-item-section>
                </q-item>
                <q-item-label>
                    <!-- Display the button to create or edit the order -->
                    <q-btn color="orange" class="full-width" label="Create order" @click="orderCreateUpdate"
                        v-if="newOrder == true" />
                    <q-btn color="blue" class="full-width" label="Edit" @click="orderCreateUpdate" v-else />
                </q-item-label>
            </q-list>
        </div>
    </q-page>
</template>

<script setup>
import { defineComponent, watch, onMounted } from "vue";
import { mdiCircleEditOutline } from '@mdi/js';
import productItem from "./components/ProductLine";
import { useRoute, useRouter } from 'vue-router'
// Route Reference
const route = useRoute();
const router = useRouter()

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
let newOrder = $ref(true);

// Product search
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
    calculateTotals();
};

// Sync products
const syncProduct = (product) => {
    for (const [key, value] of Object.entries(products)) {
        if (value.unique_key === product.unique_key) {
            products[key] = product;
        }
    }
}

// On product update
watch(products, async (newProduct, oldProduct) => {
    calculateTotals();
});
// Totals variables
let total = $ref(0);
let totalTax = $ref(0);
let subTotal = $ref(0);

// Create a function to calculate the totals
const calculateTotals = () => {
    // Clear the totals
    total = 0;
    totalTax = 0;
    subTotal = 0;

    // Loop the products and calculate the totals
    for (const [key, value] of Object.entries(products)) {
        let tax = (value.final_price / 100) * value.tax;
        total += parseFloat(value.final_price);
        totalTax += parseFloat(tax);
        subTotal += parseFloat(value.final_price - tax);
    }

    // Format the numbers
    total = total.toFixed(2);
    totalTax = totalTax.toFixed(2);
    subTotal = subTotal.toFixed(2);
    // Add the currency symbol
    total = total;
    totalTax = totalTax;
    subTotal = subTotal;
}

// function to create the order or edit the order

const orderCreateUpdate = async () => {

    let orderRoute = null;
    // Check if we are on edit mode
    if (newOrder == true) {
        orderRoute = url('order/create');
    } else {
        orderRoute = url('order/edit/' + orderId);
    }

    await axios.post(orderRoute, {
        order_name: orderName,
        products: products,
        total: total,
        total_tax: totalTax,
        sub_total: subTotal,
        order_id: orderId,
    })
        .then(function (response) {
            const orderProducts = JSON.parse(response.data.data.raw_line);
            products = orderProducts;
            orderName = response.data.data.order_name;
            total = response.data.data.formatted_total;
            totalTax = response.data.data.formatted_tax;
            subTotal = response.data.data.formatted_subtotal;
            // On save we return the order id and we can use it to edit the order
            newOrder = false;
            orderId = response.data.data.id;
        });
};

let orderId = $ref(null);

// Check if we are loading a order or creating a new one
onMounted(() => {
    // Get the order id from the url
    let order = route.query.order ?? null;
    if (order) {
        newOrder = false;
    } else {
        newOrder = true;
        orderId = order;
    }
});

</script>


