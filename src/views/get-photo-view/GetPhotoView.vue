<template>
    <VContainer class="get-photo">
        <h1 class="title offset large">Получить фото</h1>
        <div class="get-photo__scan-qr">
            <p class="title popup">
                Отсканируйте QR-код, <br />
                чтобы получить снимок
            </p>
            <div class="get-photo__scan-qr-image">
                <img :src="QRImgUrl" alt="">
            </div>
            <VButton variant="special" size="small">
                Не сканируется код?
            </VButton>
        </div>
        <div class="get-photo__email offset">
            <h2 class="title popup">Или введите электронную почту</h2>
            <div class="get-photo__email-form-row">
                <Input v-model="emailModel" @focus="onFocus" type="text" placeholder="Адрес электронной почты"
                    ref="emailRef" />
                <VButton variant="primary" @click="onEmailSend" :disabled="sendButtonDisabled"
                    class="get-photo__email-form-btn">Отправить</VButton>
            </div>
        </div>
        <VButton variant="primary" class="offset" @click="onBack">
            Назад
        </VButton>
        <div class="get-photo__keyboard" v-show="showKeyboard">
            <Keyboard2 v-show="showKeyboard" @onChange="onChange" @onKeyPress="onKeyPress" :input="emailModel"
                @onClose="closeKeyboard" />
        </div>
    </VContainer>
    <GetPhotoStatus />
</template>

<script setup lang="ts">
import VContainer from '@/components/shared/container/VContainer.vue';
import VButton from '@/components/shared/v-button/VButton.vue';
import ImgQR from '@/assets/img/mock/qr.png'
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import Input from '@/components/shared/input/Input.vue';
import Keyboard2 from '@/components/shared/keyboard/Keyboard2.vue';
import { useGetPhotoStore } from '@/stores/getPhotoStore';
import GetPhotoStatus from './GetPhotoStatus.vue';
import { useRouter } from 'vue-router';

const { sendEmailHandler } = useGetPhotoStore()
const emailRef = ref<HTMLInputElement | null>(null)
const router = useRouter()
const showKeyboard = ref(false)
const onChange = (input: string) => emailModel.value = input
const emailModel = ref('')
const onKeyPress = (key: string) => {
    setTimeout(() => emailRef.value?.nativeInput?.focus(), 0)

    if (key === "{bksp}") {
        emailModel.value = emailModel.value.slice(0, -1);
    } else if (key === "{space}") {
        emailModel.value += " ";
    } else if (key === "{enter}") {
        // do nothing
    } else if (key === "{shift}") {
        // do nothing
    } else if (key === '{numbers}') {
        // do nothing
    } else if (key === '{letters}') {
        // do nothing
    } else if (key === '{lang}') {
        // do nothing
    }
    else {
        // Add the character to the input model
        emailModel.value += key;
    }

}

const onBack = () => {
    router.back();
}
const onFocus = () => showKeyboard.value = true
const closeKeyboard = () => showKeyboard.value = false
const sendButtonDisabled = computed(() => emailModel.value.length === 0)
const QRImgUrl = ref(ImgQR)
const onEmailSend = () => {
    console.log(`output->111`, 111)
    sendEmailHandler()
}

</script>

<style scoped lang="scss">
.get-photo {
    &__scan-qr {
        display: flex;
        flex-direction: column;
        align-items: center;

        &-image {
            width: 1000px;
            height: 1000px;
            margin: 40px auto 24px;
        }
    }

    &__email {
        display: flex;
        flex-direction: column;
        gap: 40px;
        margin-bottom: auto;

        &-form-btn {
            min-width: 653px;
        }

        &-form-row {
            display: flex;
            gap: 20px;
        }
    }

    &__keyboard {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        // padding: 150px 80px;
        padding-bottom: 150px;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
    }
}
</style>