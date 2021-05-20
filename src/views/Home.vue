<template>
  <div id="home">
    <nav>
      <div class="main-width">
        <div class="logo">DORA <span>ID</span></div>
      </div>
    </nav>
    <div class="home-container main-width">
      <div class="dora-account">
        {{ account }}
      </div>
      <div class="dora-states"></div>
      <div class="dora-states"></div>
      <div class="dora-states"></div>

      <div class="dora-feature">
        <div class="title">Stake</div>
      </div>
      <div class="dora-feature">
        <div class="title">Withdraw</div>
      </div>
      <div class="dora-feature">
        <div class="title">Activate</div>
      </div>

      <div class="tx-log"></div>
      <!-- <div class="dora-account">
        <div class="icon" :authed="status.authed">
          <span>{{ status.authed ? '已认证' : '未认证' }}</span>
        </div>
        <div class="account">{{ account }}</div>
      </div>
      <div class="dora-info">
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

.dora-states
  grid-column-end 2 span
  height 194px

.dora-feature
  grid-column-end 3 span
  height 278px
  .title
    height 40px
    border-bottom solid 1px rgba(#e6e8f0, .5)
    color #140d7c
    font-size 18px
    font-weight 500
    display flex
    justify-content center
    align-items center

.tx-log
  grid-column-end 9 span
  min-height 100px
</style>
