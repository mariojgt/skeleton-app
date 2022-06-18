<template>
    <!-- Display the orders -->
    <div>
        <q-item clickable>
            <q-item-section>
                <q-item-label lines="1">Coke</q-item-label>
                <q-item-label caption>x 10</q-item-label>
                <q-item-label caption>Code with lime and ice</q-item-label>
            </q-item-section>
            <q-item-section side>
                <q-btn color="red" @click="confirm = true">
                    <q-icon :name="mdiTrashCan" />
                </q-btn>
            </q-item-section>
        </q-item>

        <q-dialog v-model="confirm" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar :icon="mdiTrashCan" color="red" text-color="white" />
                    <span class="q-ml-sm">Are you sure you want to remove this item.</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn label="Cancel" color="primary" v-close-popup />
                    <q-btn flat label="confirm" color="red" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

    </div>

</template>

<script setup>
import { defineComponent } from "vue";
import { mdiTrashCan } from '@mdi/js';

let confirm = $ref(false);

</script>


