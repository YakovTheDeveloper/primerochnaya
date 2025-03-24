<template>
    <div class="get-photo-scan-qr offset">
        <p class="title popup">
            Отсканируйте QR-код, <br />
            чтобы получить снимок
        </p>
        <div class="get-photo-scan-qr__image">
            <Loader v-if="store.loading.value" class="get-photo-scan-qr__image-loader" />
            <img v-else :src="qrSvgUrl" alt="qr">
        </div>
        <VButton variant="special" size="small" :class="notScanClasses" @click="toggleNotScanDescription">
            <Transition name="get-photo-scan-qr__message-btn-text-fade">
                <span class="get-photo-scan-qr__message-btn-text" :key="showNotScanDescription.toString()">
                    {{ notScanText }}
                </span>
            </Transition>
        </VButton>
    </div>
</template>

<script setup lang="ts">
import ImgQR from '@/assets/img/mock/qr.png'
import Loader from '@/components/shared/loader/Loader.vue';
import VButton from '@/components/shared/v-button/VButton.vue';
import { useGetQrStore } from '@/stores/getFileStore';
import { usePhotoResultStore } from '@/stores/photoResultStore';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';

const store = storeToRefs(useGetQrStore())
const { generateQrHandler } = useGetQrStore()
const photoResultStore = storeToRefs(usePhotoResultStore())

const qrSvgUrl = ref("");

const showNotScanDescription = ref(false)

const toggleNotScanDescription = () => showNotScanDescription.value = !showNotScanDescription.value

const notScanClasses = computed(() => ([
    'get-photo-scan-qr__message-btn',
    showNotScanDescription.value && 'active'
]))

const notScanText = computed(() => showNotScanDescription.value
    ? `
Наберите в поиске @NKM_PhotoSender_bot, затем отправьте сообщение "${photoResultStore.photoCode.value}" 
вам ответит бот и пришлёт вашу фотографию`
    : `
Не сканируется код?
`)



onMounted(() => generateQrHandler())

watch(() => store.data.value, (svg) => {
    if (!svg) return
    const blob = new Blob([svg], { type: "image/svg+xml" });
    qrSvgUrl.value = URL.createObjectURL(blob)
})

</script>

<style scoped lang="scss">
.get-photo-scan-qr {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0;

    &__image {
        display: flex;
        width: 1000px;
        height: 1000px;
        margin: 40px auto 24px;

        &-loader {
            margin: auto;
        }

        img {
            width: 100%;
            height: 100%;
        }
    }
}

.get-photo-scan-qr .get-photo-scan-qr__message-btn {
    width: fit-content;
    transition: min-width 0.4s ease-in-out, height 0.6s ease-in-out;
    height: 107px;
    min-width: 654px;
    position: relative;

    &.active {
        height: 166px;
        min-width: 100%;
    }

    &-text {
        transition: opacity 0.3s ease-in-out;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 1723px;
        transform: translate(-50%, -50%);
        font-weight: inherit;

        &-fade-enter-active,
        &-fade-leave-active {
            transition: opacity 0.3s ease;
        }

        &-fade-enter-from,
        &-fade-leave-to {
            opacity: 0;
        }

        &-fade-enter-to,
        &-fade-leave-from {
            opacity: 1;
        }
    }
}
</style>