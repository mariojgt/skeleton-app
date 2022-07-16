<template>
    <!-- Ticket arrived -->
    <q-item>
        <q-toolbar :class="ticketColor" class="text-white shadow-2 q-pa-md">
            <q-item-section avatar class="text-h4">
                <timer @timer:warming="timerWarming" :minutes="myProps.minutes" :seconds="myProps.seconds" />
            </q-item-section>

            <q-item-section>
                <q-item-label class="q-pa-md si text-h4">
                    <strong>#{{ myProps.productInfo.order_id }}</strong> {{ myProps.productInfo.name }} x {{
                            myProps.productInfo.qty
                    }}
                </q-item-label>
                <div class="q-pa-md bg-dark" v-if="myProps.productInfo.modification[0]">
                    <q-list dense bordered padding class="rounded-borders">
                        <q-item-label overline>Modifications</q-item-label>
                        <q-item clickable v-ripple v-for="(item, index) in myProps.productInfo.modification"
                            :key="index">
                            <q-item-section>
                                {{ item }}
                            </q-item-section>
                        </q-item>
                    </q-list>
                </div>
                <div class="q-pa-md bg-dark" v-if="myProps.productInfo.extras[0]">
                    <q-list dense bordered padding class="rounded-borders">
                        <q-item-label overline>Extras</q-item-label>
                        <q-item clickable v-ripple v-for="(item, index) in myProps.productInfo.extras" :key="index">
                            <q-item-section>
                                {{ item.name }}
                            </q-item-section>
                        </q-item>
                    </q-list>
                </div>
            </q-item-section>
            <q-item-section side>
                <q-btn color="primary">
                    <q-icon size="3em" :name="mdiPrinterCheck" @click="printTicket" />
                </q-btn>
            </q-item-section>
        </q-toolbar>
    </q-item>
</template>

<script setup >
import { watch } from 'vue'
import { mdiPrinterCheck } from '@mdi/js';
import timer from './Timer'

// Create a define props with computed properties
const myProps = defineProps({
    productInfo: {
        type: Object,
        default: () => ({}),
    },
    minutes: {
        type: Number,
        default: 0
    },
    seconds: {
        type: Number,
        default: 0
    }
});

// Ticker variable
let ticketColor = $ref('bg-green');

// Based in the current minute we change the color of the ticket
const timerWarming = async (time) => {
    if (time >= 20) {
        ticketColor = 'bg-purple';
    } else if (time >= 15) {
        ticketColor = 'bg-red';
    } else if (time >= 10) {
        ticketColor = 'bg-orange';
    } else if (time >= 5) {
        ticketColor = 'bg-yellow-9';
    } else {
        ticketColor = 'bg-green';
    }
};

const emit = defineEmits(["print"]);

const printTicket = async () => {
    emit("print", myProps.productInfo);
};

</script>
