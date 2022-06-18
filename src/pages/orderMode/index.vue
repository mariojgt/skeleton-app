<template>
    <q-page>
        <div class="q-pa-md">
            <div class="row">
                <div class="col-md-12">
                    <p>Order</p>
                </div>
                <!-- Completed Mode -->
                <div class="col-md-6 q-pa-sm">
                    <q-card class="my-card">
                        <q-card-section>
                            <div class="row no-wrap items-center">
                                <div class="col text-h6 ellipsis">
                                    My Orders
                                </div>
                            </div>
                        </q-card-section>
                        <q-separator />

                    </q-card>
                </div>
                <!-- Bar Mode -->
                <div class="col-md-6 q-pa-sm">
                    <q-card class="my-card">
                        <q-card-section>
                            <div class="row no-wrap items-center">
                                <div class="col text-h6 ellipsis">
                                    Orders
                                </div>
                            </div>
                        </q-card-section>
                        <q-separator />

                        <q-list bordered>
                            <q-item clickable>

                                <q-item-section>
                                    <q-expansion-item>
                                        <template v-slot:header>
                                            <q-item-section>
                                                <q-item-label>#1234</q-item-label>
                                                <q-item-label caption lines="1">£25.50</q-item-label>
                                            </q-item-section>

                                            <q-item-section side>

                                            </q-item-section>
                                        </template>

                                        <q-card>
                                            <q-card-section>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
                                                eius
                                                reprehenderit eos corrupti
                                                commodi magni quaerat ex numquam, dolorum officiis modi facere
                                                maiores
                                                architecto suscipit iste
                                                eveniet doloribus ullam aliquid.
                                            </q-card-section>
                                        </q-card>
                                    </q-expansion-item>
                                </q-item-section>

                                <q-item-section side>
                                    <q-btn round color="green" icon="navigation" />
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card>
                </div>
            </div>
        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-fab v-model="fabRight" vertical-actions-align="right" color="primary" glossy icon="keyboard_arrow_up"
                direction="up">
                <q-fab-action label-position="left" color="primary" @click="onClick" icon="mail" label="New Order" />
            </q-fab>
        </q-page-sticky>

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


