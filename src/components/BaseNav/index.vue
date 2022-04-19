<script lang="ts" setup>
import router from '@/router'
import { useRoute } from 'vue-router'
import type { INav } from './type'

defineProps({
  navList: {
    type: Array as () => INav[],
    required: true,
  },
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
        @click="navigateTo(item.name)"
      >
        {{ item.content }}
      </li>
    </ul>

    <div class="ieth-nav__btn">
      <div class="ieth-nav__toggle-show-mode">
        <button>切换</button>
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
  padding: 0 @gap * 5;
  height: 50px;
  margin: 0 auto;
  align-items: center;

  & > .ieth-nav__nav {
    display: flex;
    flex: 7;

    & > .ieth-nav__item {
      padding: 0.2em 1em;
      border-radius: 5px;
      border: 1px solid transparent;
      color: @sub-title-color;
      transition: all 0.2s linear;

      & + .ieth-nav__item {
        margin-left: @gap * 2;
      }

      &:hover {
        cursor: pointer;
        color: @title-color;
        border-color: @title-color;
        font-weight: bold;
        box-shadow: 0 -1px 5px 5px rgba(0, 0, 0, 0.05);
      }
    }
  }

  & > .ieth-nav__btn {
    display: flex;
    flex: 3;
  }
}
</style>
