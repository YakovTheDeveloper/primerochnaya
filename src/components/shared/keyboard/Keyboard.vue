<template>
    <div class="keyboard">
        <div v-for="(row, rowIndex) in currentKeys" :key="rowIndex" class="key-row">
            <button 
                v-for="key in row" 
                :key="key" 
                @click="pressKey(key)" 
                class="key" 
                :class="{
                    'large-key': largeKeys.includes(key),
                    'ultra-large-key': ultraLargeKeys.includes(key),
                }"
            >
                {{ key }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue';

const emit = defineEmits(['key-press']);

const currentLanguage = ref('ENG'); // Default language

const englishKeys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '⌫'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['⇧', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '→'],
    ['123', ',', ' ', '.', 'RUS'] // Language toggle button
];

const russianKeys = [
    ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', '⌫'],
    ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д'],
    ['⇧', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', '→'],
    ['123', ',', ' ', '.', 'ENG'] // Language toggle button
];

// Compute the active keys based on selected language
const currentKeys = computed(() => currentLanguage.value === 'ENG' ? englishKeys : russianKeys);

const largeKeys = ref(['→', '⌫', '⇧', 'RUS', 'ENG', '123']);
const ultraLargeKeys = ref([' ']);

const pressKey = (key) => {
    if (key === 'RUS' || key === 'ENG') {
        // Toggle language
        currentLanguage.value = currentLanguage.value === 'ENG' ? 'RUS' : 'ENG';
    } else {
        // Emit key press event
        emit('key-press', key);
    }
};
</script>

<style scoped>
.keyboard {
    display: flex;
    flex-direction: column;
    background-color: var(--color-light-beige);
    gap: 16px;
    border-radius: 80px;
    padding: 80px 132px 240px;
}

.key-row {
    display: flex;
    justify-content: center;
    margin-bottom: 5px;
    gap: 16px;
}

.key {
    background: #f8d9a7;
    border: none;
    width: 130px;
    height: 130px;
    margin: 3px;
    border-radius: 40px;
    font-size: 48px;
    flex-shrink: 0;
    font-weight: 600;
    color: var(--color-dark-beige);
    cursor: pointer;
}

.large-key {
    width: 276px;
    height: 130px;
}

.ultra-large-key {
    width: 740px;
    height: 130px;
}

.key:active {
    background: #f5c896;
}
</style>
