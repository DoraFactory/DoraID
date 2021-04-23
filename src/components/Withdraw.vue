<template>
  <div id="withdraw">
    <div class="withdraw-button full fc" :opened="opened" :disabled="disabled" @click="toggle">
      <transition name="fade">
        <span v-if="!opened">Withdraw</span>
      </transition>
      <p v-if="disabled">( After: {{ timeLeft }} )</p>
    </div>
    <div class="border full"></div>
    <div class="withdraw-form">
      <p>取回质押数量<input type="number" min="0" v-model="amount" />DORA</p>
      <div class="confirm" @click="unstake">Confirm</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Withdraw',
  computed: {
    ...mapState(['account', 'route', 'chain', 'status']),
    opened() {
      return this.route === '#withdraw'
    },
    disabled() {
      return Date.now() < this.status.stakingEndTime
    },
  },
  data() {
    return {
      interval: 0,
      timeLeft: '',

      amount: '',
    }
  },
  mounted() {
    this.update()
    this.interval = setInterval(() => {
      this.update()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    toggle() {
      if (this.disabled) {
        return
      }
      if (this.opened) {
        this.$store.commit('UPDATE_ROUTE', '')
      } else {
        this.$store.commit('UPDATE_ROUTE', '#withdraw')
      }
    },
    update() {
      const now = Date.now()
      if (now > this.status.stakingEndTime) {
        this.timeLeft = ''
        this.$store.commit('REFRESH')
        return
      }
      const dt = this.status.stakingEndTime - now
      const days = Math.floor(dt / 86400000)
      const hours = Math.floor((dt % 86400000) / 3600000)
      const minutes = Math.floor((dt % 3600000) / 60000)
      const seconds = Math.floor((dt % 60000) / 1000)
      let output = ''
      if (days) {
        output = `${days}days ${hours}h`
      } else if (hours) {
        output = `${hours}h ${minutes}min`
      } else if (minutes) {
        output = `${minutes}min ${seconds}sec`
      } else {
        output = `${seconds}sec`
      }
      this.timeLeft = output
    },
    async unstake() {
      // TODO: check input parameter
      const txHash = await this.chain.unstake(this.account, this.amount)
      if (!txHash) {
        return this.$toast.warning('Transaction not sent!')
      }
      this.$toast.success('Transaction sent, please wait patiently.')
      this.amount = ''
      this.$store.commit('UPDATE_ROUTE', '')
      this.$store.commit('PUSH_TX', {
        txHash,
        type: 'Withdraw',
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
#withdraw
  overflow hidden
  position relative
  background-color #fff
  box-shadow inset 4px 6px 20px #0002
.withdraw-button
  color #856a36
  flex-direction column
  background-image linear-gradient(-30deg, #f6d365 0%, #ffaa6d 100%)
  transition all .5s
  cursor pointer
  z-index 100
  >span
    font-size 36px
  >p
    margin-top 4px
  &[opened]
    transform translateX(calc(100% - 40px))
  &[disabled]
    color #856a36a0
    filter grayscale(.94) brightness(1.2)
    cursor not-allowed
.border
  background-image linear-gradient(30deg, #f6d365 0%, #fdd885 100%)
  transform translateX(calc(100% - 48px))
  transition transform .5s
  z-index 50
.withdraw-form
  padding 40px 0
  margin 0 80px 0 40px
  height 100%
  font-size 18px
  position relative
  box-sizing border-box
  p
    margin-bottom 10px
    display flex
    align-items center
  input[type=number]
    margin 0 10px
    width 100px
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
