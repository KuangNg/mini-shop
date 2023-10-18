<script setup lang="ts">
import { ref } from 'vue'
// 组件引入
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import PageSkeleton from './components/PageSkeleton.vue'
// 文件引入
import { getHomepageBannerAPI, getMenuCategoryAPI, getHotAPI } from '@/services/homepage'
import type { BannerItem, CategoryItem, HotItem } from '@/types/homepage'
import { onLoad } from '@dcloudio/uni-app'
import { useGuessList } from '@/composables'
// 广告区域数据
let bannerList = ref<BannerItem[]>([])
const getHomepageBannerData = async () => {
  const homepageBannerData = await getHomepageBannerAPI()
  bannerList.value = homepageBannerData.result
}
// 菜单分类数据
let menuCategoryList = ref<CategoryItem[]>([])
const getMenuCategoryData = async () => {
  const res = await getMenuCategoryAPI()
  menuCategoryList.value = res.result
}

// 获取热门推荐
let hotList = ref<HotItem[]>([])
const getHotListData = async () => {
  const res = await getHotAPI()
  hotList.value = res.result
}

// 猜你喜欢组合式函数
const { guessRef, listScrolltolower } = useGuessList()

// 是否开启下拉刷新动画
const isTriggered = ref(false)
// 下拉刷新
const onRefresh = async () => {
  // 开启动画
  isTriggered.value = true
  // 重置猜你喜欢列表
  guessRef.value?.resetGuessList()
  await Promise.all([
    getHomepageBannerData(),
    getMenuCategoryData(),
    getHotListData(),
    guessRef.value?.getGoodsGuessList(),
  ])
  // 关闭动画
  isTriggered.value = false
}
// 是否开启骨架屏
const isLoading = ref(false)
onLoad(async () => {
  // 开启骨架屏
  isLoading.value = true
  // 加载数据
  await Promise.all([getHomepageBannerData(), getMenuCategoryData(), getHotListData()])
  // 关闭骨架屏
  isLoading.value = false
})
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar></CustomNavbar>
  <scroll-view
    class="home-content"
    scroll-y
    refresher-enabled
    :refresher-triggered="isTriggered"
    @refresherrefresh="onRefresh"
    @scrolltolower="listScrolltolower"
  >
    <!-- 骨架屏 -->
    <PageSkeleton v-if="isLoading"></PageSkeleton>
    <template v-else>
      <!-- 广告区域banner -->
      <v-swiper style="height: 280rpx" :list="bannerList" autoplay></v-swiper>
      <!-- 菜单分类面板 -->
      <CategoryPanel :list="menuCategoryList"></CategoryPanel>
      <!-- 热门推荐 -->
      <HotPanel :list="hotList"></HotPanel>
      <!-- 猜你喜欢 -->
      <v-guess ref="guessRef"></v-guess>
    </template>
  </scroll-view>
</template>

<style lang="scss">
/* #ifdef APP-PLUS */
#app,
/* #endif */
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.home-content {
  flex: 1;
}
</style>
