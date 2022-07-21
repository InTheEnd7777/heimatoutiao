<template>
  <div>
    <van-list
      @load="onLoad"
      :offset="300"
      :finished="isfinished"
      finished-text="没有更多了"
      v-model="loading"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell v-for="item in mylist" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getsearchresults } from '@/api'
export default {
  data () {
    return {
      mylist: [],
      page: 1,
      isfinished: false,
      loading: false,
      error: false,
      refreshing: false
    }
  },
  props: {
    xianshi: {
      type: String,
      required: true
    }
  },
  created () {
    this.getsearchresults()
  },
  methods: {
    async getsearchresults () {
      try {
        const res = await getsearchresults(this.page, this.xianshi)
        // console.log(res)
        this.mylist = res.data.data.results
        // console.log(this.mylist)
      } catch (error) {}
    },
    async onLoad () {
      try {
        this.page++
        const {
          data: { data }
        } = await getsearchresults(this.page, this.xianshi)
        // console.log(data)
        if (data.results.length === 0) {
          this.isfinished = true
        }
        this.mylist.push(...data.results)
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style></style>
