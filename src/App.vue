<template>
  <div id="app">
    <Home v-if="logined" />
    <Login v-else :netError="networkError" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

const NETWORK = 1

export default {
  name: 'App',
  components: {
    Home,
    Login,
  },
  computed: {
    ...mapState(['account', 'network']),
    logined() {
      return !!(this.account && this.network === NETWORK)
    },
    networkError() {
      return !!(this.account && this.network !== NETWORK)
    },
  },
  created() {
    this.$store.dispatch('CONNECT')
  },
}
</script>

<style lang="stylus">
*
  box-sizing border-box

body, p
  margin 0

body
  background-color #f5f6f9
  color #000
  font-family 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale

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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
  -webkit-appearance none !important
  margin 0
input[type='number']
  -moz-appearance none
input:disabled
  background-color inherit
::placeholder
  color inherit

.main-width
  margin auto
  padding 0 20px
  max-width 1190px

.logo
  font-family Arial, Helvetica, sans-serif
  font-size 24px
  line-height 28px
  font-weight 600
  span
    color #5f2eea
</style>
