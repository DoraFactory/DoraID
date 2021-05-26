<template>
  <div id="login">
    <div class="login-box">
      <img src="@/assets/logo.svg" alt="logo" />
      <p class="notice">Please connect wallet to login</p>
      <div v-if="netError" class="net-error">Network Error. expect BSC Test Net</div>
      <div v-else class="login-button" @click="login"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    netError: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    login() {
      this.$store.dispatch('CONNECT')
    },
  },
}
</script>

<style lang="stylus" scoped>
#login
  height 100vh
  display flex
  justify-content center
  align-items center

.login-box
  padding 30px
  width 380px
  border-radius 8px
  background-color #fff
  box-shadow 0 1px 1px rgba(#000, 0.25)
  color #140D7C
  text-align center
  img
    margin 30px
  .notice
    font-size 20px
    line-height 30px
    font-weight 500

.net-error
  margin-top 30px
  color #ff761c
  line-height 50px
.login-button
  margin-top 30px
  width 100%
  height 50px
  border-radius 3px
  border solid 1px #ff761c
  background #fff url('~@/assets/mm-logo.svg') no-repeat center / auto 60%
  cursor pointer
</style>
