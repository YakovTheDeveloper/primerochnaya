<template>
    <div class="make-photo-camera">
        <video ref="video" autoplay></video>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const video = ref<HTMLVideoElement | null>(null);

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
