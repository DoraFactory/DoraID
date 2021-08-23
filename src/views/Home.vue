<template>
  <div id="home">
    <nav>
      <div class="main-width">
        <img height="40px" src="@/assets/logo.svg" alt="logo" />
      </div>
    </nav>
    <div class="home-container main-width">
      <div class="dora-account" :not-certified="!status.authed">
        <p>
          <img v-if="status.authed" src="@/assets/certified.svg" />
          <img v-else src="@/assets/not-certified.svg" />
          <span>{{ status.authed ? 'Certified' : 'Not Certified' }}</span>
        </p>
        <div class="addr">{{ account }}</div>
      </div>
      <div class="dora-states">
        <p class="title">DORA Balance</p>
        <p class="amount">{{ status.balance }}</p>
        <p class="unit">DORA</p>
      </div>
      <div class="dora-states">
        <p class="title">Staking Amount</p>
        <p class="amount">{{ status.stakingAmount }}</p>
        <p class="unit">DORA</p>
      </div>
      <div class="dora-states">
        <p class="title">Staking Status</p>
        <StakingTime :locked.sync="locked" :endTime="status.stakingEndTime" />
        <p class="unit">{{ locked ? 'Locked' : 'Unlocked' }}</p>
      </div>

      <div class="dora-feature" :foucs="toStaking">
        <i @click="stop" />
        <div class="container">
          <div class="title">
            <span>Stake</span>
          </div>
          <Staking />
        </div>
      </div>
      <div class="dora-feature">
        <div class="title">
          <span>Withdraw</span>
        </div>
        <Withdraw />
      </div>
      <div class="dora-feature" :foucs="toCertify">
        <i @click="stop" />
        <div class="container">
          <div class="title">
            <span>Certify</span>
          </div>
          <Activate />
        </div>
      </div>

      <div class="tx-log">
        <div class="title-container">
          <p class="title">History</p>
          <span>save only in current session</span>
        </div>
        <div class="no-txs" v-if="txList.length === 0">Empty</div>
        <transition-group name="slide" tag="div">
          <TxLog v-for="item in txList" :key="item.txHash" :tx="item" />
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import StakingTime from '@/components/StakingTime'
import Staking from '@/components/Staking'
import Withdraw from '@/components/Withdraw'
import Activate from '@/components/Activate'

import TxLog from '@/components/TxLog'

export default {
  name: 'Home',
  components: {
    StakingTime,
    Staking,
    Withdraw,
    Activate,
    TxLog,
  },
  computed: {
    ...mapState(['account', 'route', 'chain', 'status', 'txList']),
    toCertify() {
      return this.route.startsWith('#a?t=')
    },
    toStaking() {
      return /\?a=[0-9.]+&d=[0-9]+/.test(this.route)
    },
  },
  data() {
    return {
      balance: '--',
      authed: false,
      stakingAmount: '--',
      stakingEndTime: 0,
      locked: true,

      timer: [0, 0],
    }
  },
  async mounted() {
    this.timer[0] = setInterval(() => {
      this.$store.dispatch('UPDATE')
    }, 10000)
    this.timer[1] = setInterval(() => {
      this.$store.dispatch('UPDATE_TXLIST')
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer[0])
    clearInterval(this.timer[1])
  },
  methods: {
    logOut() {
      this.$store.dispatch('DISCONNECT')
    },
    stop() {
      this.$store.commit('UPDATE_ROUTE', '')
    },
  },
}
</script>

<style lang="stylus">
#home
  min-height 100vh
  background rgba(#251abb, .06) url('~@/assets/bg.svg') no-repeat center top / 100% auto

nav
  background-color #fff
  >div
    height 62px
    display flex
    align-items center

.home-container
  margin 50px auto !important
  display grid
  grid-template-columns repeat(9, 1fr)
  grid-gap 40px 20px
  >div
    background-color #fff
    border-radius 8px

.dora-account
  grid-column-end 3 span
  height 194px
  background linear-gradient(to right, rgba(255, 255, 255, 0.4) 40%, rgba(198, 192, 255, 0.4))
  overflow hidden
  position relative
  z-index 1
  &[not-certified]
    filter grayscale(0.6)
    >p
      color #aeb0c1
  &:before
    content 'Address'
    position absolute
    top 50px
    right 0
    padding-left 20%
    width calc(100% - 10px)
    height 100%
    background linear-gradient(30deg, #9E98FF 40%, rgba(95, 46, 234, 0) 98%)
    font-size 30px
    line-height 50px
    font-weight 200
    color rgba(#fff, 0.3)
    transform-origin top right
    transform rotate(-9deg)
  >p
    padding 20px
    display flex
    align-items center
    color #251abb
    >img
      margin-right 4px
  .addr
    position absolute
    left 0
    bottom 0
    padding 20px
    width 100%
    font-size 12px
    font-weight 600
    color #fff

.dora-states
  padding 30px
  grid-column-end 2 span
  height 194px
  display flex
  flex-direction column
  justify-content space-between
  align-items center
  .title
    font-size 18px
    line-height 24px
    color rgba(#2b3137, 0.7)
  .amount
    font-family Impact, sans-serif
    font-size 48px
    line-height 48px
    color #140d7c
  .unit
    font-family Arial, Helvetica, sans-serif
    font-size 16px
    line-height 24px
    font-weight 600

.dora-feature
  grid-column-end 3 span
  height 278px
  transition box-shadow .2s
  position relative
  z-index 0
  .title
    height 40px
    line-height 40px
    border-bottom solid 1px rgba(#e6e8f0, .5)
    color #140d7c
    font-size 18px
    font-weight 500
    display flex
    justify-content center
    align-items center
    >span
      position relative
      transition color .14s
    >span:after
      content ''
      position absolute
      bottom 0
      left 0
      width 100%
      height 2px
      border-radius 1px
      background-color #5f2eea
      transform scaleX(0)
      transition transform .2s
  &:hover
    box-shadow 0 4px 4px rgba(68, 55, 204, 0.1)
    .title
      color #5f2eea
      >span:after
        transform scaleX(1)
  &[foucs]
    background none
    z-index 1
    .container
      background-color #fff
      border-radius 8px
      position relative
    >i
      position fixed
      top 0
      left 0
      right 0
      bottom 0
      background-color #0008

.dora-form
  padding 20px
  >hr
    margin 8px 0 12px
    border none
    height 1px
    background-color rgba(#e6e8f0, 0.5)
  .form-item
    padding 10px 0
    height 28px
    display flex
    justify-content space-between
    align-items center
    font-size 14px
    box-sizing content-box
    >a
      color inherit
      transition color .2s
      text-decoration none
      cursor pointer
    >a:hover
      color #251abb
  .form-item-inline
    padding-bottom 0
  .label
    flex 1 0 100px
    display flex
    align-items center
    cursor default
    >img
      margin-right 10px
  .check-box
    display flex
    align-items center
    cursor pointer
    color #aeb0c1
    transition color .2s
    >div
      margin-right 8px
      width 14px
      height 14px
      border-radius 2px
      border solid 2px
      background-image url('~@/assets/icon/check.svg')
      transition background-color .1s
    &[selected]
      color #5f2eea
      >div
        background-color #5f2eea
  .input
    height 28px
    display flex
    align-items center
    input
      padding 0
      flex 1 1 100px
      width 100px
      text-align right
      font-family 'Noto Sans', sans-serif
      font-size 18px
      font-weight 600
      line-height 28px
      border none
      outline none
    input[error]
      color #e91e63
    hr
      margin 0 8px
      flex 0 0 1px
      height 18px
      border none
      width 1px
      background-color #000
    span
      flex 0 0 40px
      width 40px
      text-align right
      font-size 12px
  .form-button
    margin-top 14px
    height 40px
    border-radius 3px
    background-color #e3dcff
    color rgba(#5f2eea, 0.5)
    display flex
    justify-content center
    align-items center
    font-weight 500
    cursor not-allowed
    transition color .2s, background-color .2s, border-color .2s
    &[active]
      background-color #5f2eea
      color #fff
      cursor pointer
      &:active
        background-color #3b16a6
        color #fff
    &[disabled]
      background-color #fff
      color #e6e8f0
      border solid 1px #e6e8f0
  .form-button-n
    margin-top 14px
    height 40px
    border-radius 3px
    border solid 1px #5f2eea
    display flex
    justify-content center
    align-items center
    font-weight 500
    background-color #fff
    color #5f2eea
    cursor pointer
    transition all .2s
    &:active
      color #3b16a6
      border-color #3b16a6

.tx-log
  grid-column-end 9 span
  padding 20px
  .title-container
    display flex
    justify-content space-between
    align-items center
    span
      opacity .3
      font-size 12px
  .title
    font-family 'Noto Sans', sans-serif
    font-size 18px
    font-weight 600
    line-height 32px
  .no-txs
    margin-top 20px
    height 40px
    border-radius 3px
    border solid 1px #ddd
    display flex
    justify-content center
    align-items center
    opacity .4

.slide-enter, .slide-leave-to
  opacity 0
.slide-enter-active
  transition opacity .3s .2s !important
.slide-leave-active
  transition opacity .3s !important
.slide-move
  transition transform .3s !important
</style>
