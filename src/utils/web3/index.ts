const { ethereum } = window as any
import { useUserStore } from '@/stores'
import type { IListener } from '@/types/global'
import { Notification } from '@arco-design/web-vue'

const registListeners = async (listeners: IListener[]) => {
  if (!ethereum) return

  listeners.forEach((listener) => {
    ethereum.on(listener.event, listener.callback)
  })

  console.log('registed listeners')
}

const removeListeners = async (listeners: IListener[]) => {
  if (!ethereum) return

  listeners.forEach((listener) => {
    ethereum.removeListener(listener.event, listener.callback)
  })

  console.log('removed listeners')
}

const checkHasProvider = async () => {
  return !!ethereum
}

const connectWallet = async () => {
  const hasProvider = await checkHasProvider()

  try {
    if (hasProvider) {
      const userStore = useUserStore()
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      const chainId = await ethereum.request({ method: 'eth_chainId' })
      await userStore.setAddress(accounts[0])
      await userStore.setChainID(chainId)

      if (chainId === '0x4') {
        Notification.success('🚀 欢迎回来')
      } else {
        Notification.error('🔧 请切换到 Rinkeby 网络')
      }
    } else {
      throw new Error('请确保你的浏览器安装了钱包插件')
    }
  } catch (error) {
    const { code, message } = error as { code: number; message: string }
    if (code === 4001) {
      Notification.error('用户拒绝登录')
    } else {
      Notification.error(message)
    }
  }
}

const disconnectWallet = async () => {
  try {
    const userStore = useUserStore()
    await userStore.reset()
  } catch (error) {
    const { message } = error as { message: string }
    Notification.error(message)
  }
}

export { connectWallet, disconnectWallet, registListeners, removeListeners }
