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
        <p class="amount"></p>
        <p class="unit">Unlocked</p>
      </div>

      <div class="dora-feature">
        <div class="title">
          <span>Stake</span>
        </div>
      </div>
      <div class="dora-feature">
        <div class="title">
          <span>Withdraw</span>
        </div>
      </div>
      <div class="dora-feature">
        <div class="title">
          <span>Activate</span>
        </div>
      </div>

      <div class="tx-log"></div>
      <!-- <div class="dora-info">
        <p>Dorayaki Balance: {{ status.balance }} DORA</p>
        <p>Staking Amount: {{ status.stakingAmount }} DORA</p>
        <p>Staking Time: <StakingTime :endTime="status.stakingEndTime" /></p>
      </div>
      <div class="dora-console">
        <Staking />
        <Withdraw />
        <Activate />
        <ToAuth />
      </div>
      <div class="dora-logs">
        <p>交易记录</p>
        <div class="no-txs" v-if="txList.length === 0">Empty</div>
        <transition-group name="slide">
          <TxLog v-for="item in txList" :key="item.txHash" :tx="item" />
        </transition-group>
      </div> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */

import { mapState } from 'vuex'

import StakingTime from '@/components/StakingTime'
import Staking from '@/components/Staking'
import Withdraw from '@/components/Withdraw'
import Activate from '@/components/Activate'

import ToAuth from '@/components/ToAuth'

import TxLog from '@/components/TxLog'

export default {
  name: 'Home',
  components: {
    StakingTime,
    Staking,
    Withdraw,
    Activate,
    ToAuth,
    TxLog,
  },
  computed: {
    ...mapState(['account', 'chain', 'status', 'txList']),
  },
  data() {
    return {
      balance: '--',
      authed: false,
      stakingAmount: '--',
      stakingEndTime: 0,

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
.tx-log
  grid-column-end 9 span
  min-height 100px
</style>
