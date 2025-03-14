<template>
    <div class="container">
        <div class="inner">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';


</script>

<style scoped>
.container {
    height: 3840px;
    width: 2160px;
    margin: auto;
    background-color: var(--color-bg);
}

body.contrast .container {
    background-color: var(--color-bg-contrast);
}

.inner {
    height: 100%;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    flex-direction: column;
    overflow: hidden;
    background: var(--gradient-bg), url('@/assets/img/bg.png') center no-repeat;
    background: url('@/assets/img/bg.png') center no-repeat;
}
</style>