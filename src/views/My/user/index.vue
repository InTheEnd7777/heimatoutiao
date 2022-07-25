<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft">
    </van-nav-bar>
    <!-- 头像 -->
    <div>
      <input type="file" hidden accept=".png,.jpg" ref="file" />
      <van-cell title="头像" center is-link @click="$refs.file.click()">
        <van-image
          class="imgtou"
          round
          width="40px"
          height="40px"
          :src="userinfo.photo"
        />
      </van-cell>
      <!-- 弹出层 -->
      <van-popup
        position="bottom"
        v-model="showPhoto"
        :style="{ height: '100%' }"
        class="user_photo"
      >
        <updatePortrait
          v-if="showPhoto"
          :photo="photo"
          @onCancelPhoto="onCancelPhoto"
          @updateImgUrl="updateImgUrlFn"
        >
        </updatePortrait>
      </van-popup>
    </div>

    <!-- 昵称 -->
    <div>
      <van-cell
        title="昵称"
        is-link
        center
        @click="showPopup"
        v-model="nicheng"
      >
      </van-cell>
    </div>
    <van-popup v-model="show1" position="bottom" :style="{ height: '100%' }">
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="完成"
        @click-left="btnfan"
        @click-right="btnwc"
        @confirm="onConfirm2"
      />
      <van-field
        v-model="text"
        maxlength="7"
        placeholder="请输入昵称 "
        show-word-limit
      />
    </van-popup>
    <!-- 性别 -->
    <div class="xingbie">
      <van-field
        readonly
        clickable
        name="picker"
        is-link
        label="性别"
        v-model="val"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
    </div>
    <!-- 生日 -->
    <van-cell title="生日" v-model="date" @click="show = true" is-link />
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker
        v-model="currentDate"
        title="选择年月日"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm1"
    /></van-popup>
  </div>
</template>

<script>
import updatePortrait from './updatePortrait.vue'
import dayjs from '@/utils/dayjs'
// import { Toast } from 'vant'
import { editinformation, Getuserprofile } from '@/api/user'
export default {
  data () {
    return {
      photo: '',
      show: false,
      text: '',
      show1: false,
      columns: ['男', '女'],
      showPicker: false,
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),
      date: '',
      nicheng: '',
      nan: 0,
      userinfo: {},
      val: '',
      showPhoto: false
    }
  },
  mounted () {
    this.$refs.file.addEventListener('change', (e) => {
      const file = e.target.files[0]
      // console.log(e.target)
      const fr = new FileReader()
      // console.log(fr)
      fr.readAsDataURL(file)
      fr.onload = (e) => {
        this.photo = e.target.result
        this.showPhoto = true
        this.$refs.file.value = ''
      }
    })
  },
  created () {
    this.Getuserprofile()
  },
  methods: {
    onConfirm (value) {
      this.val = value
      this.nan = this.val === '男' ? 0 : 1
      this.onConfirm2()
      this.showPicker = false
    },
    onClickLeft () {
      this.$router.back()
    },
    showPopup () {
      this.show1 = true
    },
    btnfan () {
      this.show1 = false
    },
    async btnwc () {
      this.nicheng = this.text
      this.onConfirm2()
      this.show1 = false
      this.$toast.success('更改成功')
    },
    async onConfirm2 () {
      const res = await editinformation(this.nicheng, this.nan, this.date)
      console.log(res)
    },

    onConfirm1 (value) {
      //   console.log(value)
      const time = dayjs(value).format('YYYY-MM-DD')
      this.date = time
      this.onConfirm2()
      this.show = false
    },
    // 获取个人信息
    async Getuserprofile () {
      try {
        const {
          data: { data }
        } = await Getuserprofile()
        this.userinfo = data
        // console.log(data)
        this.nicheng = this.userinfo.name
        this.val = data.gender === 0 ? '男' : '女'
        this.date = data.birthday
      } catch (error) {
        this.$toast.fail('请重新登录')
      }
    },
    onCancelPhoto () {
      this.showPhoto = false
    },
    updateImgUrlFn (imgUrl) {
      this.userinfo.photo = imgUrl
      this.showPhoto = false
    }
  },
  components: {
    updatePortrait
  }
}
</script>

<style scoped lang="less">
.imgtou {
  margin-top: 5px;
}
.xingbie {
  :deep(.van-field__control) {
    position: absolute;
    right: 0;
    margin-top: 40px;
    width: 40px;
  }
}
.user_photo {
  height: 100%;
  z-index: 2002;
  background-color: #333;
}
</style>
