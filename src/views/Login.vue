<template>
  <div id="login">
    <div class="login-box">
      <div class="logo">DORA <span>ID</span></div>
      <p class="title">登录</p>
      <hr />
      <p class="notice">链接钱包</p>
      <div v-if="netError" class="net-error">网络错误，请在MetaMask中选择以太坊网络</div>
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
  .logo
    margin 20px 0
    text-align center
  .title
    font-size 28px
    font-weight 500
  hr
    margin 10px auto
    height 2px
    width 56px
    border-radius 1px
    border none
    background-color #140d7c
  .notice
    font-size 14px
    line-height 20px

.net-error
  margin-top 60px
  color #ff761c
  line-height 50px
.login-button
  margin-top 60px
  width 100%
  height 50px
  border-radius 3px
  border solid 1px #ddd
  background #fff url('~@/assets/mm-logo.svg') no-repeat center / auto 60%
  cursor pointer
  transition all .2s
  &:hover
    border-color #ff761c
</style>
