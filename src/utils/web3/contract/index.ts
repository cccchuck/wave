import type { IWindow, IFunction } from '../types'
import { Contract, ethers } from 'ethers'
import { abi } from './abi'
import { Message } from '@arco-design/web-vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const CONTRACT_ADDRESS = '0x4f8115a1EDd250353058AbDfFe7066546daeebfE'
const CONTRACT_ABI = JSON.stringify(abi)

async function sendTransaction<T>(fn: IFunction<T>): Promise<T> {
  try {
    const { ethereum } = window as IWindow
    const chainID = userStore.chainID

    if (!ethereum) throw new Error('请先安装钱包')

    if (chainID && chainID !== '0x4') {
      throw new Error('请切换到 Rinkeby 网络')
    } else {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const wavePortalContract = new Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      )

      const res = await fn(wavePortalContract)
      return res
    }
  } catch (error) {
    const { code, message } = error as { code: number; message: string }
    if (code === 4001) {
      Message.error('用户拒绝交易')
    } else {
      Message.error(message)
    }
    return {} as T
  }
}

async function getTotalWaves(): Promise<string> {
  const count: string = await sendTransaction<string>(
    async (contract: Contract) => {
      const count = await contract.getTotalWaves()
      return count
    }
  )
  return count
}

async function wave() {
  await sendTransaction(async (contract: Contract) => {
    const tx = await contract.wave()
    await tx.wait()
  })
}

export { getTotalWaves, wave }
