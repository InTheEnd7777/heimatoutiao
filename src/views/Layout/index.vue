<template>
  <div>
    <van-tabbar route>
      <van-tabbar-item to="/home">
        <template #icon>
          <span class="iconfont icon-shouye"></span>
          <span class="text">首页</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <span class="iconfont icon-shipin"></span>
          <span class="text">视频</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <span class="iconfont icon-wenda"></span>
          <span class="text">问答</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template #icon>
          <span class="iconfont icon-wode"></span>
        <span class="text">{{
            !!$store.state.user.token ? '我的' : '未登录'
          }}</span>

          <!-- <span class="text" v-if="!this.$store.state.user.token">未登录</span>
          <span class="text" v-else>我的</span> -->
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
:deep(.van-tabbar-item__icon) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  padding-top: 10px;
  .iconfont {
    font-size: 36px;
  }
  .text {
    font-size: 25.6px;
  }
}
</style>
