<template>
    <!-- Display the orders -->
    <div>
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
                        <q-btn color="green" text-color="white" label="qty:1" @click="dialogQty = true" />
                        <q-btn color="blue" text-color="white" label="Modification"
                            @click="dialogModification = true" />
                    </div>
                </q-item-label>
            </q-item-section>

            <q-item-section top side class="col">
                <div class="text-grey-8 q-gutter-xs">
                    <q-btn size="12px" color="blue" dense round icon="add" />
                </div>
            </q-item-section>
        </q-item>
        <q-separator spaced />
    </div>

    <!-- Qty adjust dialog -->
    <q-dialog v-model="dialogQty" position="left">
        <q-card style="width: 350px">
            <q-linear-progress :value="1" color="orange" />

            <q-card-section class="row items-center no-wrap">
                <div>
                    <div class="text-grey">Stock:10</div>
                </div>
                <q-space />
                <q-btn flat round icon="remove" />
                <div class="text-weight-bold">1</div>
                <q-btn flat round icon="add" />
            </q-card-section>
        </q-card>
    </q-dialog>
    <!-- Product modification -->
    <q-dialog v-model="dialogModification" position="right">
        <q-card style="width: 350px">

            <div class="q-pa-md" style="max-width: 350px">
                <q-list bordered separator>
                    <q-item clickable v-ripple>
                        <q-item-section>Single line item</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label>Item with caption</q-item-label>
                            <q-item-label caption>Caption</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                        <q-item-section>
                            <q-item-label overline>OVERLINE</q-item-label>
                            <q-item-label>Item with caption</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </q-card>
    </q-dialog>

</template>

<script setup>
import { defineComponent } from "vue";
import { mdiTrashCan } from '@mdi/js';

let dialogQty = $ref(false);
let dialogModification = $ref(false);

</script>


