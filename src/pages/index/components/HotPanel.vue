<script setup lang="ts">
import type { HotItem } from '@/types/homepage'
defineProps<{
  list: HotItem[]
}>()
</script>

<template>
  <!-- 推荐专区 -->
  <view class="panel hot">
    <view class="item" v-for="item in list" :key="item.id">
      <view class="title">
        <text class="title-text">{{ item.title }}</text>
        <text class="title-desc">{{ item.alt }}</text>
      </view>
      <navigator hover-class="none" :url="`/pages/hot/hot?type=${item.type}`" class="cards">
        <image
          v-for="cItem in item.pictures"
          :key="cItem"
          class="image"
          mode="aspectFit"
          :src="cItem"
        ></image>
      </navigator>
    </view>
  </view>
</template>

<style lang="scss">
@import './style/HotPanel.scss';
</style>
