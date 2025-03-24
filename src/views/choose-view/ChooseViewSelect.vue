<template>
    <div class="choose-content">
        <ul class="choose-content-list">
            <template v-for="item in props.data">
                <li :class="getContentItemClass(item.id, props.chosen?.id)" @click="onChoose(item.id)">
                    <div class="choose-content-item__photo">
                        <img :src="getServerImageUrl(item.image)" alt="costume-photo">
                    </div>
                    <div class="choose-content-item__bottom">
                        <p class="choose-content-item__title">
                            {{ item.title }}
                        </p>
                    </div>
                </li>
            </template>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { Costume } from '@/entities';
import { getServerImageUrl } from '@/utils/getServerImageUrl';

const getContentItemClass = (id: number, activeId: number) => {
    return [
        'choose-content-item',
        id === activeId && 'choose-content-item_active',
    ]
}

const props = defineProps<{
    data: Costume[]
    onChoose: (data: any) => void
    chosen?: Costume 
}>()
</script>

<style lang="scss" scoped>
.choose-content {

    &-list {
        display: flex;
        gap: 20px;
        width: 100%;
        overflow: auto;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    &-item {
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
        transition: 0.3s background-color ease-in-out;

        &:after {
            opacity: 0;
            transition: 1s opacity ease-in-out;
        }

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
                opacity: 1;
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
            padding: 40px 40px;
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
}
</style>