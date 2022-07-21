<template>
  <div>
    <form action="/">
      <van-search
        v-model="keywords"
        class="qqq"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="backtoprepage"
        @focus="visiblesearchsuggestion"
      />
    </form>
    <component
      :is="componentName"
      :keyWords="keywords"
      @searchindex="searchindex"
      :xianshi="val"
    ></component>
  </div>
</template>

<script>
import searchSuggestion from './components/searchSuggestion.vue'
import searchResult from './components/searchResult.vue'
import searchHistory from './components/searchHistory.vue'
import { setfanfan } from '@/api'
export default {
  data () {
    return {
      keywords: '',
      val: '',
      isShowSearchResults: false,
      lishi: []
    }
  },
  components: {
    searchHistory,
    searchResult,
    searchSuggestion
  },
  computed: {
    componentName () {
      // 显示搜索历史
      if (this.keywords.trim() === '') {
        return 'searchHistory'
      }
      // 显示搜索结果
      if (this.isShowSearchResults) {
        return 'searchResult'
      }
      // 显示搜索建议
      return 'searchSuggestion'
    }
  },
  methods: {
    onSearch () {
      this.isShowSearchResults = true
      //   console.log('搜索')
    },
    backtoprepage () {
      this.$router.back()
    },
    visiblesearchsuggestion () {
      this.isShowSearchResults = false
    },
    searchindex (val) {
      this.onSearch()
      this.val = val
      // console.log(this.val)
      this.lishi.push(val)
      this.lishi = [...new Set(this.lishi)]
      setfanfan(this.lishi)
    }
  }
  // watch: {
  //   lishi: {
  //     deep: true,
  //     handler (val) {
  //       setfanfan(val)
  //     }
  //   }
  // }
}
</script>

<style scoped lang="less">
.qqq {
  background-color: blue;
}
</style>
