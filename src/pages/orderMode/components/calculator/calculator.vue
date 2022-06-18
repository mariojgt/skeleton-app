<template>
    <div class="calc">
        <div class="display">
            <div class="display-screen">
                {{ currentValue }}
            </div>
            <!-- <div class="result-screen">
                12.25
            </div> -->
        </div>
        <div class="keypad">
            <div class="keypad-row">
                <Button label="5.00" value="5.00" cash @handleClick="addCashValue" />
                <Button label="10.00" value="10.00" cash @handleClick="addCashValue" />
                <Button label="20.00" value="20.00" cash @handleClick="addCashValue" />
                <Button label="<" value="remove" clear @handleClick="clearLastValue" />
            </div>
            <div class="keypad-row">
                <Button label="7" value="7" @handleClick="addSingleValue" />
                <Button label="8" value="8" @handleClick="addSingleValue" />
                <Button label="9" value="9" @handleClick="addSingleValue" />
                <Button label="Clear" value="*" reset @handleClick="clearValue" />
            </div>
            <div class="keypad-row">
                <Button label="4" value="4" @handleClick="addSingleValue" />
                <Button label="5" value="5" @handleClick="addSingleValue" />
                <Button label="6" value="6" @handleClick="addSingleValue" />
                <Button label="Cash" value="/" operation @handleClick="setOperation" />
            </div>
            <div class="keypad-row">
                <Button label="1" value="1" @handleClick="addSingleValue" />
                <Button label="2" value="2" @handleClick="addSingleValue" />
                <Button label="3" value="3" @handleClick="addSingleValue" />
                <Button label="Card" value="*" operation @handleClick="setOperation" />
            </div>
            <div class="keypad-row">
                <Button label="0" value="0" @handleClick="addSingleValue" />
                <Button label="." value="." @handleClick="addSingleValue" />
                <Button label="00" value="00" @handleClick="addSingleValue" />
                <Button label="Other" value="-" operation @handleClick="setOperation" />
            </div>
        </div>
    </div>
</template>

<script setup >

import Button from "../calculator/calculatorButton.vue";

// Create a define props with computed properties
const myProps = defineProps({
    order: {
        type: String,
        default: '',
    },
    currentBalance: {
        type: String,
        default: '',
    }
});

let currentValue = $ref('0.00');

/**
 *
 * Quick add value to currentValue
 *
 * @param String value
 */
const addCashValue = async (value) => {
    if (currentValue == '0.00') {
        currentValue = value;
    } else {
        currentValue = String(parseFloat(currentValue) + parseFloat(value));
    }
};

/**
 *
 * Quick add value to currentValue but only one time
 *
 * @param String value
 */
const addSingleValue = async (value) => {
    if (currentValue == '0.00') {
        currentValue = value;
    } else {
        currentValue += value;
    }
};

/**
 *
 * Clear all value in currentValue
 *
 * @param String value
 */
const clearValue = async () => {
    currentValue = "0.00";
};

/**
 * Clear the last value
 */
const clearLastValue = async () => {
    currentValue = currentValue.slice(0, -1);
    // If is empty, set to 0.00
    if (currentValue == '') {
        currentValue = '0.00';
    }
};

</script>

<style>
.calc {
    display: flex;
    flex-direction: column;
    width: auto;
    height: auto;
    border-radius: 8px;
    background-color: #f0f0f0;
    overflow: hidden;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.4);
}

.display {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 140px;
    background-color: #0d47a1;
    padding: 10px;
}

.keypad {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.keypad-row {
    display: flex;
    flex-direction: row;
    height: 64px;
    width: 100%;
}

.result-screen {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    font-size: 20px;
    flex: 1;
}

.display-screen {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    font-size: 22px;
    flex: 1;
}
</style>

