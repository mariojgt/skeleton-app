<template>
    <q-page class="window-height window-width row justify-center items-center">
        <div class="column">
            <div class="row">
                <h5 class="text-h5 text-white q-my-md">Skeleton Pos</h5>
            </div>
            <div class="row">
                <q-card square bordered class="q-pa-lg shadow-1">
                    <q-form class="q-gutter-md">
                        <q-input square filled clearable v-model="code" type="text" label="Code" color="orange" />
                        <q-card-actions class="q-px-md">
                            <q-btn unelevated color="orange" size="lg" class="full-width" label="Login" type="submit" />
                        </q-card-actions>
                        <q-card-section class="text-center q-pa-none">
                            <q-btn flat color="orange" label="Register" to="register" />
                        </q-card-section>
                    </q-form>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { defineComponent } from "vue";

let code = $ref("");
</script>
