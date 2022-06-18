<template>
    {{ current_minutes }}:{{ current_seconds }}
</template>

<script setup >
import { watch, onMounted } from 'vue'

let current_minutes = $ref(0);
let current_seconds = $ref(0);

// Create a define props with computed properties
const myProps = defineProps({
    minutes: {
        type: Number,
        default: 0
    },
    seconds: {
        type: Number,
        default: 0
    }
});

onMounted(() => {
    // Set the initial time
    current_minutes = parseInt(myProps.minutes);
    current_seconds = parseInt(myProps.seconds);
});

setInterval(() => {
    // Create the seconds variable and format it to always have 2 digits
    current_seconds = current_seconds + 1;
    if (current_seconds >= 60) {
        current_seconds = 0;
        current_minutes = current_minutes + 1;
    }
}, 1000);

const emit = defineEmits(["timer:warming"]);

watch(
    () => current_minutes,
    (v) => {
        emit("timer:warming", v);
    }
);

</script>
