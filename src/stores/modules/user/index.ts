import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    address: "",
    chainID: "",
  }),
  getters: {
    getAddress: (state) => {
      if (state.address !== "") {
        return state.address.substring(0, 4) + "***" + state.address.substring(state.address.length - 4)
      } else {
        return ""
      }
    },
    getChainID: (state) => state.chainID,
    isConnected: (state) => state.address !== "",
  },
  actions: {
    reset() {
      this.address = ""
      this.chainID = ""
    },
    setAddress(address: string) {
      this.address = address;
    },
    setChainID(chainID: string) {
      this.chainID = chainID;
    },
  }
})