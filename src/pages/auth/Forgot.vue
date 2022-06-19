<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Reset password</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-lg">
              <q-input square filled clearable v-model="email" type="email" label="Email" color="orange" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="orange" size="lg" class="full-width" label="Reset" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <q-btn flat color="orange" label="Login" to="login" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent } from "vue";

let email = $ref('');

</script>
