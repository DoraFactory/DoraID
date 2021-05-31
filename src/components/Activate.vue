<template>
  <div class="dora-form">
    <template v-if="toCertify">
      <div class="to-cretify">
        <p>Please kindly help</p>
        <p>{{ aim }}</p>
        <p>certify the account</p>
      </div>
      <div class="form-buttons">
        <div class="form-button-n" @click="stop">No</div>
        <div class="form-button" active @click="activate">Confirm</div>
      </div>
    </template>
    <div class="certified" v-else-if="status.authed">
      <img width="60px" src="@/assets/logo-s.svg" />
      <span>You've Certified</span>
    </div>
    <div class="not-certified" v-else>
      <div :blur="!enoughAmount || !enoughPeriod">
        <div class="certify-bg">
          <img src="@/assets/certify.svg" />
        </div>
        <div class="form-button" active @click="copy">Copy My Link</div>
      </div>
      <div v-if="!enoughAmount || !enoughPeriod" class="mask">
        <p class="sub-title">Not meet the verification requirements</p>
        <hr />
        <p :error="!enoughAmount">Required Staking Amount <span>> 10 DORA</span></p>
        <p :error="!enoughPeriod">Required Staking Period <span>> 30 Days</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Activate',
  computed: {
    ...mapState(['account', 'route', 'chain', 'status']),
    enoughAmount() {
      return Number(this.status.stakingAmount) > 10
    },
    enoughPeriod() {
      return this.status.stakingEndTime - Date.now() > 2592000000
    },
    toCertify() {
      return this.route.startsWith('#a?t=')
    },
    aim() {
      const r = this.route.match(/0x[a-fA-F0-9]{40}/)
      if (r && r.length) {
        return r[0]
      } else {
        return ''
      }
    },
  },
  methods: {
    toggle() {
      if (this.status.authed) {
        return
      }
      if (this.opened) {
        this.$store.commit('UPDATE_ROUTE', '')
      } else {
        this.$store.commit('UPDATE_ROUTE', '#activate')
      }
    },
    copy() {
      // this.$store.commit('UPDATE_ROUTE', '#a?t=' + this.account.toLowerCase())

      const input = document.createElement('input')
      document.body.appendChild(input)
      input.value = location.origin + location.pathname + '#a?t=' + this.account.toLowerCase()
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)

      this.$toast.success('Link copied!')
    },
    stop() {
      this.$store.commit('UPDATE_ROUTE', '')
    },
    async activate() {
      const txHash = await this.chain.activate(this.account, this.aim)
      if (!txHash) {
        return this.$toast.warning('Transaction not sent!')
      }
      this.$toast.success('Transaction sent, please wait patiently.')
      this.amount = ''
      this.endTime = ''
      this.$store.commit('UPDATE_ROUTE', '')
      this.$store.commit('PUSH_TX', {
        txHash,
        type: 'Activate',
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
.to-cretify
  height 144px
  display flex
  flex-direction column
  justify-content center
  align-items center
  font-size 14px
.certified
  height 198px
  display flex
  flex-direction column
  justify-content center
  align-items center
  color #5f2eea
  opacity 0.5
  span
    margin 8px 0
    font-size 14px

.not-certified
  position relative
  >div[blur]
    filter blur(3px)
  hr
    margin 0
    border none
    height 1px
    background-color rgba(#e6e8f0, 0.5)
  .mask
    position absolute
    top -5px
    left -5px
    right -5px
    bottom -5px
    padding 5px
    background-color #fffc

    font-size 14px
    .sub-title
      margin-bottom 20px
      font-weight 600
    p
      line-height 28px
      margin 10px 0
      display flex
      justify-content space-between
    p[error] span
      color #e91e63
.certify-bg
  height 144px
  display flex
  justify-content center
  align-items center
.form-buttons
  display flex
  >div
    flex 2 1 auto
  >div:first-child
    margin-right 10px
    flex 0.5 1 auto
</style>
