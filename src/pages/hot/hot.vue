// /src/pages/hot/hot.vue
<script setup lang="ts">
import { ref } from 'vue'
import { getHotRecommendAPI, type HotParams } from '@/services/hot'
import { onLoad } from '@dcloudio/uni-app'
import type { SubTypeItem } from '@/types/hot'

// 热门推荐页 标题和url
const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]

// 获取页面参数
// 方式一
const query = defineProps<{
  type: string
}>()
const currHot = hotMap.find((item) => item.type === query.type)
// 设置标题
uni.setNavigationBarTitle({ title: currHot!.title })

// 推荐封面图
const bannerPicture = ref('')
// 推荐选项
const subTypes = ref<(SubTypeItem & { finish?: boolean })[]>([])
// 高亮的下标
const activeTabIndex = ref(0)

// 获取热门推荐商品数据
const getHotRecommend = async () => {
  const res = await getHotRecommendAPI(currHot!.url)
  bannerPicture.value = res.result.bannerPicture
  subTypes.value = res.result.subTypes
}
// 滚动列表实例
const scrollRef = ref()
// 列表触底
const listScrolltolower = async () => {
  // 获取当前tab列表
  const currSubTypes = subTypes.value[activeTabIndex.value]
  //   分页条件
  if (currSubTypes.goodsItems.page < currSubTypes.goodsItems.pages) {
    currSubTypes.goodsItems.page++
  } else {
    // 标记已结束
    currSubTypes.finish = true
    // 退出并轻提示
    return uni.showToast({ icon: 'none', title: '没有更多数据了~' })
  }
  // 获取列表数据
  const res = await getHotRecommendAPI(currHot!.url, {
    page: currSubTypes.goodsItems.page,
    pageSize: currSubTypes.goodsItems.pageSize,
    subType: currSubTypes.id,
  })
  // 新的列表选项
  const newsubTypes = res.result.subTypes[activeTabIndex.value]
  //数据追加
  currSubTypes.goodsItems.items.push(...newsubTypes.goodsItems.items)
}
onLoad(async () => {
  getHotRecommend()
})
</script>

<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image :src="bannerPicture"> </image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text
        class="text"
        :class="{ active: activeTabIndex == index }"
        v-for="(item, index) in subTypes"
        :key="item.id"
        @tap="activeTabIndex = index"
        >{{ item.title }}</text
      >
    </view>
    <!-- 推荐列表 -->
    <scroll-view
      scroll-y
      ref="scrollRef"
      class="scroll-view"
      v-show="activeTabIndex == index"
      v-for="(item, index) in subTypes"
      :key="item.id"
      @scrolltolower="listScrolltolower"
    >
      <view class="goods">
        <navigator
          hover-class="none"
          class="navigator"
          v-for="goods in item.goodsItems.items"
          :key="goods.id"
          :url="`/pages/goods/goods?id=${goods.id}`"
        >
          <image class="thumb" :src="goods.picture"> </image>
          <view class="name ellipsis">{{ goods.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods.price }}</text>
          </view>
        </navigator>
      </view>
      <view class="loading-text">{{ item.finish ? '没有更多数据了~' : '正在加载...' }}</view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}

.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}

.scroll-view {
  flex: 1;
}

.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;

  .text {
    margin: 0 20rpx;
    position: relative;
  }

  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}

.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;

  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  .thumb {
    width: 305rpx;
    height: 305rpx;
  }

  .name {
    height: 88rpx;
    font-size: 26rpx;
  }

  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }

  .symbol {
    font-size: 70%;
  }

  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>
