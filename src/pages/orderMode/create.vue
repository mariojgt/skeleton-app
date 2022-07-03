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
                <q-item-label header>Categories</q-item-label>
                <q-item clickable v-ripple class="bg-green text-white">
                    <q-item-section>
                        <q-item-label>Password</q-item-label>
                        <q-item-label caption>
                            10 product
                        </q-item-label>
                    </q-item-section>
                </q-item>
                <q-item clickable v-ripple class="bg-green text-white">
                    <q-item-section>
                        <q-item-label>Password</q-item-label>
                        <q-item-label caption>
                            10 product
                        </q-item-label>
                    </q-item-section>
                </q-item>
                <q-separator spaced />
                <q-item-label header>Product</q-item-label>
                <q-separator spaced />

                <q-item>
                    <q-item-section avatar top>
                        <q-avatar color="primary" text-color="white">
                            m
                        </q-avatar>
                    </q-item-section>

                    <q-item-section top class="col-6">
                        <q-item-label class="q-mt-sm">Product Name</q-item-label>
                        <q-item-label class="q-mt-sm">
                            extra guacamode souce, extra guacamode souce, extra guacamode souce, extra guacamode souce,
                            extra guacamode souce, extra guacamode souce, extra guacamode souce, extra guacamode souce,
                        </q-item-label>
                    </q-item-section>

                    <q-item-section top class="col-3">
                        <q-item-label caption lines="1">
                            <q-item-label class="q-mt-sm">Allergies</q-item-label>
                            <div class="q-pa-md q-gutter-md">
                                <q-badge color="blue" label="here" />
                                <q-badge color="blue" label="here" />
                            </div>
                        </q-item-label>
                        <q-item-label lines="2">
                            <div class="q-pa-md q-gutter-md">
                                <q-btn color="white" text-color="black" label="qty:1" />
                                <q-btn color="white" text-color="black" label="Modification" />
                            </div>
                        </q-item-label>
                    </q-item-section>

                    <q-item-section top side class="col">
                        <div class="text-grey-8 q-gutter-xs">
                            <q-btn size="12px" color="blue" dense round icon="add" />
                        </div>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
    </q-page>
</template>

<script setup>
import { defineComponent } from "vue";

import { mdiPrinterCheck } from '@mdi/js';
import ticket from "../../components/ticket/Ticket";
import ticketCompleted from "../../components/ticket/TicketCompleted";

// The display mode
const options = ['half', 'full'];
let option = $ref('half');

// The section or till
const sectionOptions = ['friyer', 'teppan', 'kitchen'];
let sectionOption = $ref('friyer');

</script>


