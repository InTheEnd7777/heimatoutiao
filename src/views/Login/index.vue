<template>
  <div>
    <van-nav-bar title="登录" left-arrow @click-left="onClickLeft">
    </van-nav-bar>

    <van-form @submit="login" class="from">
      <van-field
        v-model="mobile"
        name="mobile"
        left-icon="smile-o"
        placeholder="请输入手机号"
        type="number"
        maxlength="11"
        :rules="[{ required: true, message: '请输入手机号' }]"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="code"
        type="number"
        name="验证码"
        placeholder="请输入验证码"
        maxlength="6"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #right-icon>
          <van-button round size="mini" class="code-btn">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data () {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    onClickLeft () {
      console.log(this)
      this.$router.back()
    },
    async login () {
      const res = await login(this.mobile, this.code)
      console.log(res)
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #3296fa;

  :deep(.van-ellipsis) {
    color: #fff;
  }
  :deep(.van-icon-arrow-left) {
    color: #fff;
  }
}

.from {
  :deep(.van-cell__value) {
    flex: 1;
  }
  :deep(.van-cell__value) {
    flex: 20;
  }
  .toutiao[data-v-aeba673c] {
    font-size: 0.53333rem;
  }
  .code-btn {
    color: #666;
    background-color: #eee;
    padding: 0 10px;
  }
}
</style>
