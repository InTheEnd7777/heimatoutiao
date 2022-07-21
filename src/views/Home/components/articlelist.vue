<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onLoad"
      success-text="刷新成功"
    >
      <van-list
        @load="onLoad"
        :offset="300"
        :finished="isfinished"
        finished-text="没有更多了"
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem
          v-for="item in mylist"
          :key="item.art_id"
          :articleinfo="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { getNewList } from '@/api'
export default {
  data () {
    return {
      mylist: [],
      pre_timestamp: '',
      isfinished: false,
      loading: false,
      error: false,
      refreshing: false
    }
  },
  components: {
    ArticleItem
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.getNewList()
  },
  methods: {
    async getNewList () {
      try {
        const { data } = await getNewList(this.id, +new Date())
        this.mylist = data.data.results
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('请刷新')
        }
      }
    },
    async onLoad () {
      try {
        if (Math.random() < 0.5) {
          throw new Error('错误了')
        }
        const { data } = await getNewList(this.id, this.pre_timestamp)
        // if (!data.data.pre_timestamp) {
        //   this.isfinished = true
        // }
        if (this.refreshing) {
          this.mylist.unshift(...data.data.results)
        } else {
          this.mylist.push(...data.data.results)
        }
        // 把新数据添加到mylist里面

        // 更新页码
        this.pre_timestamp = data.data.pre_timestamp
        // console.log(this.pre_timestamp)
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshing = false
      }
    }
  }
}
</script>

<style scoped lang="less">
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 1.15rem;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 1.15rem;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 1.15rem - 1.025rem - 1.25rem);
  overflow: auto;
}
</style>
