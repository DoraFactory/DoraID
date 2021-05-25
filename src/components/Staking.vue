<template>
  <div class="dora-form">
    <div class="form-item">
      <p class="label">
        <img src="@/assets/icon/amount.svg" />
        <span>Add staking amount</span>
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
        <span>All Staking period</span>
      </p>
      <div class="input">
        <input type="number" :placeholder="minStakingDays" v-model="period" />
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
      const ts = this.period
        ? Math.max(Date.now() + Number(this.period || 0) * 86400000, this.status.stakingEndTime)
        : this.status.stakingEndTime
      const txHash = await this.chain.stake(this.account, amount, ts)
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
