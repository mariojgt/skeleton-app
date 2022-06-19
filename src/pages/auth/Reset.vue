<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Password Reset</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-lg">
              <q-input square filled clearable v-model="email" type="email" label="Email" color="orange" />
              <q-input square filled clearable v-model="password" type="password" label="Password" color="orange" />
              <q-input square filled clearable v-model="password_confirm" type="password" label="Confirm password"
                color="orange" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="orange" size="lg" class="full-width" label="Register" />
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
import { onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router'

// Route Reference
const route = useRoute();
const router = useRouter()

let email = $ref('');
let password = $ref('');
let password_confirm = $ref('');
// Get the token from the URL
let token = $ref('');
// route.query.token

onMounted(() => {
  // Get the email from the URL
  email = route.query.email ?? '';
  // If the token is not empty, set the token else redirect to login
  if (route.query.token) {
    token = route.query.token;
  } else {
    router.push('/login');
  }
});

</script>
