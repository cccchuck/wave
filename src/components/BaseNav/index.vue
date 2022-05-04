<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores'
import { Message } from '@arco-design/web-vue'
import listeners from '@/utils/web3/listeners'
import { getIsDark, setIsDark, setTheme } from '@/utils/theme'
import {
  connectWallet,
  disconnectWallet,
  registListeners,
  removeListeners,
} from '@/utils/web3'

import type { INav } from './type'

defineProps({
  navList: {
    type: Array as () => INav[],
    required: true,
  },
})

const userStore = useUserStore()

const currentRoute = useRoute()

const isDark = ref(getIsDark())

const media = window.matchMedia('(prefers-color-scheme: dark)')

media.addEventListener('change', () => {
  isDark.value = media.matches
  setIsDark(media.matches)
  setTheme(media.matches)
})

const handleSwitchChange = (_isDark: boolean) => {
  isDark.value = _isDark
  setIsDark(_isDark)
  setTheme(_isDark)
}

const handleCopyAddress = () => {
  // copy address to clipboard
  const address = userStore.address
  navigator.clipboard
    .writeText(address)
    .then(() => {
      Message.success('已复制地址')
    })
    .catch((err) => {
      Message.error(err.message)
    })
}

const handleConnectWallet = async () => {
  await connectWallet()
}

const handleDisConnectWallet = async () => {
  await disconnectWallet()
}

const navigateTo = async (name: string) => {
  const { name: currentName } = currentRoute
  if (name === currentName) return
  router.push({ name })
}

onMounted(async () => {
  await registListeners(listeners)
  await connectWallet()
  setTheme(isDark.value)
})

onUnmounted(async () => {
  await removeListeners(listeners)
  await disconnectWallet()
})
</script>

<template>
  <nav class="ieth-nav" flex items-center transition>
    <a-menu mode="horizontal" :default-selected-keys="[currentRoute.name]">
      <a-menu-item
        v-for="item in navList"
        :key="item.name"
        @click="navigateTo(item.name)"
        >{{ item.content }}</a-menu-item
      >
    </a-menu>

    <div class="ieth-nav__bar">
      <a-space>
        <icon-sun-fill text-2xl hover:cursor-pointer />
        <a-switch v-model="isDark" @change="handleSwitchChange"></a-switch>
        <icon-moon-fill text-2xl hover:cursor-pointer></icon-moon-fill>
        <p
          v-show="userStore.isConnected"
          hover:font-bold
          hover:cursor-pointer
          @click="handleCopyAddress"
        >
          {{ userStore.getAddress }}
        </p>
        <a-button
          v-show="!userStore.isConnected"
          type="primary"
          @click="handleConnectWallet"
        >
          连接钱包
        </a-button>
        <a-button
          v-show="userStore.isConnected"
          type="primary"
          @click="handleDisConnectWallet"
        >
          断开连接
        </a-button>
      </a-space>
    </div>
  </nav>
</template>

<style lang="less" scoped>
.ieth-nav {
  & > .ieth-nav__bar {
    display: flex;
    align-items: center;
    padding: 13px 20px;
    color: var(--color-text-2);
    background-color: var(--color-menu-light-bg);
  }
}
</style>
