<template>
    <!-- Display the orders -->
    <div>
        <q-separator spaced />
        <q-item>
            <q-item-section avatar top>
                <q-img :src="product?.main_image?.url?.default" spinner-color="white" />
            </q-item-section>
            <q-item-section>
                <q-expansion-item expand-separator :label="product.name + ' x ' + qty + ' £' + finalPrice">
                    <q-card>
                        <!-- Modifications -->
                        <q-expansion-item v-if="modification[0]" expand-separator :icon="mdiCircleEditOutline"
                            label="Modifications">
                            <q-card>
                                <q-card-section>
                                    <q-list>
                                        <q-item clickable v-ripple v-for="(item, index) in modification" :key="index">
                                            <q-item-section avatar>
                                                <q-icon color="orange" :name="mdiMenuRightOutline" />
                                            </q-item-section>
                                            <q-item-section>{{ item }}</q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>

                        <!-- Extras -->
                        <q-expansion-item v-if="extras[0]" expand-separator :icon="mdiClipboardListOutline"
                            label="Extras">
                            <q-card>
                                <q-card-section>
                                    <q-list>
                                        <q-item v-for="(item, index) in extras" :key="index">
                                            <q-item-section>{{ item.name }} - {{ item.formatted_price_currency }}
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>

                        <!-- Allergies -->
                        <q-expansion-item expand-separator :icon="mdiPeanut" label="Allergies">
                            <q-card>
                                <q-card-section>
                                    <div class="q-pa-md q-gutter-md">
                                        <q-badge color="red" v-for="(item, index) in allergies" :key="index"
                                            :label="item" />
                                    </div>
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>

                        <q-item-label>
                            <div class="q-pa-md q-gutter-md">
                                <q-btn v-if="props.qtyEdit" color="green" text-color="white" :label="'qty:' + qty"
                                    @click="dialogQty = true" />
                                <q-btn color="orange" text-color="white" label="Modification"
                                    @click="dialogModification = true" />
                                <q-btn color="indigo" text-color="white" label="Extras" @click="dialogExtras = true" />
                                <q-btn color="purple" text-color="white" label="Allergies"
                                    @click="dialogAllergies = true" />
                                <q-btn color="green" text-color="white" :label="'£' + finalPrice" />
                            </div>
                        </q-item-label>
                    </q-card>
                </q-expansion-item>

                <q-item-label v-if="product">
                    <!-- button to add to order or remove -->
                    <q-btn color="teal" class="full-width" label="Add to order" v-if="props.newProduct" />
                    <q-btn color="red" class="full-width" label="Remove" @click="removeProduct" v-else />
                </q-item-label>

            </q-item-section>

        </q-item>
        <q-separator spaced />
    </div>

    <!-- Qty adjust dialog -->
    <q-dialog v-model="dialogQty" position="left">
        <q-card style="width: 350px">
            <q-linear-progress :value="1" color="orange" />

            <q-card-section class="row items-center no-wrap">
                <div>
                    <div class="text-grey">Stock:10</div>
                </div>
                <q-space />
                <q-btn flat round icon="remove" @click="decreaseQty" />
                <div class="text-weight-bold">{{ qty }}</div>
                <q-btn flat round icon="add" @click="increaseQty" />
            </q-card-section>
        </q-card>
    </q-dialog>
    <!-- Product modification -->
    <q-dialog v-model="dialogModification" position="right">
        <q-card>

            <div class="q-pa-md" style="max-width: 350px">
                <q-list bordered separator>
                    <q-item v-for="(item, index) in modification" :key="index">
                        <q-item-section>{{ item }}</q-item-section>
                        <q-item-section avatar>
                            <q-btn round color="red" icon="remove" @click="removeModification(index)" />
                        </q-item-section>
                    </q-item>

                    <!--Add modification -->
                    <q-item>
                        <q-item-section>
                            <q-input v-model="modificationText" label="Modification" />
                        </q-item-section>
                        <q-item-section avatar>
                            <q-btn round color="green" icon="add" @click="addModification" />
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </q-card>
    </q-dialog>
    <!-- Product allergies -->
    <q-dialog v-model="dialogAllergies" position="right">
        <q-card>

            <div class="q-pa-md" style="max-width: 350px">
                <q-list bordered separator>
                    <q-item v-for="(item, index) in product_allergies" :key="index">
                        <q-item-section>{{ item }}</q-item-section>
                        <q-item-section avatar>
                            <q-btn round color="red" icon="remove" @click="removeAllergies(index)" />
                        </q-item-section>
                    </q-item>

                    <!--Add productAllergies -->
                    <q-item>
                        <q-item-section>
                            <q-input v-model="productAllergiesText" label="Allergies" />
                        </q-item-section>
                        <q-item-section avatar>
                            <q-btn round color="green" icon="add" @click="addAllergies" />
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </q-card>
    </q-dialog>
    <!-- Product end allergies -->
    <!-- Product Extras -->
    <q-dialog v-model="dialogExtras" position="right">
        <q-card>

            <div class="q-pa-md" style="max-width: 350px">
                <q-list bordered separator>
                    <q-item v-for="(item, index) in extras" :key="index">
                        <q-item-section>{{ item.name }} - {{ item.formatted_price_currency }}</q-item-section>
                        <q-item-section avatar>
                            <q-btn round color="red" icon="remove" @click="removeExtras(index)" />
                        </q-item-section>
                    </q-item>

                    <!-- Add extras -->
                    <q-item>
                        <q-item-section>
                            <q-input v-model="extraSearch" debounce="500" filled color="orange" label="Extras" />
                        </q-item-section>
                    </q-item>
                    <!-- Product options -->
                    <q-item v-for="(item, index) in extraOptions" :key="index">
                        <q-item-section>
                            {{ item.name }} - {{ item.formatted_price_currency }}
                        </q-item-section>
                        <q-item-section avatar>
                            <q-btn round color="green" icon="add" @click="addExtras(index)" />
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { watch, onMounted } from "vue";
import { mdiClipboardListOutline, mdiPeanut, mdiCircleEditOutline, mdiMenuRightOutline } from '@mdi/js';
// import the endpoint
import { url } from "../../../boot/endpoint";
// Import the axios
import { api } from "../../../boot/axiosAuth";
const axios = api;
// Import the quasar framework notifier
import { Notify } from 'quasar';

// Create a define props with computed properties
const props = defineProps({
    productInfo: {
        type: Object,
        default: () => ({}),
    },
    newProduct: {
        type: Boolean,
        default: true,
    },
    qtyEdit: {
        type: Boolean,
        default: false,
    }
});

// Define the product events
const emit = defineEmits(["removeProduct", "productSync"]);

let allergies = $ref([]);
let product = $ref([]);

onMounted(() => {
    product = props.productInfo;
    if (product.allergies) {
        allergies = product.allergies;
    }
    product = props.productInfo;
    product_allergies = product.product_allergies ?? [];
    syncProduct();
});

// Dialogs
let dialogQty = $ref(false);
let dialogModification = $ref(false);
let dialogAllergies = $ref(false);
let dialogExtras = $ref(false);
let dialogProductDiscount = $ref(false);

// Logic for the modification dialog
let modification = $ref([]);
let modificationText = $ref(null);

const addModification = async () => {
    if (modificationText) {
        modification.push(modificationText);
        modificationText = null;
        await syncProduct();
    }
};

const removeModification = async (index) => {
    modification.splice(index, 1);
    await syncProduct();
};

// Allergies
let product_allergies = $ref([]);
let productAllergiesText = $ref(null);

const addAllergies = async () => {
    if (productAllergiesText) {
        product_allergies.push(productAllergiesText);
        productAllergiesText = null;
        await syncProduct();
    }
};

const removeAllergies = async (index) => {
    product_allergies.splice(index, 1);
    await syncProduct();
};
// Allergies end

// Qty dialog
let qty = $ref(1);
let maxStock = $ref(10);

const increaseQty = async () => {
    if (qty < maxStock) {
        qty++;
    }
};

const decreaseQty = async () => {
    if (qty > 1) {
        qty--;
    }
};

// Extra dialog
let extraOptions = $ref([]);
let extraSearch = $ref('');
// watch the search
watch(
    () => extraSearch,
    (v) => {
        loadSearchExtras();
    }
);
// load the search results
const loadSearchExtras = async () => {
    await axios.post(url('product/extras'), {
        search: extraSearch
    })
        .then(function (response) {
            extraOptions = response.data.data;
        });
};
loadSearchExtras();
let extras = $ref([]);

const addExtras = async (key) => {
    extras.push(extraOptions[key]);
    calculateProductPrice();
};

const removeExtras = async (key) => {
    extras.splice(key, 1);
    calculateProductPrice();
};

// Product price calculation

// Watch the qty change
watch(
    () => qty,
    (v) => {
        calculateProductPrice();
    }
);

// Product sync
const syncProduct = async () => {
    product.extras = extras;
    product.qty = qty;
    product.modification = modification;
    product.final_price = finalPrice;
    product.product_allergies = product_allergies;
    emit("productSync", product);
};

// Product item final price
let finalPrice = $ref(0);
const calculateProductPrice = async () => {
    // Calculate the price
    let extraPrices = 0;
    extras.forEach(function (item) {
        extraPrices += item.formatted_price;
    });
    // Update this later to use the price from the product
    let productPrice = 2;
    finalPrice = ((productPrice + extraPrices) * qty).toFixed(2);

    await syncProduct();
};
calculateProductPrice();

// Remove action
const removeProduct = async () => {
    emit("removeProduct", product.unique_key);
};

</script>


