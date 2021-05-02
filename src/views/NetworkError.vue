<template>
  <div class="network-error">
    <div>
      <p>Network Error</p>
      <p>请在MetaMask中选择以太坊网络！</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NetworkError',
}
</script>

<style lang="stylus" scoped>
.network-error
  display flex
  height 100vh
  justify-content center
  align-items center
  >div
    text-align center
    >p:first-child
      font-size 24px
    >p:last-child
      margin-top 10px
      opacity .6
</style>
