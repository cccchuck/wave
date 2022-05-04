import { Contract } from 'ethers'

export interface IWindow extends Window {
  ethereum?: object
}

export type IFunction<T> = (contract: Contract) => Promise<T>
