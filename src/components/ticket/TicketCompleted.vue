<template>
    <!-- Ticket arrived -->
    <q-item>
        <q-item-section avatar>
            {{ myProps.completedTime }}
        </q-item-section>

        <q-item-section>
            <q-item-label>Items</q-item-label>
            <q-item-label caption lines="1">Coke x 2</q-item-label>
            <q-item-label caption lines="1">Sprite x 2</q-item-label>
        </q-item-section>

        <q-item-section side>
            <q-btn color="primary" label="order">
            </q-btn>
        </q-item-section>
    </q-item>
</template>

<script setup >
import { watch } from 'vue'
import { mdiPrinterCheck } from '@mdi/js';

// Create a define props with computed properties
const myProps = defineProps({
    completedTime: {
        type: String,
        default: '00:00'
    }
});

</script>
