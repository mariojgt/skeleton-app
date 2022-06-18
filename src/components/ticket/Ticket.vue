<template>
    <!-- Ticket arrived -->
    <q-item>
        <q-toolbar :class="ticketColor" class="text-white shadow-2 q-pa-md">
            <q-item-section avatar>
                <timer @timer:warming="timerWarming" :minutes="myProps.minutes" :seconds="myProps.seconds" />
            </q-item-section>

            <q-item-section>
                <q-item-label>Items</q-item-label>
                <q-item-label caption lines="1">Coke x 2</q-item-label>
                <q-item-label caption lines="1">Sprite x 2</q-item-label>
            </q-item-section>

            <q-item-section side>
                <q-btn color="primary">
                    <q-icon left size="3em" :name="mdiPrinterCheck" />
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
    if (time <= 5) {
        ticketColor = 'bg-green';
    } else if (time <= 10) {
        ticketColor = 'bg-orange';
    } else if (time <= 15) {
        ticketColor = 'bg-red';
    }
};

</script>
