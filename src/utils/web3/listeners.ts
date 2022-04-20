import { useUserStore } from "@/stores";

import type { IListener } from "@/types/global";

const onAccountsChanged: IListener = {
  event: 'accountsChanged',
  callback: async (accounts: string[]) => {
    const userStore = useUserStore()
    console.log('accountsChanged', accounts)
    userStore.setAddress(accounts[0])
  }
}

const onChainChanged: IListener = {
  event: 'chainChanged',
  callback: async (chainId: string) => {
    const userStore = useUserStore()
    console.log('chainChanged', chainId)
    userStore.setChainID(chainId)
  }
}

const listeners = [onAccountsChanged, onChainChanged]

export default listeners;