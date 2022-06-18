<template>
    <q-page>
        <div class="q-pa-md">
            <div class="row">

                <!-- Bar Mode -->
                <div class="col-md-6">
                    <div class="q-pa-md q-gutter-sm">
                        <q-card class="my-card">
                            <q-card-section>
                                <div class="row no-wrap items-center">
                                    <div class="col text-h6 ellipsis">
                                        Current order
                                    </div>
                                </div>
                            </q-card-section>
                            <q-separator />
                            <q-list bordered>
                                <!-- Ticket arrived -->
                                <ticket />
                                <ticket minutes="10" seconds="10" />
                                <ticket minutes="15" seconds="10" />
                            </q-list>
                        </q-card>
                    </div>
                </div>
                <!-- Completed Mode -->
                <div class="col-md-6">
                    <div class="q-pa-md q-gutter-sm">
                        <q-card class="my-card">
                            <q-card-section>
                                <div class="row no-wrap items-center">
                                    <div class="col text-h6 ellipsis">
                                        Completed Order
                                    </div>
                                </div>
                            </q-card-section>
                            <q-separator />
                            <q-list bordered>
                                <!-- Ticket arrived -->
                                <ticketCompleted />
                                <ticketCompleted completedTime="15:02" />
                                <ticketCompleted />
                                <ticketCompleted />
                                <ticketCompleted />
                            </q-list>
                        </q-card>
                    </div>
                </div>

            </div>
        </div>
    </q-page>
</template>

<script setup>
import { defineComponent } from "vue";

import { mdiPrinterCheck } from '@mdi/js';
import ticket from "../../components/ticket/Ticket";
import ticketCompleted from "../../components/ticket/TicketCompleted";

</script>


