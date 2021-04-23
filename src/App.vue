<template>
  <div id="app">
    <div class="dora-account">
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
    </div>
    <div class="dora-logs">
      <p>交易记录</p>
      <div class="no-txs" v-if="txList.length === 0">Empty</div>
      <transition-group name="slide">
        <TxLog v-for="item in txList" :key="item.txHash" :tx="item" />
      </transition-group>
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
  name: 'App',
  components: {
    StakingTime,
    Staking,
    Withdraw,
    Activate,
    TxLog,
  },
  computed: {
    ...mapState(['account', 'network', 'chain', 'status', 'txList']),
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
    await this.$store.dispatch('CONNECT')
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
body, p
  margin 0
body
  background-color #fbfcfd
  background-image linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff),
  linear-gradient(-45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)
  background-size 40px 40px

#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  margin auto
  padding 0 40px
  max-width 1200px

.fc
  display flex
  justify-content center
  align-items center
.full
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  box-sizing border-box

input
  height 40px
  border solid 1px #ccc
  padding 0 10px
  font inherit

.dora-account
  margin-top 100px
  display flex
  .icon
    margin-right 20px
    width 80px
    height 80px
    border-radius 40px
    background-color #e6e6e6
    position relative
    &[authed]
      background-color #cddc39
    span
      position absolute
      font-size 12px
      font-weight 800
      white-space nowrap
      opacity .4
      bottom 6px
      left 50%
      transform translateX(-50%)
  .account
    padding 0 50px
    height 80px
    flex 1 1 auto
    border-radius 40px
    background-color #ffd54f
    font-size 24px
    font-family monospace
    display flex
    align-items center

.dora-console
  margin 60px 0 80px
  display grid
  grid-gap 40px
  grid-template-columns repeat(5, 1fr)
  >div
    height 300px
    background-color #e0e0e0
    border-radius 40px
  >div:nth-child(1)
    grid-column 1/3
  >div:nth-child(2)
    grid-column 3/5

.dora-info
  margin 30px 20px
  font-size 16px
  color #999
  p
    margin 10px 0
    text-align right

.dora-logs
  >p
    margin 10px 20px
    font-size 18px
    color #999
  .no-txs
    padding 0 40px
    height 60px
    border-radius 20px
    display flex
    align-items center
    justify-content center
    background-color #f5f7fa
    font-size 18px
    color #c3cfe2

.slide-enter, .slide-leave-to
  opacity 0
.slide-enter-active, .slide-leave-active
  transition opacity .6s !important
.slide-move
  transition transform .6s !important
</style>
