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
    <template v-else>
      <div class="certify-bg">
        <img src="@/assets/certify.svg" />
      </div>
      <div class="form-button" active @click="copy">Copy My Link</div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Activate',
  computed: {
    ...mapState(['account', 'route', 'chain', 'status']),
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
