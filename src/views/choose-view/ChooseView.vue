<script setup lang="ts">

import VContainer from '@/components/shared/container/VContainer.vue';
import VButton from '@/components/shared/v-button/VButton.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MockCostumeImg from '@/assets/img/photo/costume-1.png'
import IconContrast from '@/components/icons/IconContrast.vue';

const DATA = [
    { id: 0, imgUrl: MockCostumeImg, name: 'Мужской казачий костюм' },
    { id: 1, imgUrl: MockCostumeImg, name: 'Мужской казачий костюм 2' },
    { id: 2, imgUrl: MockCostumeImg, name: 'Мужской казачий костюм 3' },
    { id: 3, imgUrl: MockCostumeImg, name: 'Мужской казачий костюм 4' },
    { id: 4, imgUrl: MockCostumeImg, name: 'Мужской казачий костюм 5' },
    { id: 5, imgUrl: MockCostumeImg, name: 'Мужской казачий костюм 6' },
]

const chosenData = ref(DATA[0])

const onChoose = (data: any) => {
    chosenData.value = data
}

const toggleContrast = () => {
    document.querySelector('body')?.classList.toggle('contrast')
}
const router = useRouter()
</script>

<template>
    <VContainer class="choose">
        <h1 class="title large offset">{{ chosenData?.name }}</h1>
        <div class="choose-main-photo">
            <img :src="MockCostumeImg" alt="">
        </div>
        <div class="choose-variants offset">
            <VButton size="small" variant="special" class="special-btn" @click="toggleContrast">
                <template #icon>
                    <IconContrast />
                </template>
                Режим для слабовидящих
            </VButton>
            <div class="choose-content">
                <ul class="choose-content-list">
                    <li v-for="item in DATA" :class="[
                        'choose-content-item',
                        item.id === chosenData?.id && 'choose-content-item_active',
                    ]" @click="onChoose(item)">
                        <div class="choose-content-item__photo">
                            <img :src="item.imgUrl" alt="costume-photo">
                        </div>
                        <div class="choose-content-item__bottom">
                            <p class="choose-content-item__title">
                                {{ item.name }}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <VButton variant="primary" @click="router.push('/make-photo')">Выбрать</VButton>
        </div>
    </VContainer>
</template>



<style scoped lang="scss">
.choose {
    position: relative;

    * {
        z-index: 1;
    }
}

.choose-variants {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: stretch;
}

.choose-main-photo {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 3006px;
    top: 834px;
    right: 0;
    left: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.choose-content-list {
    display: flex;
    gap: 20px;
    width: 100%;
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
}

.choose-content-item {
    width: 485px;
    flex-shrink: 0;
    height: 500px;
    border-radius: var(--border-radius-select-card);
    background-color: var(--color-light-beige);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: end;
    overflow: hidden;
    position: relative;


    &_active {
        background-color: var(--color-beige);

        &:after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            outline: var(--outline-width-select-card) solid var(--color-dark-beige);
            outline-offset: calc(-1 * var(--outline-width-select-card));
            z-index: 1;
            border-radius: var(--border-radius-select-card);
        }
    }

    body.contrast &_active {
        background-color: var(--color-beige-contrast-button);

        &:after {
            outline-color: var(--color-dark-beige-contrast);
        }
    }


    &__bottom {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 150px;
        background: linear-gradient(360deg, #463214 0%, rgba(70, 50, 20, 0) 100%);
    }

    body.contrast &__bottom {
        background: linear-gradient(360deg, #463214 0%, rgba(70, 50, 20, 0.6) 100%);
    }

    &_active &__bottom {
        border-bottom-right-radius: 60px;
        border-bottom-left-radius: 60px;
    }

    &__title {
        font-size: 32px;
        font-weight: 600;
        padding: 40px;
        color: var(--color-white);
        text-align: center;
        z-index: 1;
    }

    &_active &__title {
        font-weight: 700;
    }

    &__photo {
        position: absolute;
        bottom: -5%;
        width: 100%;
        height: 100%;

        img {
            width: 100%;
        }

    }
}

.special-btn {
    width: fit-content;
}
</style>