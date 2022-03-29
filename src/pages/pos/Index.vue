<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col">
          <div class="q-pa-md bg-grey-10 text-white">
            <q-list dark bordered separator style="">
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
        </div>
        <div class="col">Third, but first</div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent } from "vue";

let test = $ref("asdsa");
</script>
