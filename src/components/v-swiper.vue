<script setup lang="ts">
import type { BannerItem } from '@/types/homepage'
import { ref } from 'vue'
withDefaults(
  defineProps<{
    list: BannerItem[]
    autoplay?: boolean
  }>(),
  {
    autoplay: false,
  },
)

const activeIndex = ref(0)
// 轮播图改变事件
const swiperChange: UniHelper.SwiperOnChange = (event) => {
  // console.log("event",event.detail.current);
  // 非空断言，主观上排除掉空值情况
  activeIndex.value = event.detail!.current
}
</script>

<template>
  <view class="carousel">
    <swiper :circular="true" :autoplay="autoplay" :interval="3000" @change="swiperChange">
      <swiper-item v-for="item in list" :key="item.id">
        <navigator url="/pages/index/index" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" :src="item.imgUrl"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 指示点 -->
    <view class="indicator">
      <text
        v-for="(item, index) in list"
        :key="item.id"
        class="dot"
        :class="{ active: index === activeIndex }"
      ></text>
    </view>
  </view>
</template>

<style lang="scss">
@import './style/v-swiper.scss';
</style>
