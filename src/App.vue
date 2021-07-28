<template>
  <div id="app">
    <!-- 根路由出口 -->
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import request from '@/utils/request'

request({
  method: 'GET',
  url: '/boss/v2/api-docs?group=edu-boss-boot'
}).then((res) => {
  // console.log(res)
})

export default Vue.extend({
  name: 'App'
})
</script>

<style lang="scss" scoped>
</style>
