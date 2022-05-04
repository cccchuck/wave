import type { IWindow, IFunction, IWave } from '../types'
import { Contract, ethers } from 'ethers'
import { abi } from './abi'
import { Message } from '@arco-design/web-vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const CONTRACT_ADDRESS = '0x7fA50F0747db4B46d87262f5ec2868a88E70Cf99'
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

async function getAllWaves(): Promise<IWave[]> {
  const allWaves: IWave[] = await sendTransaction<IWave[]>(
    async (contract: Contract) => {
      const allWaves = await contract.getAllWaves()
      return allWaves
    }
  )
  return allWaves
}

async function wave(message: string = '该用户招了招手什么也没留下') {
  await sendTransaction(async (contract: Contract) => {
    const tx = await contract.wave(message)
    await tx.wait()
  })
}

export { getTotalWaves, getAllWaves, wave }
