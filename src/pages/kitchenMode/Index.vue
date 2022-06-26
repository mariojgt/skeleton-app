<template>
    <q-page>
        <div class="q-pa-md">
            <div class="row">
                <div class="col-md-12">
                    <div class="q-gutter-md">
                        <q-select v-model="sectionOption" :options="sectionOptions" label="Section" />
                    </div>
                </div>
                <div class="col-md-6">
                    <p>Kitchen</p>
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
                <div :class="{ 'col-md-12': option == 'full', 'col-md-6': option == 'half' }">
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

// The display mode
const options = ['half', 'full'];
let option = $ref('half');

// The section or till
const sectionOptions = ['friyer', 'teppan', 'kitchen'];
let sectionOption = $ref('friyer');

</script>


