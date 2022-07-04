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
            <q-item-section>
                <q-item-label class="q-pa-md">Product Name</q-item-label>

                <!-- Modifications -->
                <q-expansion-item expand-separator icon="perm_identity" label="Modifications">
                    <q-card>
                        <q-card-section>
                            <q-list>
                                <q-item clickable v-ripple v-for="(item, index) in modification" :key="index">
                                    <q-item-section>
                                        {{ item }}
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>

                <!-- Extras -->
                <q-expansion-item expand-separator icon="perm_identity" label="Extras">
                    <q-card>
                        <q-card-section>
                            <q-list>
                                <q-item clickable v-ripple>
                                    <q-item-section>
                                        Extra souce x 4.00
                                    </q-item-section>
                                </q-item>

                                <q-item clickable v-ripple>
                                    <q-item-section>
                                        Extra rice x 4.00
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>

                <q-item-label>
                    <div class="q-pa-md q-gutter-md">
                        <q-btn color="green" text-color="white" :label="'qty:' + qty" @click="dialogQty = true" />
                        <q-btn color="purple" text-color="white" label="Modification"
                            @click="dialogModification = true" />
                        <q-btn color="indigo" text-color="white" label="Extras" @click="dialogExtras = true" />
                        <q-chip size="md" color="green">
                            £1.00
                        </q-chip>
                    </div>
                </q-item-label>

                <q-item-label caption>Allergies</q-item-label>
                <q-item-label>
                    <div class="q-pa-md q-gutter-md">
                        <q-badge color="red" label="here" />
                        <q-badge color="red" label="here" />
                    </div>
                </q-item-label>

                <q-item-label>
                    <q-btn color="teal" class="full-width" label="Add to order" />
                </q-item-label>

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
                <q-btn flat round icon="remove" @click="decreaseQty" />
                <div class="text-weight-bold">{{ qty }}</div>
                <q-btn flat round icon="add" @click="increaseQty" />
            </q-card-section>
        </q-card>
    </q-dialog>
    <!-- Product modification -->
    <q-dialog v-model="dialogModification" position="right">
        <q-card>

            <div class="q-pa-md" style="max-width: 350px">
                <q-list bordered separator>
                    <q-item v-for="(item, index) in modification" :key="index">
                        <q-item-section>{{ item }}</q-item-section>
                        <q-item-section avatar>
                            <q-btn round color="red" icon="remove" @click="modification.splice(index, 1)" />
                        </q-item-section>
                    </q-item>

                    <!-- add modification -->
                    <q-item>
                        <q-item-section>
                            <q-input v-model="modificationText" label="Modification" />
                        </q-item-section>
                        <q-item-section avatar>
                            <q-btn round color="green" icon="add" @click="addModification" />
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </q-card>
    </q-dialog>

    <!-- Product Extras -->
    <q-dialog v-model="dialogExtras" position="right">
        <q-card>

            <div class="q-pa-md" style="max-width: 350px">
                <q-list bordered separator>
                    <q-item>
                        <q-item-section>Icon as avatar</q-item-section>
                        <q-item-section avatar>
                            <q-btn round color="red" icon="remove" />
                        </q-item-section>
                    </q-item>

                    <!-- add modification -->
                    <q-item>
                        <q-item-section>
                            <q-input v-model="text" label="Modification" />
                        </q-item-section>
                        <q-item-section avatar>
                            <q-btn round color="green" icon="add" />
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


// Dialogs
let dialogQty = $ref(false);
let dialogModification = $ref(false);
let dialogExtras = $ref(false);

// Logic for the modification dialog
let modification = $ref([]);
let modificationText = $ref(null);

const addModification = async () => {
    if (modificationText) {
        modification.push(modificationText);
        modificationText = null;
    }
};

// qty dialog
let qty = $ref(1);
let maxStock = $ref(10);

const increaseQty = async () => {
    if (qty < maxStock) {
        qty++;
    }
};

const decreaseQty = async () => {
    if (qty > 1) {
        qty--;
    }
};

</script>


