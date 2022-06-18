<template>
    <q-page>
        <div class="q-pa-md">
            <div class="row">
                <div class="col-md-12">
                    <p>Order</p>
                </div>
                <!-- Completed Mode -->
                <div class="col-md-6 q-pa-sm">
                    <q-card class="my-card q-pa-lg">
                        <q-card-section>
                            <div class="row no-wrap items-center">
                                <div class="col text-h6 ellipsis">
                                    Orders summary
                                </div>
                            </div>
                        </q-card-section>
                        <q-separator />
                        <q-list>
                            <!-- Display the orders -->
                            <orderLine />
                        </q-list>
                    </q-card>
                </div>
                <!-- Bar Mode -->
                <div class="col-md-6 q-pa-sm">
                    <!-- Payment calculator -->
                    <calculator />
                    <q-card class="my-card q-pa-lg">
                        <div class="bg-grey-10">
                            <q-list>
                                <!-- Display the orders -->
                                <q-item clickable>
                                    <q-item-section>
                                        <q-item-label lines="1">Total</q-item-label>
                                    </q-item-section>
                                    <q-item-section side>
                                        <q-item-label caption>£12.25</q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-item clickable>
                                    <q-item-section>
                                        <q-item-label lines="1">Tax</q-item-label>
                                    </q-item-section>
                                    <q-item-section side>
                                        <q-item-label caption>£12.25</q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-item clickable>
                                    <q-item-section>
                                        <q-item-label lines="1">Balance</q-item-label>
                                    </q-item-section>
                                    <q-item-section side>
                                        <q-item-label caption>
                                            <q-badge rounded color="red" label="£-12.25" />
                                        </q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </div>

                        <div class="bg-primary">
                            <q-list>
                                <q-item>
                                    <q-item-section>
                                        <q-item-label>Payment History</q-item-label>
                                    </q-item-section>
                                </q-item>

                                <q-separator spaced inset />
                                <q-item clickable>
                                    <q-item-section>
                                        <q-item-label>Single line item</q-item-label>
                                        <q-item-label caption>£12.25</q-item-label>
                                    </q-item-section>

                                    <q-item-section side top>
                                        <q-badge color="green" label="paid" />
                                    </q-item-section>
                                </q-item>
                                <q-item clickable>
                                    <q-item-section>
                                        <q-item-label>Single line item</q-item-label>
                                        <q-item-label caption>£13.25</q-item-label>
                                    </q-item-section>

                                    <q-item-section side top>
                                        <q-badge color="purple" label="refund" />
                                    </q-item-section>
                                </q-item>
                                <q-item clickable>
                                    <q-item-section>
                                        <q-item-label>Single line item</q-item-label>
                                        <q-item-label caption>£13.25</q-item-label>
                                    </q-item-section>

                                    <q-item-section side top>
                                        <q-badge color="red" label="change" />
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </div>
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
import orderLine from "./components/orderLine.vue";
import calculator from "./components/calculator/calculator.vue";


</script>
