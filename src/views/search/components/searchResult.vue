<template>
  <div>
    <van-list :finished="finished" finished-text="没有更多了">
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
      finished: false
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
        const res = await getsearchresults(1, 20, this.xianshi)
        // console.log(res)
        this.mylist = res.data.data.results
        // console.log(this.mylist)
        this.finished = true
      } catch (error) {}
    }
  }
}
</script>

<style></style>
