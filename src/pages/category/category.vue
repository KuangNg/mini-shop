<script setup lang="ts">
//
import { ref, onMounted } from 'vue'
const sliderVal = ref(0)

const sliderChange = (ev: any) => {
  console.log(ev)
  uni.setScreenBrightness({
    value: ev.detail.value,
  })
}

onMounted(() => {
  // 先获取屏幕亮度
  uni.getScreenBrightness({
    success: function (res) {
      sliderVal.value = res.value
      console.log('屏幕亮度值：' + res.value)
    },
  })
})
</script>

<template>
  <slider :value="sliderVal" @changing="sliderChange" :min="0" :max="1" :step="0.1" />
</template>

<style lang="scss">
//
</style>
