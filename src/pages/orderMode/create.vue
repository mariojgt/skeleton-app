<template>
    <q-page>
        <div class="q-pa-md">
            <q-list bordered padding>
                <q-item clickable v-ripple>
                    <q-item-section>
                        <q-item-label>Search</q-item-label>
                        <q-item-label caption>
                            <q-input v-model="text" label="Product Search" />
                        </q-item-label>
                    </q-item-section>
                </q-item>
                <q-item-label header>Select one Product</q-item-label>
                <q-separator spaced />
                <product-item />
            </q-list>
        </div>
    </q-page>
</template>

<script setup>
import { defineComponent } from "vue";

import { mdiPrinterCheck } from '@mdi/js';
import productItem from "./components/ProductLine";

</script>


