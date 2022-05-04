import { useUserStore } from '@/stores'

import type { IListener } from '@/types/global'

import { Notification } from '@arco-design/web-vue'

const onAccountsChanged: IListener = {
  event: 'accountsChanged',
  callback: async (accounts: string[]) => {
    const userStore = useUserStore()
    userStore.setAddress(accounts[0])
  },
}

const onChainChanged: IListener = {
  event: 'chainChanged',
  callback: async (chainId: string) => {
    const userStore = useUserStore()
    if (chainId !== '0x4') Notification.error('🔧 请切换到 Rinkeby 网络')
    userStore.setChainID(chainId)
  },
}

const listeners = [onAccountsChanged, onChainChanged]

export default listeners
