<template>
  <div>
    <van-nav-bar
      title="黑马头条"
      left-arrow
      @click-left="onClickLeft"
      class="q1"
      fixed
      placeholder
    >
    </van-nav-bar>
    <div>
      <van-cell value="内容" />
      <van-cell-group inset>
        <div class="q6">
          <van-image
            round
            width="1rem"
            height="1rem"
            :src="articleList.aut_photo"
          />
          <div class="q7">
            <p>
              {{ articleList.aut_name }}
            </p>
            <p>{{ timer }}</p>
          </div>
          <div>
            <van-button
              v-if="!articleList.is_followed"
              icon="plus"
              round
              type="info"
              :loading="loading"
              @click="guanzhu"
              >关注</van-button
            >
            <van-button
              v-else
              icon="plus"
              round
              type="info"
              :loading="loading"
              @click="quxiaoguanzhu"
              >取消关注</van-button
            >
          </div>
        </div>
      </van-cell-group>
    </div>
    <div class="message-size markdown-body" v-html="articleList.content"></div>
    <div class="q2">
      <van-row>
        <!-- //发布评论 -->
        <van-col span="12">
          <van-cell @click="showPopup" class="w1"
            ><van-button size="small" round>评论</van-button></van-cell
          >
          <van-action-sheet v-model="show" :actions="actions" class="q5">
            <template
              ><van-field
                v-model="message"
                rows="3"
                autosize
                type="textarea"
                maxlength="50"
                placeholder="请输入留言"
                show-word-limit
                center
              />
              <van-button size="mini" class="w3" @click="fabu">发布</van-button>
            </template>
          </van-action-sheet>
        </van-col>
        <!-- 点赞收藏 -->
        <van-col span="12" class="q3">
          <van-icon name="chat-o" badge="9" />
          <div>
            <van-icon
              v-if="!articleList.is_collected"
              name="star-o"
              @click="shoucang"
            />
            <van-icon
              name="star"
              v-else
              color="#1989fa"
              @click="quxiaoshoucang"
            />
          </div>
          <van-icon
            name="good-job-o"
            v-if="articleList.attitude !== 1 && articleList.attitude !== 0"
            @click="dianzan"
          />
          <van-icon
            name="good-job"
            v-else
            @click="quxiaodianzan"
            color="#ee0a24"
          />
          <van-icon name="share-o" @click="showShare = true" />
          <van-share-sheet
            v-model="showShare"
            title="立即分享给好友"
            :options="options"
          />
        </van-col>
      </van-row>
    </div>
    <van-divider>正文结束</van-divider>
    <!-- //评论区 -->
    <div class="q10">
      <van-cell-group v-for="item in pinglun" :key="item.com_id">
        <van-row>
          <van-col span="3">
            <van-image round width="1rem" height="1rem" :src="item.aut_photo"
          /></van-col>
          <van-col span="15" class="w0">
            <a>{{ item.aut_name }}</a>
            <p>{{ item.content }}</p>
            <span>{{ timess(item.pubdate) }}</span>
            <van-button round size="mini" @click="showFn(item)"
              >回复{{ item.reply_count }}</van-button
            >
            <div class="huifu">
              <van-popup
                v-model="show1"
                closeable
                close-icon-position="top-left"
                position="bottom"
                :style="{ height: '100%' }"
              >
                <div>
                  <van-nav-bar title="暂无回复" />
                </div>
                <div class="z1">
                  <van-row>
                    <van-col span="3">
                      <van-image
                        round
                        width="1rem"
                        height="1rem"
                        :src="item.aut_photo"
                    /></van-col>
                    <van-col span="15" class="w0">
                      <a>{{ list.aut_name }}</a>
                      <p>{{ list.content }}</p>
                      <span>{{ timess(list.pubdate) }}</span>
                      <van-button round size="mini">
                        回复{{ list.reply_count }}</van-button
                      ></van-col
                    >
                    <van-col span="6"
                      ><van-icon name="good-job-o" />
                      {{ list.like_count === 0 ? '赞' : list.like_count }}
                    </van-col>
                  </van-row>
                </div>
                <van-cell-group>
                  <van-cell title="全部回复" />
                </van-cell-group>
                <van-cell-group v-for="item in list1" :key="item.com_id">
                  <van-row>
                    <van-col span="3">
                      <van-image
                        round
                        width="1rem"
                        height="1rem"
                        :src="item.aut_photo"
                    /></van-col>
                    <van-col span="15" class="w0">
                      <a>{{ item.aut_name }}</a>
                      <p>{{ item.content }}</p>
                      <span>{{ timess(item.pubdate) }}</span>
                      <van-button round size="mini">
                        回复{{ item.reply_count }}</van-button
                      ></van-col
                    >
                    <van-col span="6"
                      ><van-icon name="good-job-o" />
                      赞
                    </van-col>
                  </van-row>
                </van-cell-group>

                <div class="replyReply">
                  <van-button
                    plain
                    hairline
                    type="info"
                    round
                    @click="huifupinglun"
                    >写评论
                  </van-button>
                  <van-action-sheet
                    v-model="show"
                    :actions="actions"
                    class="q5"
                  >
                    <van-field
                      v-model="message1"
                      rows="3"
                      autosize
                      type="textarea"
                      maxlength="50"
                      placeholder="请输入留言"
                      show-word-limit
                      center
                    />
                    <van-button size="mini" class="w3" @click="pinglun2"
                      >发布</van-button
                    >
                  </van-action-sheet>
                </div>
              </van-popup>
            </div>
          </van-col>
          <van-col span="6"
            ><van-icon name="good-job-o" @click="isLike(item)" />{{
              item.like_count > 0 ? item.like_count : '赞'
            }}</van-col
          >
        </van-row>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'

import {
  getNewsDetails,
  Followusers,
  NoFollowusers,
  getreviews,
  Favoritearticles,
  unfavoritearticle,
  Likethearticle,
  Cancelarticlelike,
  articlescomments,
  Replytolikes,
  getreviewsPL,
  Commentreply
} from '@/api'
import './github-markdown.css'
export default {
  data () {
    return {
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ],
      articleList: [],
      show: false,
      show1: false,
      message: '',
      message1: '',
      actions: [],
      timer: '',
      loading: false,
      pinglun: [],
      comOne: [],
      list: {},
      list1: []
    }
  },
  created () {
    this.getNewsDetails()
    this.getreviews()
  },
  computed: {
    timess () {
      return (time) => {
        return dayjs(time).fromNow()
      }
    }
  },
  methods: {
    showPopup () {
      this.show = true
    },
    onClickLeft () {
      // console.log(this)
      this.$router.back()
    },
    async getNewsDetails () {
      try {
        const res = await getNewsDetails(
          this.$route.params.article_id,
          +new Date()
        )
        // console.log(this.$route)
        this.articleList = res.data.data
        console.log(this.articleList)
        this.timer = dayjs(this.articleList.pubdate).fromNow()

        // console.log(this.$route)
      } catch (error) {}
    },
    // 关注
    async guanzhu () {
      try {
        this.loading = true
        await Followusers(this.articleList.aut_id)
        this.loading = false
        // this.$toast.success('关注成功')
        this.getNewsDetails()
      } catch (error) {
        this.$toast.success('请刷新或者登录重试')
      }
    },
    async quxiaoguanzhu () {
      try {
        this.loading = true
        await NoFollowusers(this.articleList.aut_id)
        this.loading = false
        // this.$toast.success('取消关注成功')
        this.getNewsDetails()
      } catch (error) {
        this.$toast.success('请刷新或者登录重试')
      }
    },
    // 评论区
    async getreviews () {
      try {
        const id = this.$route.params.article_id
        const res = await getreviews('a', id)
        // console.log(res)
        this.pinglun = res.data.data.results
        // console.log(this.pinglun)
        // this.zzz = dayjs(this.pinglun.pubdate).fromNow()
        // console.log(this.zzz)
        // this.timer1 = dayjs(this.pinglun.pubdate).fromNow()
      } catch (error) {}
    },
    showFn (item) {
      this.show1 = !this.show1
      this.list = item
      this.getreviewsPL()
    },
    // 评论的评论
    async getreviewsPL () {
      try {
        const id = this.list.com_id
        const {
          data: { data }
        } = await getreviewsPL('c', id)
        this.list1 = data.results
        console.log(this.list)
        // console.log(this.list1)
      } catch (error) {}
    },
    // 收藏
    async shoucang () {
      if (!this.articleList.is_collected) {
        try {
          // this.loading = true
          await Favoritearticles(this.articleList.art_id)
          // this.loading = false
          // this.$toast.success('收藏成功')
          this.getNewsDetails()
        } catch (error) {
          this.$toast.success('请刷新或者登录重试')
          // this.isshow = true
        }
      }
    },
    // 回复平路的评论
    huifupinglun () {
      this.show = true
    },
    async pinglun2 () {
      const val = this.message1
      const id = this.articleList.art_id
      // console.log(val)
      // console.log(this.list)
      try {
        await Commentreply({
          target: this.list.com_id,
          content: val,
          art_id: id
        })
        this.message1 = ''
        this.getreviewsPL()
        this.show = false
      } catch (error) {}
    },
    // 取消收藏
    async quxiaoshoucang () {
      try {
        // this.loading = true

        await unfavoritearticle(this.articleList.art_id)
        this.articleList.is_collected = !this.articleList.is_collected
        // this.$toast.success('取消收藏成功')
        // this.loading = false

        this.getNewsDetails()
      } catch (error) {
        this.$toast.success('请刷新或者登录重试')
      }
    },
    // 点赞
    async dianzan () {
      try {
        this.loading = true
        await Likethearticle(this.articleList.art_id)
        this.loading = false
        this.getNewsDetails()
      } catch (error) {
        this.$toast.success('请刷新或者登录重试')
      }
    },
    // 取消点赞
    async quxiaodianzan () {
      try {
        this.loading = true
        await Cancelarticlelike(this.articleList.art_id)
        this.loading = false
        this.getNewsDetails()
      } catch (error) {
        this.$toast.success('请刷新或者登录重试')
      }
    },
    // 进行评论
    async fabu () {
      try {
        await articlescomments({
          target: this.articleList.art_id,
          content: this.message
        })
        this.show = false
        this.message = ''
        this.getreviews()
      } catch (error) {}
    },
    // 评论点赞
    async isLike (item) {
      // console.log(111)
      try {
        await Replytolikes(item.com_id)
        this.pinglun.like_count++
        this.getreviews()

        // item.is_liking = !item.is_liking
      } catch (error) {}
    }
  }
}
</script>

<style scoped lang="less">
.huifu {
  .z1 {
    width: 100%;
  }
  .replyReply {
    background-color: #ff69b4;
    width: 100%;
    height: 100px;
    position: fixed;
    left: 0;
    bottom: 0;
    .van-button {
      margin: 5px 26px;
      width: 8.53333rem;
      height: 1.06667rem;
      margin-left: 40px;
      margin-top: 5px;
    }
  }
  :deep(.w3[data-v-a3ec9d12]) {
    position: absolute;
    bottom: 1.06667rem;
    width: 90px;
    height: 70px;
    right: 0.13333rem;
  }
}

.q1 {
  :deep(.van-nav-bar) {
    background-color: #3296fa;
  }
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
    font-size: 40px;
  }
  :deep(.van-icon) {
    color: #fff;
    font-size: 40px;
  }
}
.q2 {
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
  width: 100%;
  // padding-top: 25px;
  background-color: #ffffff;
  height: 80px;
  // background-color: red;
  :deep(.van-button--primary) {
    color: #a7a7a7;
    background-color: #fff;
    color: #b8b1aa;
  }

  :deep(.van-button--small) {
    position: relative;
    bottom: 10px;
    width: 260px;
    margin-bottom: 20px;
    height: 50px;
  }
}
.q3 {
  display: flex;
  justify-content: space-evenly;
  margin-top: 25px;
}
.q4 {
  width: 100%;
  margin-bottom: 100px;
}
.q5 {
  :deep(.van-action-sheet__content) {
    display: flex;
    align-self: center;
  }
  .w3 {
    position: absolute;
    bottom: 80px;
    right: 50px;
  }
}
.q6 {
  display: flex;
  .q7 {
    font-size: 5px;
    margin-left: 10px;
  }
  :deep(.van-button) {
    height: 40px;
    right: 20px;
    margin-top: 20px;
    position: absolute;
  }
}
.q10 {
  :deep(.van-col--3) {
    padding-left: 20px;
    padding-top: 30px;
  }
  .w0 {
    padding-left: 20px;
    padding-top: 30px;
    padding-bottom: 20px;
  }
  a {
    font-size: 18px;
  }
  span {
    font-size: 10px;
  }
  :deep(.van-button--round) {
    margin-bottom: 10px;
    margin-left: 10px;
  }
  :deep(.van-col--6) {
    width: 25%;
    display: flex;
    justify-content: right;
    font-size: 25px;
    padding-right: 20px;
    padding-top: 30px;

    :deep(.van-icon) {
      margin-right: 10px;
    }
  }
}
</style>
