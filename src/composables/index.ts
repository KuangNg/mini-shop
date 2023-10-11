import type { vGuessInstance } from '@/types/component'
import { ref } from 'vue'

/**
 * 猜你喜欢组合式函数
 */
export const useGuessList = () => {
    // 获取猜你喜欢实例
    const guessRef = ref<vGuessInstance>()
    // 触底函数
    const listScrolltolower = () => {
        guessRef.value?.getGoodsGuessList()
    }
    // 返回 ref 和事件处理函数
    return {
        guessRef,
        listScrolltolower
    }
}