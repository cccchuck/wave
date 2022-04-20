<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores'
import SunModeSVG from '@/assets/icon/sun-mode.svg'
import DarkModeSVG from '@/assets/icon/dark-mode.svg'
import toggleShowMode from '@/utils/toggleShowMode'
import listeners from '@/utils/web3/listeners'
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

const media = window.matchMedia('(prefers-color-scheme: dark)')

const isDark = ref(media.matches)

media.addEventListener('change', () => {
  isDark.value = media.matches
  saveDarkState()
})

const handleToggleShowMode = () => {
  const state = toggleShowMode()
  isDark.value = state === '0' ? true : false
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

function saveDarkState() {
  if (isDark.value) {
    localStorage.setItem('dark', '1')
  } else {
    localStorage.setItem('dark', '0')
  }
}

onMounted(async () => {
  await registListeners(listeners)
  await connectWallet()
  saveDarkState()
})

onUnmounted(async () => {
  await removeListeners(listeners)
  await disconnectWallet()
})
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
      <div class="ieth-nav__toggle-show-mode" @click="handleToggleShowMode">
        <img :src="isDark ? SunModeSVG : DarkModeSVG" alt="切换显示模式" />
      </div>

      <div class="ieth-nav__account" v-if="userStore.isConnected">
        <div class="ieth-nav__account-address">
          <span>{{ userStore.getAddress }}</span>
        </div>
      </div>

      <div class="ieth-nav__connect-wallet" v-if="!userStore.isConnected">
        <button @click="handleConnectWallet">连接钱包</button>
      </div>

      <div class="ieth-nav__dis-connect-wallet" v-if="userStore.isConnected">
        <button @click="handleDisConnectWallet">断开连接</button>
      </div>
    </div>
  </nav>
</template>

<style lang="less" scoped>
.ieth-nav {
  display: flex;
  max-width: 1200px;
  min-width: 800px;
  padding: 0 calc(var(--gap-size) * 3);
  height: 70px;
  margin: 0 auto;
  align-items: center;

  & * {
    transition: all 0.2s linear;
  }

  & > .ieth-nav__nav {
    display: flex;
    flex: 7;

    & > .ieth-nav__item {
      padding: 0.4em 1em;
      border-radius: 5px;
      border: 1px solid transparent;
      color: var(--color-heading);
      font-weight: bold;

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

      & > img {
        vertical-align: bottom;
      }

      &:hover {
        cursor: pointer;
        background-color: var(--color-highlight-text);
      }
    }

    & > .ieth-nav__account {
      & > .ieth-nav__account-address {
        & span {
          color: var(--color-heading);
          font-weight: bold;
        }
      }
    }

    & > div + div {
      margin-left: var(--gap-size);
    }

    & > .ieth-nav__connect-wallet,
    & > .ieth-nav__dis-connect-wallet {
      & > button {
        padding: calc(var(--gap-size) / 2) var(--gap-size);
        background-color: var(--color-background-btn);
        color: var(--color-text-btn);
        border: none;
        border-radius: 5px;
        outline: none;
        font-weight: bold;

        &:hover {
          cursor: pointer;
          box-shadow: 0 1px 10px 10px var(--color-box-shadow);
        }
      }
    }
  }
}
</style>
