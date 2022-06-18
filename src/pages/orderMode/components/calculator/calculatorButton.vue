<template>
    <button :class="{ operation, doubleSpace, cash, clear, reset }" @click="$emit('handleClick', value)">
        {{ label }}
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        operation: Boolean,
        doubleSpace: Boolean,
        cash: Boolean,
        clear: Boolean,
        reset: Boolean,
        label: String,
        value: String,
    }
}
</script>

<style>
button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 100%;
    font-size: 22px;
    background-color: #f0f0f0;
    border: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
    border-right: 1px solid rgba(0, 0, 0, 0.09);
    cursor: pointer;
    transition: all .5s;
}

button:hover {
    background-color: #d8d8d8;
}

button.operation {
    background-color: #0d47a1;
    color: #fff;
}

button.cash {
    background-color: #673ab7;
    color: #fff;
}

button.clear {
    background-color: #ff9800;
    color: #fff;
}

button.reset {
    background-color: #b71c1c;
    color: #fff;
}

button.operation:hover {
    background-color: #00bca0;
}

button.doubleSpace {
    width: 50%;
}
</style>
