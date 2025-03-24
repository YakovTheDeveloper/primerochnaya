<template>
    <div class="overlay">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.overlay {
    background-color: rgba(0, 0, 0, 0.4);
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 10;

    width: 100%;
    height: 100%;
}
</style>