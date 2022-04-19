<script lang="ts" setup>
import router from '@/router'
import { useRoute } from 'vue-router'
import type { INav } from './type'
import { ref } from 'vue'
import SunModeSVG from '@/assets/icon/sun-mode.svg'
import DarkModeSVG from '@/assets/icon/dark-mode.svg'

defineProps({
  navList: {
    type: Array as () => INav[],
    required: true,
  },
})

const media = window.matchMedia('(prefers-color-scheme: dark)')

const isDark = ref(media.matches)

media.addListener((newMedia: any) => {
  isDark.value = newMedia.matches
})

const currentRoute = useRoute()

const navigateTo = async (name: string) => {
  const { name: currentName } = currentRoute
  if (name === currentName) return
  router.push({ name })
}
</script>

<template>
  <nav class="ieth-nav">
    <ul class="ieth-nav__nav">
      <li
        v-for="item in navList"
        :key="item.ID"
        class="ieth-nav__item"
        :class="{ active: item.name === currentRoute.name }"
        @click="navigateTo(item.name)"
      >
        {{ item.content }}
      </li>
    </ul>

    <div class="ieth-nav__btn">
      <div class="ieth-nav__toggle-show-mode">
        <img :src="isDark ? SunModeSVG : DarkModeSVG" alt="" />
      </div>

      <div class="ieth-nav__connect-wallet">
        <button>连接钱包</button>
      </div>
    </div>
  </nav>
</template>

<style lang="less" scoped>
@import '@/assets/styles/variables.less';
.ieth-nav {
  display: flex;
  max-width: 1200px;
  min-width: 800px;
  padding: 0 calc(var(--gap-size) * 3);
  height: 70px;
  margin: 0 auto;
  align-items: center;

  & > .ieth-nav__nav {
    display: flex;
    flex: 7;

    & > .ieth-nav__item {
      padding: 0.4em 1em;
      border-radius: 5px;
      border: 1px solid transparent;
      color: var(--color-heading);
      font-weight: bold;
      transition: all 0.2s linear;

      & + .ieth-nav__item {
        margin-left: var(--gap-size);
      }

      &:hover {
        cursor: pointer;
        background-color: var(--color-highlight-text);
      }

      &.active {
        background-color: var(--color-highlight-text);
      }
    }
  }

  & > .ieth-nav__btn {
    display: flex;
    flex: 3;
    justify-content: flex-end;
    align-items: center;

    & > .ieth-nav__toggle-show-mode {
      padding: 5px;
      border-radius: 5px;
      transition: all 0.2s linear;

      & > img {
        vertical-align: bottom;
      }

      &:hover {
        cursor: pointer;
        background-color: var(--color-highlight-text);
      }
    }

    & > .ieth-nav__connect-wallet {
      margin-left: var(--gap-size);

      & > button {
        padding: calc(var(--gap-size) / 2) var(--gap-size);
        background-color: var(--color-background-btn);
        color: var(--color-text-btn);
        border: none;
        border-radius: 5px;
        outline: none;
        transition: all 0.2s linear;
        font-weight: bold;

        &:hover {
          cursor: pointer;
          box-shadow: 0 1px 10px 5px var(--color-box-shadow);
        }
      }
    }
  }
}
</style>
