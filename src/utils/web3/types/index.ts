import { Contract } from 'ethers'

export interface IWindow extends Window {
  ethereum?: object
}

export interface IWave {
  waver: string
  message: string
  timestamp: number
}

export type IFunction<T> = (contract: Contract) => Promise<T>
