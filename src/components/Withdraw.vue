<template>
  <div id="staking">
    <div class="staking-button full fc" :opened="opened" @click="toggle">
      <transition name="fade">
        <span v-if="!opened">Withdraw</span>
      </transition>
    </div>
    <div class="border full"></div>
    <div class="staking-form">
      <p>取回质押数量: <input type="number" /> Dora</p>
      <p>追加质押时间: <input type="number" /> 天</p>
      <div class="confirm">Confirm</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Staking',
  computed: {
    ...mapState(['route']),
    opened() {
      return this.route === '#withdraw'
    },
  },
  methods: {
    toggle() {
      if (this.opened) {
        this.$store.commit('UPDATE_ROUTE', '')
      } else {
        this.$store.commit('UPDATE_ROUTE', '#withdraw')
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
  color #856a36
  background-image linear-gradient(-30deg, #f6d365 0%, #ffaa6d 100%)
  transition transform .5s
  cursor pointer
  z-index 100
  &[opened]
    transform translateX(calc(100% - 40px))
.border
  background-image linear-gradient(30deg, #f6d365 0%, #fdd885 100%)
  transform translateX(calc(100% - 48px))
  transition transform .5s
  z-index 50
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
    background-color #ffa44d
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
