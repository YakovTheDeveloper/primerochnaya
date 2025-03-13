<template>
    <div class="popup-body">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.popup-body {
    padding: 80px 140px;
    margin: 0 auto;
    background-color: var(--color-light-beige);
    border-radius: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

}
</style>