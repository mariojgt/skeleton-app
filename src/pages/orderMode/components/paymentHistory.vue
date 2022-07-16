<template>
    <q-expansion-item expand-separator :icon="mdiFormatListCheckbox" label="Balance History"
        :caption="'£' + props.orderBalance" class="shadow-1 overflow-hidden bg-red text-white"
        :class="{ 'bg-green': props.orderBalance == 0 }">
        <q-card>
            <q-card-section>
                <q-item-section>
                    <q-list dark bordered separator>
                        <q-item v-for="(item, index) in props.paymentHistory" :key="index" clickable v-ripple>
                            <q-item-section>
                                <q-item-label>
                                    {{ item.status }}
                                </q-item-label>
                                <q-item-label caption lines="2">
                                    {{ item.description }}
                                </q-item-label>
                            </q-item-section>

                            <q-item-section side top>
                                <q-item-label caption>
                                    <q-chip class="glossy" square color="teal" text-color="white">
                                        {{ item.type }}
                                    </q-chip>
                                    <q-chip square color="deep-orange">
                                        <q-avatar>
                                            <img :src="item.user.avatar">
                                        </q-avatar>
                                        {{ item.user.first_name }} {{ item.user.last_name }}
                                    </q-chip>
                                </q-item-label>
                                <!-- <q-item-label caption>{{ item.type }}</q-item-label> -->
                                <q-chip size="lm" v-if="item.formatted_amount >= 0" color="teal">
                                    {{ '£' + item.formatted_amount }}
                                </q-chip>
                                <q-chip size="lm" v-else color="red">
                                    {{ '£' + item.formatted_amount }}
                                </q-chip>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-item-section>
            </q-card-section>
        </q-card>
    </q-expansion-item>

</template>

<script setup>
import { mdiFormatListCheckbox } from '@mdi/js';

// Create a define props with computed properties
const props = defineProps({
    orderBalance: {
        type: Number,
        default: 0,
    },
    paymentHistory: {
        type: Object,
        default: () => ({}),
    }
});

</script>


