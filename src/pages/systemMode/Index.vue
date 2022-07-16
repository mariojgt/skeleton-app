<template>
    <q-page>
        <div class="q-pa-md">
            <div class="row">
                <div class="col-md-12">
                    <div class="q-gutter-md">
                        <q-select v-model="sectionOption" :options="sectionOptions" @blur="fetchLiveProducts"
                            label="Section" />
                    </div>
                </div>
                <div class="col-md-6">
                    <h4>{{ type }}</h4>
                </div>
                <div class="col-md-6">
                    <div class="q-gutter-md">
                        <q-select v-model="option" :options="options" label="Display Mode" />
                    </div>
                </div>
                <!-- Bar Mode -->
                <div :class="{ 'col-md-12': option == 'full', 'col-md-6': option == 'half' }">
                    <div class="q-pa-md q-gutter-sm">
                        <q-card class="my-card">
                            <q-card-section>
                                <div class="row no-wrap items-center">
                                    <div class="col text-h6 ellipsis">
                                        Tickets
                                    </div>
                                </div>
                                <refreshLive @refresh="fetchLiveProducts" />
                            </q-card-section>
                            <q-separator />
                            <q-list bordered>
                                <!-- Ticket arrived -->
                                <ticket v-for="(item, index) in liveProducts" :key="index" :minutes="item.minute_diff"
                                    :seconds="item.seconds_diff" :productInfo="item" @print="printTicket" />
                            </q-list>
                        </q-card>
                    </div>
                </div>
                <!-- Completed Mode -->
                <div :class="{ 'col-md-12': option == 'full', 'col-md-6': option == 'half' }">
                    <div class="q-pa-md q-gutter-sm">
                        <q-card class="my-card">
                            <q-card-section>
                                <div class="row no-wrap items-center">
                                    <div class="col text-h6 ellipsis">
                                        Completed Order
                                    </div>
                                </div>
                                <refreshLive @refresh="completedItems" :refreshIncrease="0.01" />
                            </q-card-section>
                            <q-separator />
                            <q-list bordered>
                                <!-- Ticket completed -->
                                <ticketCompleted v-for="(item, index) in completedProducts" :key="index"
                                    :productInfo="item" />
                            </q-list>
                        </q-card>
                    </div>
                </div>

            </div>
        </div>
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
import ticket from "../../components/ticket/Ticket";
import refreshLive from "../../components/ticket/LiveFetchProgress";
import ticketCompleted from "../../components/ticket/TicketCompleted";

// The display mode
const options = ['half', 'full'];
let option = $ref('half');
let type = $ref('bar');

// The section or till
let sectionOptions = $ref([]);
let sectionOption = $ref(null);

const loadTillInformation = async () => {
    await axios.post(url('tills'), {
        section: type
    })
        .then(function (response) {
            sectionOptions = [];
            for (const [key, value] of Object.entries(response.data.data)) {
                sectionOptions.push(
                    {
                        label: value.name,
                        value: value.id
                    }
                );
            }
            sectionOption = sectionOptions[0];
            Notify.create({
                message: 'Till loaded',
                color: 'green'
            });
        });
};

// Fetch live data from the server
let liveProducts = $ref([]);
const fetchLiveProducts = async () => {
    if (sectionOption) {
        await axios.get(url('live/products/' + sectionOption.value))
            .then(function (response) {
                liveProducts = [];
                setTimeout(() => {
                    liveProducts = response.data.data;

                    Notify.create({
                        message: 'Live Products',
                        color: 'green'
                    });
                }, 100);
            });
    }
};

// When the ticket is printed
const printTicket = async (ticket) => {
    // Delete the ticket from the live products
    const productKey = liveProducts.findIndex(x => x.unique_number === ticket.unique_number);
    await axios.post(url('live/products/print/' + ticket.id))
        .then(function (response) {
            if (response.data.success) {
                liveProducts.splice(productKey, 1);
            }
            Notify.create({
                message: 'Line printed',
                color: 'green'
            });
        });
};


// Fetch the complete order
let completedProducts = $ref([]);
const completedItems = async () => {
    if (sectionOption) {
        await axios.post(url('live/products/completed/' + sectionOption.value))
            .then(function (response) {
                completedProducts = [];
                setTimeout(() => {
                    completedProducts = response.data.data;

                    Notify.create({
                        message: 'Completed Live Products',
                        color: 'green'
                    });
                }, 100);
            });
    }
};


const boot = async () => {
    // Get the email from the URL
    type = route.query.type ?? '';
    await loadTillInformation();
    await fetchLiveProducts();
};

onMounted(() => {
    // Set timeout async
    setTimeout(() => {
        boot();
    }, 500);
});

</script>


