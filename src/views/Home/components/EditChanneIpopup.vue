<template>
  <van-popup
    v-model="isshow"
    closeable
    position="bottom"
    :style="{ height: '90%' }"
    close-icon-position="top-left"
  >
    <!-- 我的频道 -->
    <div class="popupMain">
      <div class="my-channel">
        <van-cell title="我的频道">
          <van-button
            size="small"
            class="edit-btn"
            round
            @click="isEdit = !isEdit"
            >{{ isEdit ? '完成' : '编辑' }}</van-button
          >
        </van-cell>
        <van-grid gutter="10px" :border="false">
          <van-grid-item
            @click="delmylist(item, index)"
            v-for="(item, index) in mychannelslist"
            :key="item.id"
            :text="item.name"
            :class="{ qqq: item.name === '推荐' }"
            ><template #icon
              ><van-icon
                name="cross"
                v-show="isEdit && item.name !== '推荐'"
              /> </template
          ></van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- //推荐频道 -->
    <div class="recommend-channel">
      <van-cell title="推荐频道" />
      <van-grid gutter="10px" :border="false">
        <van-grid-item
          @click="addlist(item)"
          icon="plus"
          :text="item.name"
          v-for="item in recommendChannels"
          :key="item.id"
        ></van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
import { getALLchannels } from '@/api'

export default {
  data () {
    return {
      isshow: true,
      ALLchannels: [],
      isEdit: false
    }
  },
  props: {
    mychannelslist: {
      type: Array
    }
  },
  created () {
    this.getALLchannels()
  },
  methods: {
    async getALLchannels () {
      const { data } = await getALLchannels()
      this.ALLchannels = data.data.channels
    },
    delmylist (item, index) {
      if (this.isEdit && item.name !== '推荐') {
        this.$emit('delmychanel', item.id)
      }
      if (!this.isEdit) {
        this.isshow = false
        this.$emit('changeactive', index)
      }
    },
    addlist (channels) {
      this.$emit('pushchannels', { ...channels })
    }
  },
  computed: {
    recommendChannels () {
      return this.ALLchannels.filter((item) => {
        const qqq = this.mychannelslist.find((obj) => obj.id === item.id)
        if (qqq) {
          return false
        } else {
          return true
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.qqq {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.popupMain {
  padding-top: 100px;
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 0.02667rem solide red;
  }
}
:deep(.van-grid-item__content) {
  background-color: #eee;
}
.my-channel {
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__icon-wrapper {
      position: absolute;
      top: 0;
      right: 0;

      .van-icon-cross {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(20%, -35%);
        border: 0.02667rem solid #333;
        border-radius: 100%;
        text-align: center;
        line-height: 0.32rem;
        font-size: 20px;
      }
    }
  }
}
// 推荐频道的样式
.recommend-channel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    height: 110px;
  }
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
