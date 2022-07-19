<template>
  <div>
    <van-nav-bar title="登录" left-arrow @click-left="onClickLeft">
    </van-nav-bar>

    <van-form @submit="login" class="from" ref="from">
      <van-field
        v-model="mobile"
        name="mobile"
        left-icon="smile-o"
        placeholder="请输入手机号"
        type="number"
        maxlength="11"
        :rules="mobileRules"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="code"
        type="number"
        name="验证码"
        placeholder="请输入验证码"
        maxlength="6"
        :rules="codeRules"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #right-icon>
          <van-count-down
            v-if="isshow"
            :time="3 * 1000"
            @finish="isshow = false"
          />
          <van-button
            v-else
            round
            @click="sendCode"
            size="small"
            type="default"
            class="send-sms-btn"
            native-type="button"
            >发送验证码</van-button
          >
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
import { login, sendCode } from '@/api/user'
import { mobileRules, codeRules } from './rules'
export default {
  data () {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isshow: false
    }
  },
  // created () {
  //   // console.log(this.$store.commit())
  // },
  methods: {
    onClickLeft () {
      // console.log(this)
      this.$router.back()
    },
    async login () {
      this.$toast.loading({
        message: '正在加载中....',
        forbidClicks: true
      })
      try {
        const res = await login(this.mobile, this.code)
        this.$router.push('/my')
        this.$toast.success('登录成功')
        this.$store.commit('setUser', res.data.data)
      } catch (e) {
        const status = e.request.status
        let message = '登录错误，请刷新'
        if (status === 400) {
          message = e.response.data.message
        }
        console.log(status)
        // switch (status) {
        //   case 400:
        //     this.$toast.fail(e.request.data)
        //     break
        //   case 507:
        //     this.$toast.fail('登录错误，请刷新')
        //     break
        //   default:
        //     this.$toast.fail('登录错误，请刷新')
        //     break
        // }
        this.$toast.fail(message)
      }
    },
    // 验证码
    async sendCode () {
      try {
        // 验证手机号
        await this.$refs.from.validate('mobile')
        // 显示倒计时
        await sendCode(this.mobile)
        this.isshow = true
      } catch (e) {
        if (!e.response) {
          this.$toast.fail('手机号非法')
        } else {
          this.isshow = false
          const status = e.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(e.response.data.message)
          }
        }
      }
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
