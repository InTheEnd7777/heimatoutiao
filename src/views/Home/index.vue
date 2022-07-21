<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round @click="$router.push('/search')"><van-icon name="search"></van-icon>搜索</van-button>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in mychannelslist" :key="item.id">
        <articlelist :id="item.id"></articlelist>
      </van-tab>
      <span class="iconfont icon-gengduo" @click="xianshigengduo"> </span>
    </van-tabs>
    <aditChanneIpopup
      @delmychanel="delmychanel"
      @changeactive="changeactive"
      @pushchannels="pushchannels"
      ref="popup"
      :mychannelslist="mychannelslist"
    ></aditChanneIpopup>
  </div>
</template>

<script>
import {
  getMychannels,
  getItem,
  setItem,
  delchannels,
  addchannels
} from '@/api'
import aditChanneIpopup from './components/EditChanneIpopup.vue'
import articlelist from './components/articlelist.vue'
export default {
  data () {
    return {
      active: 2,
      mychannelslist: []
    }
  },
  computed: {
    islogin () {
      return !!this.$store.state.user.token
    }
  },
  components: {
    articlelist,
    aditChanneIpopup
  },
  created () {
    this.getMychannels()
  },
  methods: {
    async getMychannels () {
      if (!this.login) {
        const mychannel = getItem()
        if (mychannel) {
          this.mychannelslist = mychannel
        } else {
          const { data } = await getMychannels()
          this.mychannelslist = data.data.channels
          // console.log(this.mychannelslist)
        }
        try {
          // console.log(data)
        } catch (error) {
          this.$toast.fail('请重新获取列表')
        }
      } else {
        const { data } = await getMychannels()
        this.mychannelslist = data.data.channels
      }
    },
    xianshigengduo () {
      // this.isshow = true
      this.$refs.popup.isshow = true
    },
    // 删除频道
    async delmychanel (id) {
      // 筛选出未被点击的id，重新渲染给数组
      this.mychannelslist = this.mychannelslist.filter((item) => item.id !== id)
      if (!this.islogin) {
        // 如果未登录状态，直接拿本地存储
        setItem(this.mychannelslist)
      } else {
        // 如果存储把要删除的id传过去删除
        try {
          await delchannels(id)
        } catch (error) {
          return this.$toast.fail('删除失败')
        }
      }
      this.$toast.success('删除成功')
    },
    changeactive (active) {
      this.active = active
    },
    // 添加频道
    async pushchannels (channel) {
      // 添加频道
      this.mychannelslist.push(channel)
      if (!this.islogin) {
        setItem(this.mychannelslist)
      } else {
        // 如果你是登录状态
        // 发送接口 添加频道
        try {
          await addchannels(channel.id, this.mychannelslist.length)
        } catch (error) {
          return this.$toast.fail('添加失败')
        }
      }
      this.$toast.success('添加成功')
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  color: #fff;
  position: sticky;
  top: 0;
  left: 0;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  z-index: 99;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}

/* 字体图标 */
.icon-gengduo {
  z-index: 99;
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('@/assets/gradient-gray-line.png');
  }
}
</style>
