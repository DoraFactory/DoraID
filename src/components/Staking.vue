<template>
  <div id="staking">
    <div class="staking-button full fc" :opened="opened" @click="toggle">
      <transition name="fade">
        <span v-if="!opened">Staking</span>
      </transition>
    </div>
    <div class="approve full fc" :show="needApprove" @click="needApprove = false">
      <div>Approve</div>
      <p>你需要先授权DoraID使用你的Dorayaki Token</p>
    </div>
    <div class="staking-form">
      <p>追加质押数量: <input type="number" /> Dora</p>
      <p>追加质押时间: <input type="number" /> 天</p>
      <div class="confirm">Confirm</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Staking',
  data() {
    return {
      needApprove: true,
    }
  },
  computed: {
    ...mapState(['route']),
    opened() {
      return this.route === '#staking'
    },
  },
  methods: {
    toggle() {
      if (this.opened) {
        this.$store.commit('UPDATE_ROUTE', '')
      } else {
        this.$store.commit('UPDATE_ROUTE', '#staking')
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
#staking
  overflow hidden
  position relative
  background-color #fff
  box-shadow inset 4px 6px 20px #0002
.staking-button
  font-size 36px
  color #3e787b
  background-image linear-gradient(-30deg, #96deda 0%, #50c9c3 100%)
  transition transform .5s
  cursor pointer
  z-index 100
  &[opened]
    transform translateX(calc(100% - 40px))
.approve
  padding-right 40px
  color #1a7281
  flex-direction column
  background-image linear-gradient(30deg, #ace2df 0%, #c9f7f5 100%)
  transform translateX(calc(100% - 48px))
  transition transform .5s
  cursor pointer
  z-index 50
  >div
    font-size 36px
  >p
    margin-top 10px
    opacity .8
  &[show]
    transform translateX(0)
.staking-form
  padding 40px 0
  margin 0 80px 0 40px
  height 100%
  font-size 18px
  position relative
  box-sizing border-box
  p
    margin-bottom 10px
  .confirm
    position absolute
    left 0
    bottom 40px
    width 100%
    height 60px
    border-radius 30px
    display flex
    justify-content center
    align-items center
    background-color #00bcd4
    color #fff
    font-size 24px
    font-weight 500
    cursor pointer

.full
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  box-sizing border-box

.fade-enter, .fade-leave-to
  opacity 0
.fade-leave-active
  transition opacity .2s
.fade-enter-active
  transition opacity .3s .2s
</style>
