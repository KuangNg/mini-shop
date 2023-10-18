import type { AddressItem } from '@/types/goods'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAddressStore = defineStore('address', () => {
  // 默认地址
  const defaultAddress = ref<AddressItem>()
  // 改变默认地址
  const changeDefaultAddress = (ev: AddressItem) => {
    defaultAddress.value = ev
  }
  return {
    defaultAddress,
    changeDefaultAddress,
  }
})
