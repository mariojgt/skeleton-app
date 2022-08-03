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
                    <q-btn-dropdown color="orange" flat>
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
                <q-item-label header> System links </q-item-label>
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

import { mdiCashRegister, mdiInboxMultipleOutline, mdiShape, mdiBriefcase } from '@mdi/js';
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink";
const linksList = [
    {
        title: "POS",
        caption: "System POS",
        icon: mdiInboxMultipleOutline,
        link: "/pos",
    },
    {
        title: "Order",
        caption: "System Orders",
        icon: mdiInboxMultipleOutline,
        link: "/order/index",
    },
    {
        title: "Order",
        caption: "System Orders",
        icon: mdiInboxMultipleOutline,
        link: "/order/index",
    },
    {
        title: "Product",
        caption: "Manage Products",
        icon: mdiBriefcase,
        link: "/product/index",
    },
    {
        title: "Category",
        caption: "System Categories",
        icon: mdiShape,
        link: "/category/index",
    },
    {
        title: "Till",
        caption: "Setup, bar, kitchen, and more",
        icon: mdiCashRegister,
        link: "/till/index",
    }
];

let leftDrawerOpen = $ref(false);
// Open close the left drawer
const toggleLeftDrawer = async () => {
    leftDrawerOpen = !leftDrawerOpen;
};
</script>
