<template>
    <!-- Ticket arrived -->
    <q-item>
        <q-item-section avatar>

        </q-item-section>

        <q-item-section>
            <q-item-label class="q-pa-md si text-h5">
                <strong>#{{ myProps.productInfo.order_id }}</strong> {{ myProps.productInfo.name }} x
                {{ myProps.productInfo.qty }} <small>{{ myProps.productInfo.completed_at }}</small>
            </q-item-label>
            <div class="q-pa-md bg-dark" v-if="myProps.productInfo.modification[0]">
                <q-list dense bordered padding class="rounded-borders">
                    <q-item-label overline>Modifications</q-item-label>
                    <q-item clickable v-ripple v-for="(item, index) in myProps.productInfo.modification" :key="index">
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
    productInfo: {
        type: Object,
        default: () => ({}),
    }
});

</script>
