<template>
  <div class="dora-form">
    <template v-if="disabled">
      <p class="staked">
        <img src="@/assets/icon/staked.svg" />
        Staked
      </p>
      <div class="form-item">
        <p class="label">
          <img src="@/assets/icon/locked.svg" />
          <span>Unlocked time</span>
        </p>
        <div>{{ date }}</div>
      </div>
      <div class="form-item">
        <p class="label">
          <img src="@/assets/icon/timeleft.svg" />
          <span>Left staking period</span>
        </p>
        <div>{{ timeLeft }}</div>
      </div>
    </template>
    <template v-else>
      <div class="form-item">
        <p class="label">
          <img src="@/assets/icon/amount.svg" />
          <span>Withdraw staking amount</span>
        </p>
        <div class="check-box" @click="toggleAll" :selected="all">
          <div></div>
          <span>All</span>
        </div>
      </div>
      <div class="input">
        <input type="number" placeholder="0" v-model="amount" :disabled="all" />
        <hr />
        <span>DORA</span>
      </div>
      <hr />
      <div class="form-item form-item-inline">
        <p class="label">
          <img src="@/assets/icon/period.svg" />
          <span>Advanced feature</span>
        </p>
      </div>
      <hr style="opacity: 0" />
    </template>
    <div class="form-button" :disabled="disabled" :active="active" @click="unstake">Confirm</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Withdraw',
  computed: {
    ...mapState(['account', 'route', 'chain', 'status']),
    disabled() {
      return Date.now() < this.status.stakingEndTime
    },
    active() {
      return !!Number(this.amount)
    },
    date() {
      return new Date(this.status.stakingEndTime).toLocaleDateString()
    },
  },
  data() {
    return {
      all: false,
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
    toggleAll() {
      this.all = !this.all
      if (this.all) {
        this.amount = this.status.stakingAmount
      } else {
        this.amount = ''
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
      if (!this.active) {
        return
      }
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
.staked
  padding 10px
  line-height 28px
  display flex
  justify-content center
  align-items center
  color rgba(#5f2eea, 0.5)
  >img
    margin-right 8px
</style>
