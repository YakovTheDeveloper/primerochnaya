<template>
    <div class="get-photo-email offset">
        <h2 class="title popup">Или введите электронную почту</h2>
        <div class="get-photo-email__form-row">
            <Input v-model="props.emailModel" @update:modelValue="updateEmailModel" @focus="onFocus" type="text"
                placeholder="Адрес электронной почты" ref="emailRef" />
            <VButton variant="primary" @click="onEmailSendHandler" :disabled="sendButtonDisabled"
                class="get-photo-email__form-btn">
                Отправить
            </VButton>
        </div>
        <p class="text" v-show="showValidationError">Неверный формат адреса почты, попробуйте снова</p>
    </div>
</template>

<script setup lang="ts">
import Input from '@/components/shared/input/Input.vue';
import VButton from '@/components/shared/v-button/VButton.vue';
import { computed, ref, watch, watchEffect } from 'vue';


const props = defineProps<{
    emailModel: string;
    onEmailSend: () => void
    onFocus: () => void
}>()

const showValidationError = ref(false);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const onEmailSendHandler = () => {
    const valid = emailPattern.test(props.emailModel);
    if (valid) {
        props.onEmailSend()
        return
    }
    showValidationError.value = true
}

const sendButtonDisabled = computed(() => props.emailModel.length === 0)

const emit = defineEmits(['update:emailModel']);

const updateEmailModel = (value: string) => {
    showValidationError.value = false
    emit('update:emailModel', value);
};

</script>

<style scoped lang="scss">
.get-photo-email {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-bottom: auto;

    &__form-btn {
        min-width: 653px;
    }

    &__form-row {
        display: flex;
        gap: 20px;
    }
}

.text.error {
    color: red;
}

.input-error {
    border: 1px solid red;
}
</style>