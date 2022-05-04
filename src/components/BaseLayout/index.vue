<script lang="ts" setup>
import BaseNav from '@/components/BaseNav/index.vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { INav } from '../BaseNav/type'

const navList: Ref<INav[]> = ref([
  {
    ID: '1',
    name: 'Index',
    content: '主页',
  },
  {
    ID: '2',
    name: 'About',
    content: '关于',
  },
])
</script>

<template>
  <header>
    <BaseNav :nav-list="navList" />
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style lang="less" scoped>
main {
  width: 100vw;
  min-height: calc(100vh - 58px);
  background-color: var(--color-bg-1);
}
</style>
