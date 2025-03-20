<template>
    <div class="make-photo-camera">
        <video ref="video" autoplay></video>
        <canvas ref="canvas" style="display: none;"></canvas>
    </div>
</template>

<script setup lang="ts">
import { Routes } from '@/router';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const video = ref<HTMLVideoElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);

const route = useRoute()

onMounted(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
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
        return canvas.value.toDataURL("image/jpeg");
    }
}

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

    video {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}
</style>
