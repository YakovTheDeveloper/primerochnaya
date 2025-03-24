<template>
    <Overlay v-if="showWaitingMode">
        <PopupBody>
            <p class="title popup">Завершение сеанса</p>
            <p class="timer-title">
                {{ store.time }}
            </p>
            <p class="text center">
                В связи с отсутствием активности
                <br />
                - сеанс завершается.
                <br />
                Вы можете нажать в любое место
                <br />
                экрана, чтобы возобновить работу
            </p>
            <template #actions>
                <VButton variant="primary" @click="">
                    Отмена
                </VButton>
            </template>
        </PopupBody>
    </Overlay>
</template>

<script setup lang="ts">
import Overlay from '@/components/shared/overlay/Overlay.vue';
import PopupBody from '@/components/shared/popup/popupBody.vue';
import VButton from '@/components/shared/v-button/VButton.vue';
import { TIME_TO_SHOW_MESSAGE, useWaitingModeStore } from '@/stores/waitingModeStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const store = storeToRefs(useWaitingModeStore())

const showWaitingMode = computed(() => store.time.value <= TIME_TO_SHOW_MESSAGE)



</script>

<style scoped>
.timer-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 150px;
    font-weight: 700;
    color: var(--color-dark-beige);
}
</style>