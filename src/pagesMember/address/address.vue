<script setup lang="ts">
import { delMemberAddressByIdAPI, getMemberAddressAPI } from '@/services/address';
import type { AddressItem } from '@/types/goods';
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue';
// 滑动按钮配置
const rightOptions: UniHelper.UniSwipeActionItemOption[] = [{ text: '删除', style: { 'backgroundColor': '#e43d33', 'color': "#3a3a3a", "fontSize": "14px" } }]
//获取地址管理列表
const addressList = ref<AddressItem[]>([])
const getAddressListData = async () => {
  const res = await getMemberAddressAPI()
  addressList.value = res.result
}

// 删除地址
const deleteAddress = (id: string) => {
  // 二次确认
  uni.showModal({
    content: '确定删除？',
    success: async (res) => {
      if (res.confirm) {
        // 确定删除
        await delMemberAddressByIdAPI(id)
        // 轻提示
        uni.showToast({
          title: "删除成功",
          icon: "success",
          success: () => {
            // 重新加载数据
            getAddressListData()
          }
        })
      }
    },
  })
}

// 初始化调用(页面显示)
onShow(() => {
  getAddressListData()
}) 
</script>

<template>
  <view class="viewport">
    <!-- 地址列表 -->
    <scroll-view class="scroll-view" scroll-y>
      <view v-if="addressList.length" class="address">
        <uni-swipe-action class="address-list">
          <!-- 收货地址项 -->
          <uni-swipe-action-item class="item" :right-options="rightOptions" v-for="item in addressList" :key="item.id"
            @click="deleteAddress(item.id)">
            <view class="item-content">
              <view class="user">
                {{ item.receiver }}
                <text class="contact">{{ item.contact }}</text>
                <text v-if="item.isDefault" class="badge">默认</text>
              </view>
              <view class="locate">{{ item.fullLocation }}</view>
              <navigator class="edit" hover-class="none" :url="`/pagesMember/address-form/address-form?id=${item.id}`">
                修改
              </navigator>
            </view>
          </uni-swipe-action-item>
        </uni-swipe-action>
      </view>
      <view v-else class="blank">暂无收货地址</view>
    </scroll-view>
    <!-- 添加按钮 -->
    <view class="add-btn">
      <navigator hover-class="none" url="/pagesMember/address-form/address-form">
        新建地址
      </navigator>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f4f4f4;

  .scroll-view {
    padding-top: 20rpx;
  }
}

.address {
  padding: 0 20rpx;
  margin: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .item-content {
    line-height: 1;
    padding: 40rpx 10rpx 38rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;

    .edit {
      position: absolute;
      top: 36rpx;
      right: 30rpx;
      padding: 2rpx 0 2rpx 20rpx;
      border-left: 1rpx solid #666;
      font-size: 26rpx;
      color: #666;
      line-height: 1;
    }
  }

  .item:last-child .item-content {
    border: none;
  }

  .user {
    font-size: 28rpx;
    margin-bottom: 20rpx;
    color: #333;

    .contact {
      color: #666;
    }

    .badge {
      display: inline-block;
      padding: 4rpx 10rpx 2rpx 14rpx;
      margin: 2rpx 0 0 10rpx;
      font-size: 26rpx;
      color: #27ba9b;
      border-radius: 6rpx;
      border: 1rpx solid #27ba9b;
    }
  }

  .locate {
    line-height: 1.6;
    font-size: 26rpx;
    color: #333;
  }
}

.blank {
  margin-top: 300rpx;
  text-align: center;
  font-size: 32rpx;
  color: #888;
}

.add-btn {
  height: 80rpx;
  text-align: center;
  line-height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>