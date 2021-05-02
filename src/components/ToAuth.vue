<template>
  <div id="to-auth" :opened="opened">
    <p class="title">Activate<span @click="close">X</span></p>
    <div class="container">
      <p>Aim: {{ aim }}</p>
    </div>
    <div class="do-button" @click="activate">Do</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ToAuth',
  computed: {
    ...mapState(['account', 'route', 'chain']),
    opened() {
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
    close() {
      this.$store.commit('UPDATE_ROUTE', '')
    },
    async activate() {
      // TODO: check input parameter
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

<style lang="stylus">
#to-auth
  position absolute
  top 0
  left 0
  // padding 34px
  box-sizing border-box
  width 100%
  height 100%
  border-radius 40px
  background-color #fff
  border solid 6px #ff719a
  display flex
  flex-direction column
  justify-content space-between
  z-index 200
  transition transform .4s
  transform translateX(-100%)
  overflow hidden
  &[opened]
    transform translateX(0)
  .title
    font-size 24px
    padding 10px 40px
    background-color #ff719a
    color #fff
    display flex
    justify-content space-between
    >span
      cursor pointer
  .container
    padding 20px 34px
    flex 1 1 auto
    font-size 18px
.do-button
  margin 10px 34px 34px
  flex 0 0 60px
  width 300px
  border-radius 30px
  display flex
  justify-content center
  align-items center
  background-color #ffa99f
  color #fff
  font-size 24px
  font-weight 500
  cursor pointer
</style>
