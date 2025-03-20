<template>
    <VSlideContainer :route="Routes.GetPhoto">
        <VContainer class="get-photo">
            <h1 class="title offset large">Получить фото</h1>
            <GetPhotoScanQR />
            <GetPhotoEmail v-model:emailModel="emailModel" :onEmailSend="onEmailSend" :onFocus="onFocus" />
            <VButton variant="primary" class="offset" @click="onBack">
                Назад
            </VButton>
            <div :class="['get-photo__keyboard', showKeyboard ? 'show' : 'hide']">
                <Keyboard2 :show="showKeyboard" @onChange="onChange" @onKeyPress="onKeyPress" :input="emailModel"
                    @onClose="closeKeyboard" />
            </div>
        </VContainer>
        <GetPhotoStatus />
    </VSlideContainer>
</template>

<script setup lang="ts">
import VContainer from '@/components/shared/container/VContainer.vue';
import VButton from '@/components/shared/v-button/VButton.vue';
import { computed, ref } from 'vue';
import Keyboard2 from '@/components/shared/keyboard/Keyboard2.vue';
import GetPhotoStatus from './GetPhotoStatus.vue';
import { useRouter } from 'vue-router';
import VSlideContainer from '@/components/shared/container/VSlideContainer.vue';
import { Routes } from '@/router';
import GetPhotoScanQR from './GetPhotoScanQR.vue';
import { useGetFileStore } from '@/stores/getFileStore';
import GetPhotoEmail from './GetPhotoEmail.vue';


const { sendToEmailHandler } = useGetFileStore()
const emailRef = ref<HTMLInputElement | null>(null)
const router = useRouter()
const showKeyboard = ref(false)
const onChange = (input: string) => emailModel.value = input
const emailModel = ref('')
const onKeyPress = (key: string) => {
    setTimeout(() => emailRef.value?.nativeInput?.focus(), 0)

    const specialKeys = ["{bksp}", "{space}", "{enter}", "{shift}", "{numbers}", "{letters}", "{lang}"];
    if (key === "{bksp}") {
        emailModel.value = emailModel.value.slice(0, -1);
    } else if (key === "{space}") {
        emailModel.value += " ";
    } else if (!specialKeys.includes(key)) {
        emailModel.value += key;
    }

}

const onBack = () => {
    router.back();
}
const onFocus = () => showKeyboard.value = true
const closeKeyboard = () => showKeyboard.value = false
const sendButtonDisabled = computed(() => emailModel.value.length === 0)

const onEmailSend = () => {
    sendToEmailHandler(emailModel.value)
    showKeyboard.value = false
}

</script>

<style scoped lang="scss">
.get-photo {
    position: relative;

    &__keyboard {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        padding-bottom: 150px;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
        transition: all 0.4s ease-in-out;

        &.hide {
            opacity: 0;
            visibility: hidden
        }

        &.show {
            opacity: 1;
            visibility: visible
        }
    }


}
</style>