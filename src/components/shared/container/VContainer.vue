<template>
    <div class="container">
        <div class="inner">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.container {
    height: 4040px;
    width: 2360px;
    padding: 100px;
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
    /* flex-grow: 1; */
    background: var(--gradient-bg), url('@/assets/img/bg.png') center no-repeat;
    background: url('@/assets/img/bg.png') center no-repeat;
}
</style>