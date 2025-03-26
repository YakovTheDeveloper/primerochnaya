<template>
    <div class="make-photo-camera">
        <video ref="video" autoplay :style="videoStyle"></video>
        <canvas ref="canvas" style="display: none;"></canvas>
    </div>
</template>

<script setup lang="ts">
import { Routes } from '@/router';
import { useMakePhotoStore } from '@/stores/makePhotoStore';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const store = storeToRefs(useMakePhotoStore())
const { setNewlyCreatedPhotoUrl } = useMakePhotoStore()
const video = ref<HTMLVideoElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);

const videoStyle = computed(() => ({
    visibility: store.stage.value === 'processing' ? 'hidden' : ''
}))

const route = useRoute()

onMounted(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 2560 },
                height: { ideal: 1440 }
            }
        })
            .then(stream => {
                if (video.value) {
                    video.value.srcObject = stream;
                }
            })
            .catch(err => {
                console.error("Error accessing webcam: ", err);
            });
    }
});


const capturePhoto = () => {
    if (video.value && canvas.value) {
        const context = canvas.value.getContext("2d");
        canvas.value.width = video.value.videoWidth;
        canvas.value.height = video.value.videoHeight;
        context?.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);

        // Convert canvas to data URL
        const imageData = canvas.value.toDataURL("image/jpeg");
        setNewlyCreatedPhotoUrl(imageData)
        // Create a download link
        // const link = document.createElement("a");
        // link.href = imageData;
        // link.download = "captured-photo.jpg";
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);

        return imageData;
    }
};


defineExpose({ capturePhoto })

</script>

<style scoped lang="scss">
.make-photo-camera {
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;

    video {
        // height: 100%;
        // aspect-ratio: (1.33333333333);
        // aspect-ratio: (1.77777777778);
        
        // width: 2592px;
        // height: 1944px;
        height: 2160px;
        object-fit: contain;
        transform: scale(-1) rotate(90deg);

        margin: 0 auto;

    }
}
</style>
