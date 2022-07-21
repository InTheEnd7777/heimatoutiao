<template>
  <div>
    <van-cell-group>
      <van-cell title="搜索历史"
        ><template>
          <div>
            <van-icon v-if="ishow" name="cross" @click="ishow = !ishow" />

            <div v-else>
              <span @click="delall">全部删除</span>
              <span @click="ishow = !ishow">完成</span>
            </div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <div>
      <van-cell-group
        v-for="(item, index) in list"
        :key="index"
        @click="sou(item)"
      >
        <van-cell :title="item">
          <template>
            <van-icon name="cross" @click="dellishi(item)" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { getfanfan, removefanfan, setfanfan } from '@/api'
export default {
  data () {
    return {
      list: getfanfan() || [],

      ishow: true
    }
  },
  created () {
    this.changeHistory()
  },
  methods: {
    changeHistory () {
      const res = getfanfan()
      this.list = res
    },
    dellishi (item) {
      this.list = this.list.filter((e) => e !== item)
      setfanfan(this.list)
    },
    delall (val) {
      removefanfan(val)
      this.list = []
    },
    sou (item) {
      this.$parent.keywords = item
      this.$parent.isShowSearchResults = true
      // this.$parent.this.getsousuojianyi()
    }
  }
}
</script>

<style></style>
