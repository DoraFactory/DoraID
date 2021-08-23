<template>
  <div class="dora-form">
    <div class="form-item">
      <p class="label">
        <img src="@/assets/icon/amount.svg" />
        <span>Add Staking Amount</span>
      </p>
      <div class="check-box" @click="toggleAll" :selected="all">
        <div></div>
        <span>All</span>
      </div>
    </div>
    <div class="input">
      <input type="number" placeholder="0" v-model="amount" :disabled="all || specified" />
      <hr />
      <span>DORA</span>
    </div>
    <hr />
    <div class="form-item form-item-inline">
      <p class="label">
        <img src="@/assets/icon/period.svg" />
        <span>All Staking Period</span>
      </p>
      <div class="input">
        <input
          type="number"
          :placeholder="minStakingDays"
          v-model="period"
          :disabled="specified"
          @input="inputPeriodError = false"
          :error="inputPeriodError"
        />
        <hr />
        <span>Days</span>
      </div>
    </div>
    <hr />
    <div class="form-button" v-if="needApprove" active @click="approve">Approve</div>
    <div class="form-button" v-else :active="active" @click="stake">Confirm</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Staking',
  data() {
    return {
      all: false,
      amount: '',
      period: '',

      inputPeriodError: false,
    }
  },
  computed: {
    ...mapState(['account', 'route', 'chain', 'status']),
    needApprove() {
      return this.status.allowance === 0
    },
    minStakingDays() {
      const dt = Math.max(this.status.stakingEndTime - Date.now(), 0)
      return Math.ceil(dt / 86400000)
    },
    active() {
      return !!(Number(this.amount) || Number(this.period))
    },
    specified() {
      const r = this.route.match(/\?a=([0-9.]+)&d=([0-9]+)/)
      if (r && r.length) {
        return {
          amount: r[1],
          ddl: Number(r[2]) * 1000,
        }
      } else {
        return null
      }
    },
  },
  watch: {
    status() {
      this.updateRq()
    },
  },
  methods: {
    toggleAll() {
      this.all = !this.all
      if (this.all) {
        this.amount = this.status.balance
      } else {
        this.amount = ''
      }
    },
    updateRq() {
      if (this.specified) {
        this.amount = Math.max(
          0,
          Number(
            (Number(this.specified.amount) - Number(this.status.stakingAmount) || 0).toFixed(4)
          )
        ).toString()
        const now = Date.now()
        const min = Math.max(0, Math.ceil((this.status.stakingEndTime - now) / 86400000))
        const req = Math.ceil((this.specified.ddl - now) / 86400000)
        this.period = req > min ? req.toString() : ''
      }
    },
    async approve() {
      if (!this.needApprove) {
        return
      }
      const txHash = await this.chain.approve(this.account)
      if (!txHash) {
        return this.$toast.warning('Transaction not sent!')
      }
      this.$toast.success('Transaction sent, please wait patiently.')
      this.$store.commit('PUSH_TX', {
        txHash,
        type: 'Approve',
      })
    },
    async stake() {
      if (!this.active) {
        return
      }
      const amount = this.amount || '0'
      const period = this.period
        ? Date.now() + Number(this.period) * 86400000
        : this.status.stakingEndTime
      if (period < this.status.stakingEndTime) {
        this.inputPeriodError = true
        return this.$toast.error(
          "You can't set the staking time to a smaller time than the current."
        )
      }
      const txHash = await this.chain.stake(this.account, amount, period)
      if (!txHash) {
        return this.$toast.warning('Transaction not sent!')
      }
      this.$toast.success('Transaction sent, please wait patiently.')
      this.amount = ''
      this.period = ''
      this.$store.commit('UPDATE_ROUTE', '')
      this.$store.commit('PUSH_TX', {
        txHash,
        type: 'Stake',
      })
    },
  },
}
</script>
