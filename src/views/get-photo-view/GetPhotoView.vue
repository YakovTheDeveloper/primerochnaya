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
                <VButton variant="primary" class="get-photo__email-form-btn">Отправить</VButton>
            </div>
        </div>
        <VButton variant="primary offset">
            Назад
        </VButton>
        <div class="get-photo__keyboard" v-show="showKeyboard">
            <Keyboard @key-press="onKeyboardTap" />
        </div>
    </VContainer>
</template>

<script setup lang="ts">
import VContainer from '@/components/shared/container/VContainer.vue';
import VButton from '@/components/shared/v-button/VButton.vue';
import ImgQR from '@/assets/img/mock/qr.png'
import { ref, watch, watchEffect } from 'vue';
import Input from '@/components/shared/input/Input.vue';
import Keyboard from '@/components/shared/keyboard/Keyboard.vue';

const emailRef = ref<HTMLInputElement | null>(null)
const showKeyboard = ref(false)
const emailModel = ref('')
const onFocus = () => showKeyboard.value = true

const QRImgUrl = ref(ImgQR)

const onKeyboardTap = (key: string) => {
    if (key === '⇧') {
        return
    }
    if (key === '⌫') {
        // Handle backspace: remove last character
        emailModel.value = emailModel.value.slice(0, -1);
    }
    emailModel.value += key;
    if (!emailRef.value) return;
    const inputElement = emailRef.value.nativeInput
    console.log(`output->inputElement`, inputElement)
    inputElement.focus(); // Ensure the real input gets focus
    // inputElement.dispatchEvent(new Event('input', { bubbles: true }));

};

watchEffect(() => console.log("emailModel:", emailModel.value));

</script>

<style scoped lang="scss">
.get-photo {
    position: relative;

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
        bottom: 96px;
        left: 50%;
        transform: translateX(-50%);
        width: 92%;
        padding: 150px 80px;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
    }
}
</style>