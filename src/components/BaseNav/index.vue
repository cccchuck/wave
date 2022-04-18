<script lang="ts" setup>
import router from '@/router'
import { useRoute } from 'vue-router'
import { INav } from './type'

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
  </nav>
</template>
