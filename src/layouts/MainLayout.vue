<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar class="bg-dark">
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

                <q-toolbar-title>
                    <q-item clickable tag="a" to="/pos">
                        Skeleton Pos
                    </q-item>
                </q-toolbar-title>

                <div class="q-pa-sm">
                    <q-btn-dropdown color="orange">
                        <template v-slot:label>
                            <div class="row items-center no-wrap">
                                <q-avatar>
                                    <img :src="userInfo.avatar">
                                </q-avatar>
                                <p class="q-pa-sm">{{ userInfo.full_name }}</p>
                            </div>
                        </template>
                        <q-list>

                            <q-item clickable v-close-popup tag="a" to="/user/profile">
                                <q-item-section>
                                    <q-item-label>My Profile</q-item-label>
                                </q-item-section>
                            </q-item>

                            <q-item clickable v-close-popup tag="a" to="/logout">
                                <q-item-section>
                                    <q-item-label>Logout</q-item-label>
                                </q-item-section>
                            </q-item>

                            <q-item disable>
                                <q-item-section>
                                    <q-item-label>V {{ $q.version }}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" bordered>
            <q-list>
                <q-item-label header> Essential Links </q-item-label>
                <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
            </q-list>
        </q-drawer>
        <q-page-container>
            <router-view />
        </q-page-container>
        <q-ajax-bar ref="bar" position="bottom" color="orange" size="10px" />
    </q-layout>
</template>

<script setup>
// Import the storage
import * as storage from "../boot/storage";
// User basic info
let userInfo = storage.getUserInfo();
import { mdiCashRegister } from '@mdi/js';
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink";
const linksList = [
    {
        title: "Till",
        caption: "Setup, bar, kitchen, and more",
        icon: mdiCashRegister,
        link: "/till/index",
    },
    {
        title: "Product",
        caption: "product",
        icon: "code",
        link: "/product/index",
    },
    {
        title: "Order",
        caption: "Orders",
        icon: "recipe",
        link: "/order/index",
    },
    {
        title: "Forum",
        caption: "forum.quasar.dev",
        icon: "record_voice_over",
        link: "https://forum.quasar.dev",
    },
    {
        title: "Twitter",
        caption: "@quasarframework",
        icon: "rss_feed",
        link: "https://twitter.quasar.dev",
    },
    {
        title: "Facebook",
        caption: "@QuasarFramework",
        icon: "public",
        link: "https://facebook.quasar.dev",
    },
    // {
    //     title: "Logout",
    //     icon: "favorite",
    //     link: "logout",
    // },
];
let leftDrawerOpen = $ref(false);
const toggleLeftDrawer = async () => {
    leftDrawerOpen = !leftDrawerOpen;
};
// export default defineComponent({
//   name: "MainLayout",
//   components: {
//     EssentialLink,
//   },
//   setup() {
//     const leftDrawerOpen = ref(false);
//     return {
//       essentialLinks: linksList,
//       leftDrawerOpen,
//       toggleLeftDrawer() {
//         leftDrawerOpen.value = !leftDrawerOpen.value;
//       },
//     };
//   },
// });
</script>
