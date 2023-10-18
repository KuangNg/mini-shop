<script setup lang="ts">
import { getGoodsGuessLikeAPI } from '@/services/homepage'
import { ref, onMounted } from 'vue'
import type { GuessItem } from '@/types/homepage'
import type { PageParams } from '@/types/global'

const guessList = ref<GuessItem[]>([])
const pageParams: Required<PageParams> = {
  page: 1,
  pageSize: 10,
}
// 是否加载完成
const finish = ref(false)
// 获取列表数据
const getGoodsGuessList = async () => {
  // 列表加载完成, 中断执行
  if (finish.value) {
    return uni.showToast({ icon: 'none', title: '没有更多数据了~' })
  }
  // 数据请求
  const res = await getGoodsGuessLikeAPI(pageParams)
  guessList.value.push(...res.result.items)
  // 判断当前页码是否大于总页码数，是，数据加载完成；反正页码自增
  if (res.result.pages > pageParams.page) {
    pageParams.page++
  } else {
    finish.value = true
  }
}
// 重置列表
const resetGuessList = () => {
  pageParams.page = 1
  finish.value = false
  guessList.value = []
}
// 组件加载完成
onMounted(() => {
  getGoodsGuessList()
})
// 暴露组件属性、方法
defineExpose({
  getGoodsGuessList,
  resetGuessList,
})
</script>

<template>
  <!-- 猜你喜欢 -->
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <view class="guess">
    <navigator
      class="guess-item"
      v-for="item in guessList"
      :key="item.id"
      :url="`/pages/goods/goods?id=${item.id}`"
    >
      <image class="image" mode="aspectFill" :src="item.picture"></image>
      <view class="name"> {{ item.name }}</view>
      <view class="price">
        <text class="small">¥</text>
        <text>{{ item.price }}</text>
      </view>
    </navigator>
  </view>
  <view class="loading-text"> {{ finish ? '没有更多了' : '正在加载...' }} </view>
</template>

<style lang="scss">
@import './style/v-guess.scss';
</style>
