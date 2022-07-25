<template>
  <div @click="xiangqing(articleinfo.art_id)">
    <van-cell
      v-if="articleinfo.cover.type === 0"
      :title="articleinfo.title"
      :label="articletitle"
    />
    <van-cell
      v-if="articleinfo.cover.type === 1"
      :title="articleinfo.title"
      :label="articletitle"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleinfo.cover.images[0]"
      />
    </van-cell>
    <van-cell v-if="articleinfo.cover.type === 3" :title="articleinfo.title">
      <template #label>
        <div>
          <van-image
            v-for="(item, index) in articleinfo.cover.images"
            :key="index"
            width="3rem"
            height="2rem"
            :src="item"
          />
        </div>
        <span>{{ articletitle }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    articleinfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    articletitle () {
      const zzz = this.articleinfo
      const timer = dayjs(zzz.pubdate).fromNow()
      return `${zzz.aut_name}${zzz.comm_count}评论 ${timer}`
    }
  },
  methods: {
    xiangqing (id) {
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>

<style></style>
