<template>
  <div>
    <van-cell-group>
      <van-cell
        v-for="(item, index) in highlightData"
        :key="index"
        @click="tiaozhuan(index)"
      >
        <template #title>
          <span v-html="item"></span>
        </template>
        <template #icon>
          <van-icon name="search" class="iconsearch" ></van-icon>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getsousuojianyi } from '@/api'
export default {
  data () {
    return {
      suggestions: [],
      searchlist: [],
      searchindex: []
    }
  },
  props: {
    keyWords: {
      type: String,
      required: true
    }
  },
  computed: {
    highlightData () {
      const reg = new RegExp(this.keyWords, 'ig')
      return this.suggestions.map((str) =>
        str.replace(reg, (match) => `<span style='color:red'>${match}</span>`)
      )
    }
  },
  watch: {
    keyWords: {
      // 因为第一次按案件不触发事件，加上immediate立即触发搜索事件
      immediate: true,
      handler () {
        this.getsousuojianyi()
      }
    }
  },
  methods: {
    async getsousuojianyi () {
      try {
        const res = await getsousuojianyi(this.keyWords)
        if (res.data.data.options.length === 0) {
          this.$toast.fail('没有搜索建议')
        }
        this.suggestions = res.data.data.options.filter(Boolean)
        // console.log(res)
      } catch (error) {
        // console.log(error)
      }
    },
    async tiaozhuan (index) {
      try {
        this.searchindex = this.suggestions[index]
        this.$emit('searchindex', this.searchindex)
      } catch (error) {
        // console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.iconsearch {
  padding-top: 10px;
  margin-right: 10px;
}
</style>
