<template>
  <div class="my">
    <header>
      <!-- //登录的头部盒子 -->
      <div v-if="islogin" class="user-info banner">
        <van-row></van-row>
        <van-row>
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userinfo.photo"
              />
              <span class="q1">{{ userinfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row type="flex" justify="end" align="center">
              <van-button
                round
                size="small"
                type="default"
                class="send-sms-btn"
                native-type="button"
                @click="btnuser"
                >编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row
          ><van-grid :border="false" class="grid">
            <van-grid-item text="头条">
              <template #icon>{{ userinfo.art_count }} </template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon> {{ userinfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon> {{ userinfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ userinfo.like_count }}</template>
            </van-grid-item>
          </van-grid></van-row
        >
      </div>
      <!-- //未登录的头部盒子 -->

      <div class="login banner loginfalse" v-else>
        <div class="tubiao" @click="gologin">
          <img src="../../assets/mobile.png" />
          <span>登录/注册</span>
        </div>
      </div>
    </header>
    <main>
      <van-grid :column-num="2" class="grid1" chickable>
        <van-grid-item text="收藏"
          ><template #icon>
            <span class="iconfont icon-shoucang shoucang"></span></template
        ></van-grid-item>
        <van-grid-item text="历史"
          ><template #icon> <span class="iconfont icon-lishi"></span></template
        ></van-grid-item>
      </van-grid>
      <div class="xiaoxi">
        <van-cell title="消息通知" is-link></van-cell>
        <van-cell title="小智同学" is-link></van-cell>
      </div>
    </main>
    <van-button v-if="islogin" block class="login-btn" @click="tuichubtn">
      退出
    </van-button>
  </div>
</template>

<script>
import { getuserinfo } from '@/api'
export default {
  data () {
    return {
      userinfo: {}
    }
  },
  computed: {
    islogin () {
      return !!this.$store.state.user.token
    }
  },
  created () {
    this.getuserinfo()
  },
  methods: {
    tuichubtn () {
      this.$dialog
        .confirm({
          title: '黑马头条',
          mseeage: '是否退出该账号'
        })
        .then(() => {
          this.$store.commit('setUser', {})
        })
        .catch(() => {})
    },
    gologin () {
      this.$router.push('/login')
    },
    btnuser () {
      this.$router.push('/user')
    },
    async getuserinfo () {
      if (this.islogin) {
        // const res =
        // await getuserinfo()
        // console.log(res)
        try {
          const {
            data: { data }
          } = await getuserinfo()
          this.userinfo = data
          // console.log(this.userinfo)
        } catch (error) {
          this.$toast.fail('请重新登录')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
.banner {
  width: 100%;
  height: 400px;
  background: url(../../assets/banner.png) no-repeat;
}
.user-info {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .van-grid-item {
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}
.van-col--12 {
  height: 100%;
}
.q1 {
  font-size: 30px;
  font-weight: 700;
  color: #fff;
}
.send-sms-btn {
  margin-top: 45px;
  height: 40px;
}
.grid {
  :deep(.van-grid-item__content) {
    background-color: unset;
  }
}

// 主体区域
main {
  color: #646566;
  // 字体图标
  :deep(.iconfont[data-v-f7eea52e]) {
    font-size: 40px;

    &.icon-shoucang {
      color: #ffb31d;
    }
    &.icon-lishi {
      color: #ed5253;
    }
  }
}
.xiaoxi {
  margin-top: 10px;
}
.login-btn {
  margin-top: 10px;
  :deep(.van-button__text) {
    color: red;
  }
}
.loginfalse {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 150px;
    height: 150px;
  }
  span {
    font-size: 30px;
    color: #fff;
    padding-top: 20px;
  }
  .tubiao {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
