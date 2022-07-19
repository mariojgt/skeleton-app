<template>
    <q-page>
        <div class="q-pa-md">
            <div class="row">

                <!-- Bar Mode -->
                <div class="col-md-4">
                    <div class="q-pa-md q-gutter-sm">
                        <q-card class="my-card">
                            <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

                            <q-card-section>
                                <q-btn fab color="primary" :icon="mdiGlassWine" class="absolute"
                                    style="top: 0; right: 12px; transform: translateY(-50%);" />

                                <div class="row no-wrap items-center">
                                    <div class="col text-h6 ellipsis">
                                        Bar Mode
                                    </div>
                                </div>
                            </q-card-section>

                            <q-card-section class="q-pt-none">
                                <div class="text-caption text-grey">
                                    If Selected will show the bar orders
                                </div>
                            </q-card-section>

                            <q-separator />

                            <q-card-actions>
                                <q-btn flat color="primary" :to="{
                                    name: 'system-mode',
                                    query: {
                                        type: 'bar'
                                    }
                                }">
                                    Select
                                </q-btn>
                            </q-card-actions>
                        </q-card>
                    </div>
                </div>
                <!-- Kitchen Mode -->
                <div class="col-md-4">
                    <div class="q-pa-md q-gutter-sm">
                        <q-card class="my-card">
                            <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

                            <q-card-section>
                                <q-btn fab color="primary" :icon="mdiFood" class="absolute"
                                    style="top: 0; right: 12px; transform: translateY(-50%);" />

                                <div class="row no-wrap items-center">
                                    <div class="col text-h6 ellipsis">
                                        Kitchen Mode
                                    </div>
                                </div>
                            </q-card-section>

                            <q-card-section class="q-pt-none">
                                <div class="text-caption text-grey">
                                    If Selected will show dishes in the kitchen to prepare
                                </div>
                            </q-card-section>

                            <q-separator />

                            <q-card-actions>
                                <q-btn flat color="primary" :to="{
                                    name: 'system-mode',
                                    query: {
                                        type: 'kitchen'
                                    }
                                }">
                                    Select
                                </q-btn>
                            </q-card-actions>
                        </q-card>
                    </div>
                </div>

                <!-- Waiter Mode -->
                <div class="col-md-4">
                    <div class="q-pa-md q-gutter-sm">
                        <q-card class="my-card">
                            <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

                            <q-card-section>
                                <q-btn fab color="primary" :icon="mdiNewspaperVariantOutline" class="absolute"
                                    style="top: 0; right: 12px; transform: translateY(-50%);" />

                                <div class="row no-wrap items-center">
                                    <div class="col text-h6 ellipsis">
                                        Order Mode
                                    </div>
                                </div>
                            </q-card-section>

                            <q-card-section class="q-pt-none">
                                <div class="text-caption text-grey">
                                    If Select you are abbe to place order in the system
                                </div>
                            </q-card-section>

                            <q-separator />

                            <q-card-actions>
                                <q-btn flat color="primary" :to="{
                                    name: 'order-index'
                                }">
                                    Select
                                </q-btn>
                            </q-card-actions>
                        </q-card>
                    </div>
                </div>

            </div>
        </div>
    </q-page>
</template>

<script setup>
import { defineComponent } from "vue";

import { mdiGlassWine, mdiFood, mdiNewspaperVariantOutline } from '@mdi/js';

</script>


