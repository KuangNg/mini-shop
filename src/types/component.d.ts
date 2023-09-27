/**
 * declare module '@vue/runtime-core'
 *   现调整为
 * declare module 'vue'
 */
import 'vue'
import vSwiper from '@/components/v-swiper.vue'
import vGuess from '@/components/v-guess.vue'
declare module 'vue' {
  export interface GlobalComponents {
    vSwiper: typeof vSwiper
    vGuess: typeof vGuess
  }
}

export type vGuessInstance = InstanceType<typeof vGuess>
