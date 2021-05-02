<template>
  <div class="login">
    <div @click="login">
      <img width="60" src="@/assets/metamask.svg" />
      <span>Login with MetaMask</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    login() {
      this.$store.dispatch('CONNECT')
    },
  },
}
</script>

<style lang="stylus" scoped>
.login
  display flex
  height 100vh
  justify-content center
  align-items center
  >div
    width 400px
    height 80px
    border-radius 40px
    background-color #ffe0b2
    display flex
    justify-content center
    align-items center
    font-size 24px
    color #4c220b
    cursor pointer
  img
    margin-right 20px
</style>
