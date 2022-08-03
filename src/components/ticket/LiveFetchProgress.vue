<template>
    <div class="row">
        <div class="col-md-10 q-pa-md">
            <q-linear-progress size="md" :value="progress" color="orange" track-color="orange" class="q-mt-sm" />
        </div>
        <div class="col-md-2 q-pa-md">
            <q-btn color="orange" class="full-width" label="Refresh" @click="callRefresh" />
        </div>
    </div>
</template>

<script setup >
import { watch, onMounted } from 'vue'

let progress = $ref(0.01);
let buffer = $ref(0.01);

// Create a define props with computed properties
const myProps = defineProps({
    refreshIncrease: {
        type: Number,
        default: 0.05
    }
});

onMounted(() => {
    setInterval(() => {
        progress = progress + myProps.refreshIncrease;
    }, 1000);
});

const emit = defineEmits(["refresh"]);

const callRefresh = async () => {
    emit("refresh", progress);
    progress = 0.01;
};

watch(
    () => progress,
    (v) => {
        // If the progress is greater than 1 we can refresh
        if (v >= 1) {
            callRefresh();
        }
    }
);

</script>
